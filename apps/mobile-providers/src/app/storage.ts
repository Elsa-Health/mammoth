// import { buildStore } from "@sabertooth/storage";
import { buildStore } from "../@libs/storage-core";

/** MMKV Type storage */
// import MMKVStore from "@sabertooth/storage-stores/local/react-native-mmkv";
// import MMKVStore from "../@libs/storage-stores/local/react-native-mmkv";

// import { MMKV } from "react-native-mmkv";
import uuid from "react-native-uuid";

// // TODO: To change the name of the store to something more meaningful
// const rawMMKVStore = new MMKV({ id: "$DEV_STORAGE" });
// const store = buildStore(
// 	MMKVStore(rawMMKVStore, (id) => id || uuid.v4().toString())
// );

/** AsyncStorage type store */
import ItemStorage from "../@libs/storage-stores/local/itemStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastStorage from "react-native-fast-storage";

export const keyGenerator = (key?: string | undefined) =>
	key || uuid.v4().toString();

const store = buildStore(
	// ItemStorage("$DEV_STORAGE", AsyncStorage, keyGenerator)
	ItemStorage("$DEV_STORAGE_FAST_V2", FastStorage, keyGenerator)
);

// rawMMKVStore.clearAll();
const deviceStorage = () => store;
export default deviceStorage;
