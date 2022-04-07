import { Store } from "sabertooth";
import { CreateCollectionOptions } from "mongodb";
import { AxiosInstance } from "axios";

import * as qs from "query-string";

export const collectionDocument =
	(snAxios: AxiosInstance) =>
	(collName: string) =>
	(
		docName: string,
		docRefFn: (id: string) => string
	): Store.DocumentAction => {
		const collectionRef = collName;
		const docId = docName;
		return {
			create: async (data) => {
				await snAxios.post(
					`/col/${collectionRef}/doc/${docId}/create`,
					{
						data,
					}
				);

				// return res.data.$id as string;
			},
			query: async <T>() => {
				const res = await snAxios.post(
					`/col/${collectionRef}/doc/${docId}/query`
				);

				// console.log(`/col/${collectionRef}/doc/${docId}/query`);
				// Current return $id
				return res.data.data as T;
			},
			set: async (data) => {
				// const { $id, ...data } = _data;
				await snAxios.post(`/col/${collectionRef}/doc/${docId}/set`, {
					data,
				});
			},
		};
	};

export type SuperNodeMongoStoreOptions = {
	checkIfExists?: boolean;
	createOpts?: CreateCollectionOptions;
};

export const collection = (snAxios: AxiosInstance) => {
	return <DA extends Store.DocumentAction>(
		name: string,
		documentAction: (name: string) => DA
	): Store.CollectionActions<SuperNodeMongoStoreOptions, DA> => {
		return {
			create: async (opts = {}) => {
				const { createOpts, ...rest } = opts;
				await snAxios.post(
					`/col/${name}/create?${qs.stringify(rest)}`,
					{
						opt: createOpts,
					}
				);
			},
			addDoc: async (docData) => {
				const res = await snAxios.post(`/col/${name}/add`, {
					data: docData,
				});

				return res.data.$id as string;
			},
			addMult: async (docData) => {
				const res = await snAxios.post(`/col/${name}/add-multiple`, {
					data: docData,
				});

				return res.data.$id as string[];
			},
			queryDoc: async <T>(
				queryOptions: Store.QueryFilter | undefined
			) => {
				const res = await snAxios.post(
					`/col/${name}/query?${qs.stringify(queryOptions || {})}`
				);

				return res.data.data as T;
			},
			queryDocs: async <T>(
				queryOptions: Store.QueryFilter | undefined
			) => {
				const res = await snAxios.post(
					`/col/${name}/query-multiple?${qs.stringify(
						queryOptions || {}
					)}`
				);

				return res.data.data as T[];
			},
			doc: documentAction,
			docs: async () => {
				const res = await snAxios.post(`/col/${name}/docs`);

				return (res.data.$ids as string[]).map((docName) => ({
					docId: docName,
					...documentAction(docName),
				}));
			},
		};
	};
};
