import { collectionWithStore, collectionDocumentWithStore, getCollections, } from "./api";
// TODO: Fix the types
export default function MMKVStore(mmkv, genDocId) {
    return {
        // @ts-ignore
        collection: collectionWithStore(mmkv, genDocId),
        collectionDocument: collectionDocumentWithStore(mmkv),
        getCollections: async () => getCollections(mmkv),
    };
}
