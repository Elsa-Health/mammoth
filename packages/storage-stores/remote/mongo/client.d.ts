import * as mongodb from 'mongodb';
import { Db, Collection, Document, CreateCollectionOptions, ObjectId } from 'mongodb';
import { Store } from '@sabertooth/storage';

declare type QueryFilter = {};
/**
 * @deprecated DO NOT USE THIS!
 * @param db
 * @returns
 */
declare function MongoClientStore(db: Db): {
    collection: (collName: string) => {
        ref: Collection<Document>;
        create: (opts?: CreateCollectionOptions) => Promise<Collection<Document>>;
        addDoc: <T extends Store.DocumentData>(docData: T) => Promise<void>;
        addMult: <T_1 extends Store.DocumentData>(docData: T_1[]) => Promise<{
            [key: number]: ObjectId;
        }>;
        queryDocs: (queryOptions: QueryFilter | undefined) => Promise<mongodb.FindCursor<mongodb.WithId<Document>>>;
        queryDoc: (queryOptions: QueryFilter) => Promise<mongodb.WithId<Document> | null>;
        doc: (docName: string) => {
            create: <T_2 extends Store.DocumentData>(data: T_2) => Promise<Promise<mongodb.InsertOneResult<Document>> & void>;
            query: () => Promise<mongodb.WithId<Document> | null>;
            set: <T_3 extends Store.DocumentData>(data: T_3) => Promise<mongodb.ModifyResult<Document>>;
            delete: () => Promise<mongodb.ModifyResult<Document>>;
        };
        docs: () => mongodb.FindCursor<{
            create: <T_2 extends Store.DocumentData>(data: T_2) => Promise<Promise<mongodb.InsertOneResult<Document>> & void>;
            query: () => Promise<mongodb.WithId<Document> | null>;
            set: <T_3 extends Store.DocumentData>(data: T_3) => Promise<mongodb.ModifyResult<Document>>;
            delete: () => Promise<mongodb.ModifyResult<Document>>;
        }>;
    };
    getCollections: () => Promise<mongodb.AbstractCursor<string, mongodb.AbstractCursorEvents>>;
    collectionDocument: (collName: string) => (docName: string) => {
        create: <T_2 extends Store.DocumentData>(data: T_2) => Promise<Promise<mongodb.InsertOneResult<Document>> & void>;
        query: () => Promise<mongodb.WithId<Document> | null>;
        set: <T_3 extends Store.DocumentData>(data: T_3) => Promise<mongodb.ModifyResult<Document>>;
        delete: () => Promise<mongodb.ModifyResult<Document>>;
    };
};

export { MongoClientStore as default };
