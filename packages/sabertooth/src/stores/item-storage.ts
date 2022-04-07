/**
 * Item Storage Implementation that can work with this
 */

import { CollectionAction, DocumentAction } from "../store-core";

type KeyValuePair = [string, string | null];
export type ItemStorage = {
	getItem: (ref: string) => Promise<string | null>;
	setItem: (ref: string, item: string) => Promise<void>;
	multiGet: (refs: string[]) => Promise<readonly KeyValuePair[] | void>;
	multiSet: (kvp: Array<[string, string]>) => Promise<void>;
};

const Helper = {
	get: async <T>(
		istore: ItemStorage,
		key: string,
		fallback: T | undefined = undefined
	) => {
		const x = await istore.getItem(key);
		const vals: T = x !== null ? JSON.parse(x) : (fallback as T);
		return vals;
	},

	set: async <T>(istore: ItemStorage, key: string, value: T) => {
		await istore.setItem(key, JSON.stringify(value));
	},
};

const setCollection = async (
	istore: ItemStorage,
	collectionId: string,
	opt: { collectionsRef: string }
) => {
	const vals = await Helper.get<string[]>(istore, opt.collectionsRef, []);
	await istore.setItem(
		opt.collectionsRef,
		JSON.stringify(Array.from(new Set([...vals, collectionId])))
	);
};

const addDocumentIdToCollection = async (
	istore: ItemStorage,
	collRef: string,
	documentId: string
) => {
	const vals = await Helper.get<string[]>(istore, collRef, []);
	Helper.set(istore, collRef, Array.from(new Set([...vals, documentId])));
};

const setDocument = async <T>(
	istore: ItemStorage,
	documentRef: string,
	data?: T | undefined
) => {
	// write to the document
	await istore.setItem(documentRef, JSON.stringify({ $data: data }));
};

export async function documentFire<T extends object>(
	action: DocumentAction<T>,
	opt: {
		istore: ItemStorage;
		buildDocRef: (docId: string, collId: string) => string;
		buildCollRef: (collId: string) => string;
		collectionsUID: string;
	}
): Promise<T | null> {
	// get reference for document
	const collRef = opt.buildCollRef(action.collectionId);
	const docRef = opt.buildDocRef(action.id, action.collectionId);

	// similar to initializing the collection
	setCollection(opt.istore, action.collectionId, {
		collectionsRef: opt.collectionsUID,
	});

	switch (action.type) {
		case "set": {
			// set the collection
			setDocument(opt.istore, docRef, action.data);

			// update the collection with docId record
			addDocumentIdToCollection(opt.istore, collRef, action.id);
			return action.data ?? ({} as T);
		}
		case "read": {
			// read data from the document
			return await Helper.get<T>(opt.istore, docRef);
		}
		case "update": {
			const prevData = await Helper.get<T>(opt.istore, docRef);

			// update the document
			const newData = { ...prevData, ...action.partialValue };
			setDocument(opt.istore, docRef, newData);
			return newData;
		}
		case "delete": {
			throw new Error("Not implemented");
		}
		default: {
			console.trace(`Action: ${action} `);
			throw new Error(
				// @ts-ignore
				`Document action for type=${action.type} not implemented.`
			);
		}
	}
}

export async function getCollections(
	istore: ItemStorage,
	collectionsRef: string
) {
	return await Helper.get<string[]>(istore, collectionsRef, []);
}

export async function collectionFire<T extends object>(
	action: CollectionAction<T>,
	opt: {
		istore: ItemStorage;
		buildDocRef: (docId: string, collId: string) => string;
		buildCollRef: (collId: string) => string;
		generateId: (id?: string) => string;
	}
) {
	// get reference for collection
	const collRef = opt.buildCollRef(action.id);

	// get reference for document
	switch (action.type) {
		case "get-doc-ids": {
			return await Helper.get<string[]>(opt.istore, collRef, []);
		}
		case "set": {
			const { idDataPais: dataPairs } = action;
			const result: [string, T][] = dataPairs.map(([_id, data]) => {
				const id = opt.generateId(_id);
				const docRef = opt.buildDocRef(id, action.id);

				setDocument(opt.istore, docRef, data);
				// update the collection with docId record
				addDocumentIdToCollection(opt.istore, collRef, action.id);
				return [id, data];
			});

			return new Set(result);
		}
		case "query": {
			throw new Error("Not implemented");
		}
		case "single-query": {
			throw new Error("Not implemented");
		}
		default: {
			console.trace(`Action: ${action}`);
			throw new Error(
				// @ts-ignore
				`Collection action for type=${action.type} not implemented.`
			);
		}
	}
}

export function configuration({
	istore,
	buildCollRef,
	buildDocRef,
	generateId,
	collectionsUID,
}: {
	istore: ItemStorage;
	collectionsUID: string;

	buildDocRef: (docId: string, collId: string) => string;
	buildCollRef: (collId: string) => string;
	generateId: (id?: string) => string;
}) {
	return {
		documentFire: async (action: DocumentAction) =>
			await documentFire(action, {
				buildCollRef,
				buildDocRef,
				istore,
				collectionsUID,
			}),
		collectionFire: async (action: CollectionAction) =>
			await collectionFire(action, {
				buildCollRef,
				buildDocRef,
				generateId,
				istore,
			}),
		getCollections: async () =>
			await getCollections(istore, collectionsUID),
	};
}
