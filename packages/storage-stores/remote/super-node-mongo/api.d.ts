import { Store } from "@sabertooth/storage";
import { CreateCollectionOptions } from "mongodb";
import { AxiosInstance } from "axios";
export declare const collectionDocument: (snAxios: AxiosInstance) => (collName: string) => (docName: string, docRefFn: (id: string) => string) => Store.DocumentAction;
export declare type SuperNodeMongoStoreOptions = {
    checkIfExists?: boolean;
    createOpts?: CreateCollectionOptions;
};
export declare const collection: (snAxios: AxiosInstance) => <DA extends Store.DocumentAction>(name: string, documentAction: (name: string) => DA) => Store.CollectionActions<SuperNodeMongoStoreOptions, DA>;
