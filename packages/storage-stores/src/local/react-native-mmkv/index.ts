import { MMKV } from "react-native-mmkv";
import { Store } from "sabertooth";

import {
	collectionWithStore,
	collectionDocumentWithStore,
	getCollections,
} from "./api";

// TODO: Fix the types
export default function MMKVStore(
	mmkv: MMKV,
	genDocId: (id?: string) => string
): Store.BuildConfig<{ checkIfExists: boolean }> {
	return {
		// @ts-ignore
		collection: collectionWithStore(mmkv, genDocId),
		collectionDocument: collectionDocumentWithStore(mmkv),
		getCollections: async () => getCollections(mmkv),
	};
}
