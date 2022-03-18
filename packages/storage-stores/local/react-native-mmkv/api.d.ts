import { Store } from '@sabertooth/storage';
import { MMKV } from 'react-native-mmkv';

declare function getCollections(mmkv: MMKV): string[];
declare const collectionDocumentWithStore: (mmkv: MMKV) => (collName: string) => (docName: string) => Store.DocumentAction;
declare const collectionWithStore: (mmkv: MMKV, genDocId: (id?: string | undefined) => string) => <D extends Store.DocumentAction>(collName: string, documentAction: (name: string) => D) => Store.CollectionActions<{
    checkIfExists?: boolean | undefined;
}, D>;

export { collectionDocumentWithStore, collectionWithStore, getCollections };
