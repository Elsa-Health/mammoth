import { Store } from '@sabertooth/storage';
import { LocalStorageStoreOption } from './api';

/**
 * These are the configurations needed to recreate the storage class
 */
declare const localStorageBuildConfig: (genDocRef: (id?: string | undefined) => string) => Store.BuildConfig<LocalStorageStoreOption>;

export { localStorageBuildConfig as default };
