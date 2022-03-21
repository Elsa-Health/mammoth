import ItemStorage, { LocalStorageStoreOption } from './index';
import { Store } from '@sabertooth/storage';

declare function getCollections(COLLECTIONS_REF: string, istore: ItemStorage): Promise<string[]>;
declare const collectionDocumentWithStore: (istore: ItemStorage, collRefFn: (collId: string) => string) => (collId: string) => (docName: string, docRefFn: (docId: string) => string) => Store.DocumentAction;
declare const collectionWithStore: (COLLECTIONS_REF: string, collRefFn: (collId: string) => string, istore: ItemStorage, genDocId: (id?: string | undefined) => string) => <D extends Store.DocumentAction>(collName: string, documentAction: (name: string, docRefFn: (docId: string) => string) => D) => Store.CollectionActions<LocalStorageStoreOption, D>;

export { collectionDocumentWithStore, collectionWithStore, getCollections };
