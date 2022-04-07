import { MMKV } from "react-native-mmkv";
import { Store } from "sabertooth";
export default function MMKVStore(mmkv: MMKV, genDocId: (id?: string) => string): Store.BuildConfig<{
    checkIfExists: boolean;
}>;
