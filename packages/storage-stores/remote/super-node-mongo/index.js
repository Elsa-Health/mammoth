import axios from "axios";
import { collection, collectionDocument, } from "./api";
const createSuperNodeAxios = (url) => axios.create({ baseURL: url });
export default function superNodeMongoBuildConfig(SUPER_NODE_API_URL) {
    const snAxios = createSuperNodeAxios(SUPER_NODE_API_URL);
    return {
        // @ts-ignore
        collection: collection(snAxios),
        collectionDocument: collectionDocument(snAxios),
        getCollections: async () => {
            const res = await snAxios.post("/collections");
            return res.data;
        },
    };
}
