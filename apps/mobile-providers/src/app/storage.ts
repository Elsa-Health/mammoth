import { buildStore } from "../@libs/storage-core";
import MMKVStore from "../@libs/storage-stores/local/react-native-mmkv";

import { MMKV } from "react-native-mmkv";
import uuid from "react-native-uuid";

// TODO: To change the name of the store to something more meaningful
const rawMMKVStore = new MMKV({ id: "user-something" });
const store = buildStore(
	MMKVStore(rawMMKVStore, (id) => {
		const $id = id || uuid.v4().toString();
		console.log({ $id });
		return $id;
	})
);
const deviceStorage = () => store;

export default deviceStorage;
