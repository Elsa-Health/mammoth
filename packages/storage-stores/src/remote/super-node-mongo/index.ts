import { Store } from "@sabertooth/storage";
import axios from "axios";
import {
	collection,
	collectionDocument,
	SuperNodeMongoStoreOptions,
} from "./api";

const createSuperNodeAxios = (url: string) => axios.create({ baseURL: url });

export default function superNodeMongoBuildConfig(
	SUPER_NODE_API_URL: string
): Store.BuildConfig<SuperNodeMongoStoreOptions> {
	const snAxios = createSuperNodeAxios(SUPER_NODE_API_URL);

	return {
		collection: collection(snAxios),
		collectionDocument: collectionDocument(snAxios),
		getCollections: async () => {
			const res = await snAxios.post("/collections");
			return res.data;
		},
	};
}
