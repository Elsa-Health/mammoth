import { ItemStorage, LocalStorageStoreOption } from ".";
import { Store } from "@sabertooth/storage";
export declare function getCollections(COLLECTIONS_REF: string, istore: ItemStorage): Promise<string[]>;
export declare const collectionDocumentWithStore: (istore: ItemStorage, collRefFn: (collId: string) => string) => (collId: string) => (docName: string, docRefFn: (docId: string) => string) => Store.DocumentAction;
export declare const collectionWithStore: (COLLECTIONS_REF: string, collRefFn: (collId: string) => string, istore: ItemStorage, genDocId: (id?: string | undefined) => string) => <D extends Store.DocumentAction>(collName: string, documentAction: (name: string, docRefFn: (docId: string) => string) => D) => Store.CollectionActions<LocalStorageStoreOption, D>;
