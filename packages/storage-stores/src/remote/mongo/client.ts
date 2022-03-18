import {
	Db,
	CreateCollectionOptions,
	Filter,
	Document,
	Collection,
	ObjectId,
} from "mongodb";
import { Store } from "@sabertooth/storage";

const documentAction = (dbColl: Collection<Document>) => (docName: string) => {
	return {
		create: async <T extends Store.DocumentData>(data: T) => {
			// @ts-ignore
			return await dbColl.insertOne({ _id: docName, ...data });
		},
		query: async () => await dbColl.findOne({ _id: docName }),
		set: async <T extends Store.DocumentData>(data: T) =>
			await dbColl.findOneAndUpdate(
				{ _id: docName },
				{ ...data },
				{ upsert: true }
			),
		delete: async () => await dbColl.findOneAndDelete({ _id: docName }),
	};
};

type QueryFilter = {};

/**
 * Converts query filter from one form to another
 * @param qf
 * @returns
 */
const qfConv = (qf: QueryFilter | undefined): Filter<Document> => {
	return qf as Filter<Document>;
};

const collectionActions = (db: Db) => (collName: string) => {
	const ref = () => db.collection(collName);
	const coll = ref();
	return {
		ref: ref(),
		create: async (opts: CreateCollectionOptions = {}) =>
			await db.createCollection(collName, opts),
		addDoc: async <T extends Store.DocumentData>(docData: T) => {
			(await coll.insertOne(docData)).insertedId;
		},
		addMult: async <T extends Store.DocumentData>(docData: T[]) =>
			(await coll.insertMany(docData)).insertedIds,
		queryDocs: async (queryOptions: QueryFilter | undefined) => {
			return await coll.find(qfConv(queryOptions));
		},
		queryDoc: async (queryOptions: QueryFilter) => {
			return await coll.findOne(qfConv(queryOptions));
		},
		doc: documentAction(coll),
		docs: () =>
			coll.find().map((d) => documentAction(coll)(d._id.toString())),
	};
};

/**
 * @deprecated DO NOT USE THIS!
 * @param db
 * @returns
 */
export default function MongoClientStore(db: Db) {
	return {
		collection: collectionActions(db),
		getCollections: async () =>
			await db.listCollections().map((s) => s.name),
		collectionDocument: (collName: string) => {
			return documentAction(db.collection(collName));
		},
	};
}
