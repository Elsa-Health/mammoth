import { MMKV } from "react-native-mmkv";
import { Store } from "@sabertooth/storage";
export default function MMKVStore(mmkv: MMKV, genDocId: (id?: string) => string): Store.BuildConfig<{
    checkIfExists: boolean;
}>;
