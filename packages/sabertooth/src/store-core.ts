import { Subject } from "rxjs";
import { SBSet } from ".";
import type { CRDTMessageBox, SBState, State } from "./cmdrt-set";
import { nxt } from "./hybrid-logical-clock";

type QF = { $eq?: string; $text?: string };
type QO = {
	// 		type: "create";
	// 		data: object;
	//   }
	$id?: string | QF;
	[field: string]: string | QF | undefined;
};
export type CollectionAction<T = any> = {
	/**
	 * Collection id
	 */
	id: string;
} & (
	| { type: "single-query"; query: QO }
	| { type: "query"; query: QO }
	| { type: "get-doc-ids" }
	| { type: "set"; idDataPais: [string | undefined, T][] }
);

export type DData = { [field: string]: any };
export type DocumentAction<T extends DData = DData> = {
	/**
	 * Collection Id for the collection corresponding to this document
	 */
	collectionId: string;

	/**
	 * Document Id
	 */
	id: string;
} & (
	| { type: "set"; data?: T }
	| { type: "read" }
	| { type: "update"; partialValue: Partial<T> }
	| {
			/**
			 * @deprecated
			 * Don't use this. Unsafe. Might not work well with CDRTs
			 */
			type: "delete";
	  }
);

/**
 * !IMPORTANT
 * This thing is used everywhere
 *
 * @param documentId
 * @param collectionId
 * @param fire
 * @returns
 */
const documentBox = <T>(
	documentId: string,
	collectionId: string,
	fire: (action: DocumentAction) => Promise<T | null>
) => {
	return {
		set: async (data: DData) => {
			console.log("SETTING...");
			await fire({
				type: "set",
				id: documentId,
				collectionId,
				data,
			});
		},
		update: async (obj: Partial<DData>) => {
			await fire({
				type: "update",
				id: documentId,
				collectionId,
				partialValue: obj,
			});
		},
		query: async () => {
			return await fire({
				type: "read",
				id: documentId,
				collectionId,
			});
		},
		delete: async () => {
			return await fire({ type: "delete", id: documentId, collectionId });
		},
	};
};

const collectionBox = <T, D>(
	collectionId: string,
	collectionFire: (
		action: CollectionAction
	) => Promise<Set<[string, T]> | string[] | null>,
	document: (id: string) => D
) => {
	const addMultiple = async (data: [string, DData][]) => {
		await collectionFire({
			type: "set",
			id: collectionId,
			idDataPais: data,
		});
	};

	const queryMultiple = async (query: QO) => {
		return Array.from(
			(await collectionFire({
				type: "query",
				id: collectionId,
				query,
			})) as Set<any>
		);
	};

	return {
		document,
		docs: async () => {
			const ids = await collectionFire({
				type: "get-doc-ids",
				id: collectionId,
			});

			return (ids || []).map((id) => ({
				id,
				...document(id as string),
			}));
		},
		add: async (data: DData) => {
			await collectionFire({
				type: "set",
				id: collectionId,
				idDataPais: [[undefined, data]],
			});
		},
		/**
		 * @deprecated
		 * (alias)
		 * Use `addMultiple`
		 */
		addMult: addMultiple,
		addMultiple,

		query: async (query: QO) => {
			return await collectionFire({
				type: "single-query",
				id: collectionId,
				query,
			});
		},
		queryMultiple,

		/**
		 * @deprecated
		 * (alias)
		 * Use `queryMultiple`
		 */
		queryDocs: queryMultiple,
	};
};

// // function buildStore
// class BaseStore {
// 	collection(collectionId: string) {
// 		throw new Error("Method not implemented.");
// 	}

// 	/**
// 	 * Get all the collections in this store
// 	 */
// 	collections() {
// 		throw new Error("Method not implemented.");
// 	}
// }

export interface Store {
	new (
		documentFire: <T>(action: DocumentAction) => Promise<T | null>,
		collectionFire: <T>(action: CollectionAction) => Promise<T | null>,
		getCollections: () => Promise<string[]>
	): Store;
}

export class Store {
	/**
	 * Determines how the function should execute
	 * bases on the message passed through
	 */
	protected _documentFireFn: <T>(action: DocumentAction) => Promise<T | null>;

	/**
	 * Like `_documentFireFn` except,
	 * it's for collections
	 */
	protected _collectionFireFn: <T>(
		action: CollectionAction<T>
	) => Promise<T | null>;

	/**
	 * Gets the collection
	 */
	protected getCollections: () => Promise<string[]>;

	constructor(
		documentFire: <T>(action: DocumentAction) => Promise<T | null>,
		collectionFire: <T>(action: CollectionAction) => Promise<T | null>,
		getCollections: () => Promise<string[]>
	) {
		this._documentFireFn = documentFire;
		this._collectionFireFn = collectionFire;
		this.getCollections = getCollections;
	}

	private collectionDocument<T extends { [x: string]: any }>(
		documentId: string,
		collectionId: string,
		extend?: T
	) {
		return {
			...documentBox(documentId, collectionId, this._documentFireFn),
			...(extend || {}),
		};
	}

	async collections() {
		return (await this.getCollections()).map((collection) => {
			return {
				id: collection,
				...collectionBox(collection, this._collectionFireFn, (id) => {
					return this.collectionDocument(id, collection);
				}),
			};
		});
	}

	collection<E, DE>(
		collectionId: string,
		collectionExtend?: E,
		documentExtend?: DE
	) {
		const document = (documentId: string) =>
			this.collectionDocument(documentId, collectionId, documentExtend);
		return {
			...collectionBox(collectionId, this._collectionFireFn, document),
			...(collectionExtend || {}),
		};
	}
}

export interface ObservableStore {
	new (
		documentFire: <T>(action: DocumentAction) => Promise<T | null>,
		collectionFire: <T>(action: CollectionAction) => Promise<T | null>,
		getCollections: () => Promise<string[]>
	): ObservableStore;
}

/**
 * Store the allows you to check
 */
export class ObservableStore extends Store {
	private _collectionObservable;
	private _documentObservable;

	constructor(
		documentFire: <T>(action: DocumentAction) => Promise<T | null>,
		collectionFire: <T>(action: CollectionAction) => Promise<T | null>,
		getCollections: () => Promise<string[]>
	) {
		const obs = new Subject<{
			action: DocumentAction;
			result: void | any;
		}>();
		const collObs = new Subject<{
			action: CollectionAction;
			partial: any;
		}>();

		super(
			async (action) => {
				const result = await documentFire(action);
				obs.next({ action, result });

				if (action.type === "set" || action.type === "update") {
					// pinging the collection observable
					collObs.next({
						action: {
							type: "set",
							idDataPais: [[action.id, result]],
							id: action.collectionId,
						},
						// TODO. this might be hard to do actually
						partial: result,
					});
				}
				return result;
			},
			async (action) => {
				const result = await collectionFire(action);
				collObs.next({ action, partial: result });
				return result;
			},
			getCollections
		);
		this._documentObservable = obs;
		this._collectionObservable = collObs;
	}

	collection(collectionId: string) {
		return super.collection(
			collectionId,
			{
				observe: (
					type: "updated" | "read",
					fn: (data: any) => void
				) => {
					this._collectionObservable.subscribe(
						({ action, partial }) => {
							if (action.type === "set" && type === "updated") {
								fn(partial);
							} else if (
								(action.type === "single-query" ||
									action.type === "query") &&
								type === "read"
							) {
								fn(partial);
							}
						}
					);
				},
			},
			{
				observe: (
					type: "set" | "update" | "delete",
					fn: (data: any) => void
				) => {
					this._documentObservable.subscribe(({ action, result }) => {
						if (action.type === type) {
							fn(result);
						}
					});
				},
			}
		);
	}
}

export function BuildCRDTStore(
	class_: Store,
	crdtMsgBox: CRDTMessageBox,
	f: {
		documentFire: <T>(action: DocumentAction) => Promise<T | null>;
		collectionFire: <T>(action: CollectionAction) => Promise<T | null>;
		getCollections: () => Promise<string[]>;
	}
) {
	const crdtDocFire = async (action: DocumentAction) => {
		const result = await f.documentFire(action);

		// Concerned with only the operation that are useful in constructing the CRDT
		if (action.type === "set" || action.type === "update") {
			// message needed to track the messages
			crdtMsgBox.append(action, result);
		}
		return result;
	};

	const crdtCollFire = async (action: CollectionAction) => {
		const result = await f.collectionFire(action);
		if (action.type === "set") {
			result.forEach(([id, data]) => {
				crdtMsgBox.append(
					{
						type: "set",
						id,
						collectionId: action.id,
						data,
					},
					data
				);
			});
		}

		return result;
	};

	/**
	 *
	 */
	const store = new class_(crdtDocFire, crdtCollFire, f.getCollections);

	/**
	 * Syncronize the store with the CRDT messages
	 */
	const sync = async () => {
		const { docs, collections } = crdtMsgBox.resolve();

		// write collections
		Object.entries(collections).forEach(([collectionId, docSet]) => {
			store.collection(collectionId).addMultiple(
				Array.from(docSet)
					.map((docId) => [
						docId,
						docs[docId].state as DData | undefined,
					])
					.filter((d) => d[1] !== undefined) as [string, DData][]
			);
		});
	};

	/**
	 * Merge with the other state-based CDRT messages
	 * @param other
	 */
	const mergeOther = (other: SBState<DocumentAction<any>, any>[]) => {
		crdtMsgBox.merge(new SBSet(other));
	};

	// Building ObservableStore
	return {
		store: store,
		sync,
		mergeOther,
		merge: (states: State<DocumentAction<any>, any>[]) =>
			mergeOther(states.map((state) => ({ state, timestamp: nxt() }))),
	};
}

export function BuildStore<CO, DO>(
	class_: Store,
	f: {
		documentFire: <T>(action: DocumentAction) => Promise<T | null>;
		collectionFire: <T>(action: CollectionAction) => Promise<T | null>;
		getCollections: () => Promise<string[]>;
	}
) {
	const store = new class_(
		async (action) => await f.documentFire(action),
		async (action) => await f.collectionFire(action),
		f.getCollections
	);

	return store;
}