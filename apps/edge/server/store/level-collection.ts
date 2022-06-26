import { Level } from "level";
import { StoreConstructor } from "papai/collection";
import * as t from "papai/collection/types";

/**
 * Prepares creation of the LevelDB streo for collection data
 * @param db location of the LevelDB database
 * @returns
 */
export function LevelDBCollection(
	db: Level,
	generateId: () => string
): StoreConstructor {
	/**
	 * Get the sub node
	 * @param collId
	 * @returns
	 */
	const subdb = (collId: string) => {
		// invariant(
		// 	collId !== METADATA_SUBLEVEL_KEY,
		// 	`The '${METADATA_SUBLEVEL_KEY}' key is reserved.`
		// );

		const d = db.sublevel(collId, {
			valueEncoding: "json",
			keyEncoding: "utf8",
		});

		return d;
	};

	const getColls = async () => {
		try {
			const cols = await db.get<string, string[] | undefined>(
				"collections",
				{
					keyEncoding: "utf8",
					valueEncoding: "json",
				}
			);

			return cols;
		} catch (err) {
			// @ts-ignore
			if (err?.code === "LEVEL_NOT_FOUND") {
				return [];
			}
		}
	};

	const addColl = async (collId: string) => {
		const cols = await getColls();

		return await db.put<string, string[]>(
			"collections",
			Array.from(new Set([...(cols ?? []), collId])),
			{ valueEncoding: "json", keyEncoding: "utf8" }
		);
	};
	return {
		// try to fix your code so that's not dependant on this
		// @ts-ignore
		options: { collection: {}, document: {} },
		coll: {
			async add(ref, data, options) {
				// init sublevel
				const db = subdb(ref.collectionId);

				const docId = generateId();
				await addColl(ref.collectionId);

				await db.put(docId, data, {
					keyEncoding: "utf8",
					valueEncoding: "json",
				});

				return docId;
			},
			async addMultiple(ref, data, options) {
				const db = subdb(ref.collectionId);

				// generate id for the new records
				const docIds = data.map((d) => generateId());
				await addColl(ref.collectionId);

				await db.batch<string, typeof data[number]>(
					data.map((d, ix, arr) => ({
						type: "put",
						key: docIds[ix],
						value: d,
					})),
					{ valueEncoding: "json", keyEncoding: "utf8" }
				);

				return docIds;
			},
			async docs(ref, options) {
				const db = subdb(ref.collectionId);

				// const docs = new Set<string>();
				// for await (const key of db.keys()) {
				// 	docs.add(key);
				// }

				// return docs;
				return new Set(await db.keys().all());
			},
			async setDocs<D extends t.Document.Data>(
				ref: t.Collection.Ref,
				data: [string, D][],
				options: any
			) {
				const db = subdb(ref.collectionId);

				await addColl(ref.collectionId);
				await db.batch<string, D>(
					data.map(([id, d]) => ({
						type: "put",
						key: id,
						value: d,
					})),
					{ keyEncoding: "utf8", valueEncoding: "json" }
				);
			},
			async getDocs<D extends t.Document.Data>(
				ref: t.Collection.Ref,
				query: any,
				options: any
			) {
				const db = subdb(ref.collectionId);
				const out = await db
					.iterator<string, D>({
						keyEncoding: "utf8",
						valueEncoding: "json",
					})
					.all();

				return Array.from(out);
			},
			async clear(ref, options) {
				const db = subdb(ref.collectionId);
				await db.clear();
			},
		},
		// @ts-ignore
		doc: {
			async set(ref, data, options) {
				const db = subdb(ref.collectionId);
				await addColl(ref.collectionId);

				await db.put<string, typeof data>(ref.documentId, data, {
					keyEncoding: "utf8",
					valueEncoding: "json",
				});

				return data;
			},
		},
		async getCollections() {
			const subs = await db.get<string, string[]>("collections", {
				valueEncoding: "json",
			});
			return new Set((subs ?? []).map((ref) => ({ collectionId: ref })));
		},
		async clearStore() {
			db.clear();
		},
	};
}
