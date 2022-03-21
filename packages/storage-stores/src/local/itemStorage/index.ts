import { Store } from "@sabertooth/storage";
import {
	collectionDocumentWithStore,
	collectionWithStore,
	getCollections,
} from "./api";

export type ItemStorage = {
	getItem: (ref: string) => Promise<string | null>;
	setItem: (ref: string, item: string) => Promise<void>;
	multiGet: (refs: string[]) => Promise<readonly KeyValuePair[] | void>;
	multiSet: (kvp: Array<[string, string]>) => Promise<void>;
};

type KeyValuePair = [string, string | null];

export type LocalStorageStoreOption = { createIfNotExists?: boolean };

const ItemStorage = (
	name: string,
	storage: ItemStorage,
	genDocRef: (id?: string) => string
): Store.BuildConfig<LocalStorageStoreOption> => {
	// reference to the `collections` document
	const COLLECTIONS_REF = `${name}@$$collections`;
	const collRefFn = (collId: string) => `${name}@/${collId}`;
	return {
		collection: collectionWithStore(
			COLLECTIONS_REF,
			collRefFn,
			storage,
			genDocRef
		),
		getCollections: async () =>
			await getCollections(COLLECTIONS_REF, storage),
		collectionDocument: collectionDocumentWithStore(storage, collRefFn),
	};
};

export default ItemStorage;
