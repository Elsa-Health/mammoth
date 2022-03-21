export function buildStore(sbc) {
    return {
        collection: (name) => sbc.collection(name, sbc.collectionDocument(name)),
        collections: async () => {
            return await sbc.getCollections();
        },
    };
}
