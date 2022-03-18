import { MMKV } from 'react-native-mmkv';
import { Store } from '@sabertooth/storage';

declare function MMKVStore(mmkv: MMKV, genDocId: (id?: string) => string): Store.BuildConfig<{
    checkIfExists: boolean;
}>;

export { MMKVStore as default };
