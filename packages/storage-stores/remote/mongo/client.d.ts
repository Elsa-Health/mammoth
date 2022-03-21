import { Db, CreateCollectionOptions, Document, Collection, ObjectId } from "mongodb";
import { Store } from "@sabertooth/storage";
declare type QueryFilter = {};
/**
 * @deprecated DO NOT USE THIS!
 * @param db
 * @returns
 */
export default function MongoClientStore(db: Db): {
    collection: (collName: string) => {
        ref: Collection<Document>;
        create: (opts?: CreateCollectionOptions) => Promise<Collection<Document>>;
        addDoc: <T extends Store.DocumentData>(docData: T) => Promise<void>;
        addMult: <T_1 extends Store.DocumentData>(docData: T_1[]) => Promise<{
            [key: number]: ObjectId;
        }>;
        queryDocs: (queryOptions: QueryFilter | undefined) => Promise<import("mongodb").FindCursor<import("mongodb").WithId<Document>>>;
        queryDoc: (queryOptions: QueryFilter) => Promise<import("mongodb").WithId<Document> | null>;
        doc: (docName: string) => {
            create: <T_2 extends Store.DocumentData>(data: T_2) => Promise<Promise<import("mongodb").InsertOneResult<Document>> & void>;
            query: () => Promise<import("mongodb").WithId<Document> | null>;
            set: <T_3 extends Store.DocumentData>(data: T_3) => Promise<import("mongodb").ModifyResult<Document>>;
            delete: () => Promise<import("mongodb").ModifyResult<Document>>;
        };
        docs: () => import("mongodb").FindCursor<{
            create: <T_2 extends Store.DocumentData>(data: T_2) => Promise<Promise<import("mongodb").InsertOneResult<Document>> & void>;
            query: () => Promise<import("mongodb").WithId<Document> | null>;
            set: <T_3 extends Store.DocumentData>(data: T_3) => Promise<import("mongodb").ModifyResult<Document>>;
            delete: () => Promise<import("mongodb").ModifyResult<Document>>;
        }>;
    };
    getCollections: () => Promise<import("mongodb").AbstractCursor<string, import("mongodb").AbstractCursorEvents>>;
    collectionDocument: (collName: string) => (docName: string) => {
        create: <T_2 extends Store.DocumentData>(data: T_2) => Promise<Promise<import("mongodb").InsertOneResult<Document>> & void>;
        query: () => Promise<import("mongodb").WithId<Document> | null>;
        set: <T_3 extends Store.DocumentData>(data: T_3) => Promise<import("mongodb").ModifyResult<Document>>;
        delete: () => Promise<import("mongodb").ModifyResult<Document>>;
    };
};
export {};
