import {
	addDoc,
	collection,
	getStore,
	StoreConstructor,
} from "papai/collection";
import * as fs from "fs/promises";
import { existsSync, mkdirSync, statSync } from "fs";
import path from "path";

import produce from "immer";
import { nanoid } from "nanoid";
import { List } from "immutable";

export const FileSystemCollection = (
	folderPath: string,
	generateId: () => string
): StoreConstructor => {
	const pt = (coll: string) => {
		return path.resolve(folderPath, coll);
	};

	/**
	 * Ensures that the directory exists
	 * @param dirpath
	 * @returns
	 */
	const dir = (coll: string) => {
		const dirpath = pt(coll);
		mkdirSync(dirpath, { recursive: true });
		return dirpath;
	};

	const readJson = async <T>(filePath: string) => {
		if (existsSync(filePath)) {
			// @ts-ignore
			return JSON.parse((await fs.readFile(filePath)).toString()) as T;
		} else {
			return null;
		}
	};

	const saveAsJson = async <T>(saveToPath: string, data: T) => {
		return fs.writeFile(saveToPath, JSON.stringify(data, undefined, 2));
	};

	/**
	 * Get json file path from collection id
	 * @param filePath
	 */
	const jf = (collectionId: string) =>
		path.join(dir(pt(collectionId)), "data.json");

	const r = async (jsonfilePath: string) =>
		(await readJson(jsonfilePath)) ?? {};

	// @ts-ignore
	return {
		options: { collection: {}, document: {} },
		coll: {
			async add(ref, data, options) {
				// overwrite
				const collectionJsonFile = jf(ref.collectionId);
				// read file
				const docId = generateId();
				await saveAsJson(
					collectionJsonFile,
					produce(await r(collectionJsonFile), (df: typeof data) => {
						// @ts-ignore
						df[docId] = data;
					})
				);
				return docId;
			},
			async addMultiple(ref, data, options) {
				const collectionJsonFile = jf(ref.collectionId);
				const dp = List(
					data.map(
						(d) =>
							[generateId(), d] as [string, typeof data[number]]
					)
				);

				await saveAsJson(
					collectionJsonFile,
					produce(
						await r(collectionJsonFile),
						(df: typeof data[number]) => {
							const docId = generateId();
							dp.forEach(([id, out]) => {
								// @ts-ignore
								df[id] = out;
							});
						}
					)
				);

				return dp.map((d) => d[0]).toArray();
			},
			async docs(ref, options) {
				const collectionJsonFile = jf(ref.collectionId);
				return new Set(Object.keys(r(collectionJsonFile)));
			},
			async setDocs(ref, data, options) {
				const collectionJsonFile = jf(ref.collectionId);

				await saveAsJson(
					collectionJsonFile,
					produce(
						await r(collectionJsonFile),
						(df: typeof data[number]) => {
							data.forEach(([id, out]) => {
								// @ts-ignore
								df[id] = out;
							});
						}
					)
				);

				return;
			},
		},
		doc: {
			async set(ref, data, options) {
				const collectionJsonFile = jf(ref.collectionId);
				// read file
				await saveAsJson(
					collectionJsonFile,
					produce(await r(collectionJsonFile), (df: typeof data) => {
						// @ts-ignore
						df[ref.documentId] = data;
					})
				);

				return data;
			},
		},
		async getCollections() {
			// return fs.fol
			const subs = await fs.readdir(folderPath);
			return subs;
		},
		async clearStore() {
			await fs.rm(folderPath, { recursive: true, force: true });
		},
	} as StoreConstructor;
};
