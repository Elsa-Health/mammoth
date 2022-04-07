import { Store } from "sabertooth";
import { SuperNodeMongoStoreOptions } from "./api";
export default function superNodeMongoBuildConfig(SUPER_NODE_API_URL: string): Store.BuildConfig<SuperNodeMongoStoreOptions>;
