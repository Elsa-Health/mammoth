const documentAction = (dbColl) => (docName) => {
    return {
        create: async (data) => {
            // @ts-ignore
            return await dbColl.insertOne({ _id: docName, ...data });
        },
        query: async () => await dbColl.findOne({ _id: docName }),
        set: async (data) => await dbColl.findOneAndUpdate({ _id: docName }, { ...data }, { upsert: true }),
        delete: async () => await dbColl.findOneAndDelete({ _id: docName }),
    };
};
/**
 * Converts query filter from one form to another
 * @param qf
 * @returns
 */
const qfConv = (qf) => {
    return qf;
};
const collectionActions = (db) => (collName) => {
    const ref = () => db.collection(collName);
    const coll = ref();
    return {
        ref: ref(),
        create: async (opts = {}) => await db.createCollection(collName, opts),
        addDoc: async (docData) => {
            (await coll.insertOne(docData)).insertedId;
        },
        addMult: async (docData) => (await coll.insertMany(docData)).insertedIds,
        queryDocs: async (queryOptions) => {
            return await coll.find(qfConv(queryOptions));
        },
        queryDoc: async (queryOptions) => {
            return await coll.findOne(qfConv(queryOptions));
        },
        doc: documentAction(coll),
        docs: () => coll.find().map((d) => documentAction(coll)(d._id.toString())),
    };
};
/**
 * @deprecated DO NOT USE THIS!
 * @param db
 * @returns
 */
export default function MongoClientStore(db) {
    return {
        collection: collectionActions(db),
        getCollections: async () => await db.listCollections().map((s) => s.name),
        collectionDocument: (collName) => {
            return documentAction(db.collection(collName));
        },
    };
}
