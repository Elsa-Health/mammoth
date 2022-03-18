import { MMKV } from "react-native-mmkv";
import { Store } from "@sabertooth/storage";

import {
	collectionWithStore,
	collectionDocumentWithStore,
	getCollections,
} from "./api";

export default function MMKVStore(
	mmkv: MMKV,
	genDocId: (id?: string) => string
): Store.BuildConfig<{ checkIfExists: boolean }> {
	return {
		collection: collectionWithStore(mmkv, genDocId),
		collectionDocument: collectionDocumentWithStore(mmkv),
		getCollections: async () => getCollections(mmkv),
	};
}
