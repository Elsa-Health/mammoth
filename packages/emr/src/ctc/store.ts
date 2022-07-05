import { CollectionNode, Store } from "papai/collection/core";
import { Document } from "papai/collection/types";

import { doc, setDoc, setDocs } from "papai/collection";

export const withStore = (
	useStore: (store: Store, generateId: () => string) => void
) =>
	function (store: Store, generateId: () => string) {
		// using the store
		useStore(store, generateId);
	};

/**
 * Convenience function to run execute collection related transactions
 * @param generateId
 * @param collection
 * @returns
 */
export const prepareExecutor = <T extends Document.Data>(
	generateId: (data: T) => string,
	collection: CollectionNode<T>
) => {
	return function (fn: RunTransactionParams<T>) {
		return runTransaction(generateId, collection, fn);
	};
};

/**
 * Convenience function to prepare lazy fucntions
 * @param generateId
 * @param collection
 * @returns
 */
export const prepareLazyExecutors = <T extends Document.Data>(
	generateId: (data: T) => string,
	collection: CollectionNode<T>
) => {
	return function (fn: RunTransactionParams<T>) {
		return () => runTransaction(generateId, collection, fn);
	};
};

type RunTransactionParams<T extends Document.Data> = (params: {
	add: (data: T) => Promise<void>;
	multiAdd: (data: T[]) => Promise<void>;
	set: (data: [string, T]) => Promise<void>;
	multiSet: (data: [string, T][]) => Promise<void>;
}) => Promise<void> | void;

export async function runTransaction<T extends Document.Data>(
	generateId: (data: T) => string,
	collection: CollectionNode<T>,
	fn: RunTransactionParams<T>
) {
	return fn({
		set: async (data) => {
			const [id, obj] = data;
			return await setDoc(doc(collection, id), obj);
		},
		multiSet: async (data) => {
			return await setDocs(
				collection,
				data.map(([id, obj]) => [id, obj])
			);
		},
		add: async (data) => {
			return await setDoc(doc(collection, generateId(data)), data);
		},
		multiAdd: async (data) => {
			return await setDocs(
				collection,
				data.map((obj) => [generateId(obj), obj])
			);
		},
	});
}

export const lazy = async (run: Run) => await run();

type Run = () => Promise<void> | any;
export async function executeChain(runs: Run[]) {
	for (const run of [...runs, () => Promise.resolve()]) {
		await lazy(run);
	}
}

export async function executeAll(runs: Run[]) {
	return Promise.all(runs.map(lazy));
}
