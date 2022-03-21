import { collectionDocumentWithStore, collectionWithStore, getCollections, } from "./api";
const ItemStorage = (name, storage, genDocRef) => {
    // reference to the `collections` document
    const COLLECTIONS_REF = `${name}@$$collections`;
    const collRefFn = (collId) => `${name}@/${collId}`;
    return {
        collection: collectionWithStore(COLLECTIONS_REF, collRefFn, storage, genDocRef),
        getCollections: async () => await getCollections(COLLECTIONS_REF, storage),
        collectionDocument: collectionDocumentWithStore(storage, collRefFn),
    };
};
export default ItemStorage;
