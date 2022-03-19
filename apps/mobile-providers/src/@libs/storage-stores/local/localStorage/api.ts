import { Store } from "../../../storage-core";

export function getCollections() {
	const collStr = localStorage.getItem("__collections");
	return collStr === null
		? ([] as string[])
		: (() => {
				const s: string | string[] = JSON.parse(collStr);
				return Array.isArray(s) ? s : [s];
		  })();
}

function _setCollections(pv: (preColl: string[]) => string[]) {
	const newColls = pv(getCollections());
	localStorage.setItem("__collections", JSON.stringify(newColls));
}

function collectionExists(collectionRef: string) {
	const collObjStr = localStorage.getItem(collectionRef);
	return collObjStr !== null;
}

/**
 * Set information in the collection
 * @param pv
 * @param collectionRef
 * @param permission
 */
export function setCollection(
	pv: (collObj: CollectionObject) => CollectionObject,
	collectionRef: string
) {
	const obj = queryCollection(collectionRef);
	if (obj === null) {
		throw new Error(
			`Collection with REFERENCE "${collectionRef}", doesn't exist`
		);
	}
	const coll = pv(obj);

	// convert to raw and save
	localStorage.setItem(
		collectionRef,
		JSON.stringify({
			__docs: coll.docsRefs,
		} as RawCollectionObject)
	);
}

type RawCollectionObject = {
	__docs: string[];
};
type CollectionObject = {
	docsRefs: string[];
};

/**
 * Get collection information
 * @param collectionRef
 */
export function queryCollection(
	collectionRef: string
): CollectionObject | null {
	const collObjStr = localStorage.getItem(collectionRef);
	const collObj: RawCollectionObject =
		collObjStr === null ? null : JSON.parse(collObjStr);

	// if document no present, set to null
	if (collObj === null) {
		// throw new Error(`Collection with REFERENCE "${collectionRef}", doesn't exist`)
		return null;
	}

	// Permission object
	return {
		docsRefs: collObj.__docs,
	} as CollectionObject;
}

type DocumentObject<Obj = any> = {
	data: Obj;
};
// type MapObj = { [k: string]: string | number | null }
type RawDocumentObject<Obj = any> = {
	__data: Obj;
};

export function queryDocument<T>(
	documentRef: string
): DocumentObject<T> | null {
	const docObjStr = localStorage.getItem(documentRef);
	const docObj: RawDocumentObject<T> | null =
		docObjStr === null ? null : JSON.parse(docObjStr);

	// if document no present, set to null
	if (docObj === null) {
		// throw new Error(`Document with REFERENCE "${documentRef}", doesn't exist`)
		return null;
	}

	return {
		data: docObj.__data,
	};
}

function documentExists(documentRef: string) {
	const collObjStr = localStorage.getItem(documentRef);
	return collObjStr !== null;
}

function documentExistsInCollection(
	documentRef: string,
	collectionRef: string
) {
	const obj = queryCollection(collectionRef);
	if (obj === null) {
		throw new Error(
			`Collection with REFERENCE "${collectionRef}", doesn't exist`
		);
	}

	const { docsRefs } = obj;
	return docsRefs.includes(documentRef);
}

export function createDocument<T>(documentRef: string, data: T) {
	const docObjStr = localStorage.getItem(documentRef);
	if (docObjStr !== null) {
		throw new Error(
			`Document with REFERENCE "${documentRef}", already exists`
		);
	}

	localStorage.setItem(documentRef, JSON.stringify({ __data: data }));
}

export function setDocument(
	documentRef: string,
	pv: (doc: DocumentObject) => DocumentObject
) {
	const obj = queryDocument(documentRef);

	if (obj === null) {
		throw new Error(
			`Document w/ REFERENCE "${documentRef}", doesn't exist`
		);
	}

	const { data: __data } = pv(obj);

	// Set a document
	localStorage.setItem(documentRef, JSON.stringify({ __data }));
}

export function setCollectionDocs(
	pv: (docRefs: CollectionObject["docsRefs"]) => CollectionObject["docsRefs"],
	collectionRef: string
) {
	const obj = queryCollection(collectionRef);
	if (obj === null) {
		throw new Error(
			`Collection with REFERENCE "${collectionRef}", doesn't exist`
		);
	}

	const { docsRefs: oldDocRefs } = obj;
	localStorage.setItem(
		collectionRef,
		JSON.stringify({ __docs: pv(oldDocRefs) })
	);
}

export function createCollection(collectionRef: string) {
	// CREATE IF DON'T EXIST
	const docObjStr = localStorage.getItem(collectionRef);
	if (docObjStr !== null) {
		throw new Error(
			`Collection with REFERENCE "${collectionRef}", already exists`
		);
	}
	// Add the collectionKey to the collections table if doesn't exist
	_setCollections((f) => {
		if (!f.includes(collectionRef)) {
			return [...f, collectionRef];
		}

		return f;
	});

	localStorage.setItem(collectionRef, JSON.stringify({ __docs: [] }));
}
type ProperDocumentData = {
	$id: string;
	[k: string]: any;
};

const addDocumentToCollection = <T extends ProperDocumentData>(
	collectionRef: string,
	data: T
	// genDocRef: ( )
) => {
	const { $id, normalizedData } = data;

	console.log(normalizedData);
	const docId = $id;
	const docRef = `${collectionRef}/${docId}`;

	setCollectionDocs((docsIds) => [...docsIds, docId], collectionRef);
	createDocument<T>(docRef, normalizedData);

	return docId;
};

export const collectionDocument =
	(genDocRef: (id?: string) => string) =>
	(collName: string) =>
	(docName: string): Store.DocumentAction => {
		const collectionRef = collName;
		const docId = genDocRef(docName);

		const docRef = `${collectionRef}/${docId}`;
		return {
			create: async (data) => {
				addDocumentToCollection(collectionRef, {
					...data,
					$id: docId,
				});
			},
			set: async (data) => {
				setDocument(docRef, (d) => ({ ...d, ...data }));
			},
			query: async <T>() => {
				const obj = queryDocument<T>(docRef);
				return obj === null ? null : obj.data;
			},
		};
	};

export type LocalStorageStoreOption = { createIfNotExists?: boolean };
export const collection =
	(genDocRef: (id?: string) => string) =>
	<DA extends Store.DocumentAction>(
		name: string,
		documentAction: (name: string) => DA
	): Store.CollectionActions<LocalStorageStoreOption, DA> => {
		const collectionRef = name;

		const docRefFn = (docId: string) =>
			`${collectionRef}/${genDocRef(docId)}`;
		return {
			create: async (opt) => {
				const { createIfNotExists = true } = opt || {};
				if (createIfNotExists) {
					if (!collectionExists(collectionRef)) {
						createCollection(collectionRef);
					}
				} else {
					createCollection(collectionRef);
				}
			},
			addDoc: async (docData) => {
				const { $id, ...other } = docData;
				return addDocumentToCollection(collectionRef, {
					$id: genDocRef($id),
					...other,
				});
			},
			addMult: async (docsData) => {
				return docsData.map((s) => {
					const { $id, ...o } = s;
					return addDocumentToCollection(collectionRef, {
						$id: genDocRef($id),
						...o,
					});
				});
			},
			queryDoc: async <T extends Store.DocumentData>(
				queryOptions: Store.QueryFilter | undefined
			) => {
				const { docsRefs } = queryCollection(collectionRef) || {
					docsRefs: [],
				};

				if (docsRefs.length > 0) {
					if (queryOptions !== undefined) {
						const { $id, ...other } = queryOptions;

						// check Ids are selected
						if (Array.isArray($id)) {
							throw new Error(
								"You are querying for $ids. You shouldn't use arrays"
							);
						} else {
							if ($id !== undefined) {
								const qd = queryDocument<T>(docRefFn($id));
								return qd !== null ? qd.data : null;
							} else {
								const searchedDoc = docsRefs
									.map((docId) => {
										const qd = queryDocument<T>(
											docRefFn(docId)
										);
										return qd !== null ? qd.data : null;
									})
									.filter((d) => d !== null)
									.find((s) =>
										Object.entries(other)
											.map((x) => {
												const [key, val] = x;

												if (s !== null) {
													return s[key] === val;
												}

												return false;
											})
											.reduce(
												(x, y) =>
													Boolean(x) || Boolean(y),
												true
											)
									);

								return searchedDoc !== undefined
									? searchedDoc
									: null;
							}
						}
					} else {
						// take the first one
						const qd = queryDocument<T>(docRefFn(docsRefs[0]));
						return qd !== null ? qd.data : null;
					}
				}

				return null;
			},
			queryDocs: async <T extends Store.DocumentData>(
				qOpts: Store.QueryFilter | undefined
			) => {
				const { docsRefs } = queryCollection(collectionRef) || {
					docsRefs: [],
				};
				if (docsRefs.length > 0) {
					if (qOpts !== undefined) {
						const { $id, ...other } = qOpts;

						const $ids = !Array.isArray($id)
							? $id !== undefined
								? [$id]
								: undefined
							: $id;

						const content = docsRefs
							// optionally filter by ids
							.filter((id) =>
								$ids === undefined ? true : $ids.includes(id)
							)
							.map((id) => {
								const qd = queryDocument<T>(docRefFn(id));
								return qd !== null
									? { $id: id, ...qd.data }
									: null;
							})
							.filter((s) => s !== null)
							.filter((s) =>
								Object.entries(other)
									.map((x) => {
										const [key, val] = x;

										if (s !== null) {
											return s[key] === val;
										}
										return false;
									})
									.reduce(
										(x, y) => Boolean(x) || Boolean(y),
										true
									)
							);
						return content as T[];
					}
					return (
						docsRefs
							.map((docRef) => queryDocument<T>(docRef))
							.filter((s) => s !== null)
							// @ts-ignore
							.map((s) => s.data) as T[]
					);
				}
				return [] as T[];
			},
			doc: documentAction,
			docs: async () => {
				const docsRefs =
					(queryCollection(collectionRef) || { docsRefs: [] })
						.docsRefs || [];

				return docsRefs.map((docRef) => ({
					docId: docRef,
					...documentAction(docRef),
				}));
			},
			search: async (text, onResult) => {
				throw new Error("Not implemented");
			},
		};
	};
