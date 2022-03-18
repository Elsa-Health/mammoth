import { Store } from '@sabertooth/storage';

declare function getCollections(): string[];
/**
 * Set information in the collection
 * @param pv
 * @param collectionRef
 * @param permission
 */
declare function setCollection(pv: (collObj: CollectionObject) => CollectionObject, collectionRef: string): void;
declare type CollectionObject = {
    docsRefs: string[];
};
/**
 * Get collection information
 * @param collectionRef
 */
declare function queryCollection(collectionRef: string): CollectionObject | null;
declare type DocumentObject<Obj = any> = {
    data: Obj;
};
declare function queryDocument<T>(documentRef: string): DocumentObject<T> | null;
declare function createDocument<T>(documentRef: string, data: T): void;
declare function setDocument(documentRef: string, pv: (doc: DocumentObject) => DocumentObject): void;
declare function setCollectionDocs(pv: (docRefs: CollectionObject["docsRefs"]) => CollectionObject["docsRefs"], collectionRef: string): void;
declare function createCollection(collectionRef: string): void;
declare const collectionDocument: (genDocRef: (id?: string | undefined) => string) => (collName: string) => (docName: string) => Store.DocumentAction;
declare type LocalStorageStoreOption = {
    createIfNotExists?: boolean;
};
declare const collection: (genDocRef: (id?: string | undefined) => string) => <DA extends Store.DocumentAction>(name: string, documentAction: (name: string) => DA) => Store.CollectionActions<LocalStorageStoreOption, DA>;

export { LocalStorageStoreOption, collection, collectionDocument, createCollection, createDocument, getCollections, queryCollection, queryDocument, setCollection, setCollectionDocs, setDocument };
