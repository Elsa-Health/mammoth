import { Store } from '@sabertooth/storage';

declare type KeyValuePair = [string, string | null];
declare type LocalStorageStoreOption = {
    createIfNotExists?: boolean;
};
declare type ItemStorage = {
    getItem: (ref: string) => Promise<string | null>;
    setItem: (ref: string, item: string) => Promise<void>;
    multiGet: (refs: string[]) => Promise<readonly KeyValuePair[] | void>;
    multiSet: (kvp: Array<[string, string]>) => Promise<void>;
};
declare const ItemStorage: (name: string, storage: ItemStorage, genDocRef: (id?: string | undefined) => string) => Store.BuildConfig<LocalStorageStoreOption>;

export { ItemStorage, LocalStorageStoreOption, ItemStorage as default };
