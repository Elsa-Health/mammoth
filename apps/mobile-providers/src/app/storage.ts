import { buildStore } from "../@libs/storage-core";
import MMKVStore from "../@libs/storage-stores/local/react-native-mmkv";

import { MMKV } from "react-native-mmkv";
import uuid from "react-native-uuid";

// TODO: To change the name of the store to something more meaningful
const rawMMKVStore = new MMKV({ id: "$DEV_STORAGE" });
const store = buildStore(
	MMKVStore(rawMMKVStore, (id) => id || uuid.v4().toString())
);

// rawMMKVStore.clearAll();
const deviceStorage = () => store;
export default deviceStorage;
