import { Store } from "@sabertooth/storage";
import {
	collection,
	getCollections,
	collectionDocument,
	LocalStorageStoreOption,
} from "./api";
// import { Observable, Subject } from "rxjs";

/**
 * These are the configurations needed to recreate the storage class
 */
const localStorageBuildConfig = (
	genDocRef: (id?: string) => string
): Store.BuildConfig<LocalStorageStoreOption> => ({
	collection: collection(genDocRef),
	getCollections: async () => getCollections(),
	collectionDocument: collectionDocument(genDocRef),
});

export default localStorageBuildConfig;
