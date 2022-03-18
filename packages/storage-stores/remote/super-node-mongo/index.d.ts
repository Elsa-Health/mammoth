import { Store } from '@sabertooth/storage';
import { SuperNodeMongoStoreOptions } from './api';
import 'mongodb';
import 'axios';

declare function superNodeMongoBuildConfig(SUPER_NODE_API_URL: string): Store.BuildConfig<SuperNodeMongoStoreOptions>;

export { superNodeMongoBuildConfig as default };
