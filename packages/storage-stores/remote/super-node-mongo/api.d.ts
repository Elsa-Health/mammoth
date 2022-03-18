import { Store } from '@sabertooth/storage';
import { CreateCollectionOptions } from 'mongodb';
import { AxiosInstance } from 'axios';

declare const collectionDocument: (snAxios: AxiosInstance) => (collName: string) => (docName: string) => Store.DocumentAction;
declare type SuperNodeMongoStoreOptions = {
    checkIfExists?: boolean;
    createOpts?: CreateCollectionOptions;
};
declare const collection: (snAxios: AxiosInstance) => <DA extends Store.DocumentAction>(name: string, documentAction: (name: string) => DA) => Store.CollectionActions<SuperNodeMongoStoreOptions, DA>;

export { SuperNodeMongoStoreOptions, collection, collectionDocument };
