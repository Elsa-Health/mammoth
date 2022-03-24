import { ItemStorage, LocalStorageStoreOption } from ".";
import { Store } from "../../../storage-core";

type Document<T> = {
	$data: T;
};
async function getDocument<T>(istore: ItemStorage, documentRef: string) {
	const val = await istore.getItem(documentRef);

	if (val === null) {
		throw new Error(
			`Document w/ REFERENCE "${documentRef}", doesn't exist`
		);
	}

	const obj: Document<T> = JSON.parse(val);
	return obj.$data;
}

async function queryDocument<T>(istore: ItemStorage, documentRef: string) {
	try {
		return await getDocument<T>(istore, documentRef);
	} catch (err) {
		return null;
	}
}

async function getCollection(istore: ItemStorage, collectionRef: string) {
	const val = await istore.getItem(collectionRef);

	if (val === null) {
		throw new Error(
			`Collection w/ REFERENCE "${collectionRef}", doesn't exist`
		);
	}

	const obj = JSON.parse(val); // { $docs: [] }
	return { $docs: (obj?.$docs || []) as string[] };
}

async function getCollectionDocs(istore: ItemStorage, collectionRef: string) {
	return (await getCollection(istore, collectionRef)).$docs;
}

async function setCollectionDocs(
	istore: ItemStorage,
	collectionRef: string,
	pv: (docs: string[]) => string[]
) {
	const docs = await getCollectionDocs(istore, collectionRef);

	await istore.setItem(collectionRef, JSON.stringify({ $docs: pv(docs) }));
}

async function createDocument<T>(
	istore: ItemStorage,
	documentRef: string,
	data: T
) {
	const docObjStr = await queryDocument(istore, documentRef);
	console.log(docObjStr);
	if (docObjStr !== null) {
		throw new Error(
			`Document with REFERENCE "${documentRef}", already exists`
		);
	}

	await istore.setItem(documentRef, JSON.stringify({ $data: data }));
}

async function setDocument<T extends { [key: string]: any }>(
	istore: ItemStorage,
	documentRef: string,
	dataFn: (data: T) => T
) {
	const prevData = await getDocument<T>(istore, documentRef);

	// Set a document
	istore.setItem(documentRef, JSON.stringify({ $data: dataFn(prevData) }));
}

export async function getCollections(
	COLLECTIONS_REF: string,
	istore: ItemStorage
) {
	const colls = await istore.getItem(COLLECTIONS_REF);
	return colls === null ? [] : (JSON.parse(colls) as string[]);
}

async function _setCollections(
	COLLECTIONS_REF: string,
	istore: ItemStorage,
	pv: (cols: string[]) => string[]
) {
	istore.setItem(
		COLLECTIONS_REF,
		JSON.stringify(pv(await getCollections(COLLECTIONS_REF, istore)))
	);
}

async function createCollection(
	COLLECTIONS_REF: string,
	istore: ItemStorage,
	collectionID: string,
	collRefFn: (collId: string) => string
) {
	const ref = collRefFn(collectionID);
	if (await collectionExists(istore, ref)) {
		throw new Error(`Collection with ID "${collectionID}", already exists`);
	}
	_setCollections(COLLECTIONS_REF, istore, (f) => {
		if (!f.includes(collectionID)) {
			return [...f, collectionID];
		}

		return f;
	});

	istore.setItem(ref, JSON.stringify({ $docs: [] }));
}
async function collectionExists(istore: ItemStorage, collectionRef: string) {
	const exists = (await istore.getItem(collectionRef)) !== null;
	// console.log(`Does ${collectionRef} exist?:`, exists);
	return exists;
}

async function addDocumentToCollection<T>(
	istore: ItemStorage,
	collectionRef: string,
	docID: string,
	data: T,
	refFn: (docID: string) => string
) {
	// console.log(
	// 	"Setting the docId",
	// 	docID,
	// 	" to collectionRef:",
	// 	collectionRef
	// );
	await setCollectionDocs(istore, collectionRef, (docsIds) => [
		...docsIds,
		docID,
	]);

	await createDocument<T>(istore, refFn(docID), data);

	console.log("ADDED: ==>", docID);

	return docID;
}

export const collectionDocumentWithStore =
	(istore: ItemStorage, collRefFn: (collId: string) => string) =>
	(collId: string) =>
	(
		docName: string,
		docRefFn: (docId: string) => string
	): Store.DocumentAction => {
		return {
			create: async (data) => {
				await addDocumentToCollection(
					istore,
					collRefFn(collId),
					docName,
					data,
					docRefFn
				);
			},
			set: async (data) => {
				await setDocument(istore, docRefFn(docName), (d) => ({
					...d,
					...data,
				}));
			},
			query: async () => {
				return await queryDocument(istore, docRefFn(docName));
			},
		};
	};

export const collectionWithStore =
	(
		COLLECTIONS_REF: string,
		collRefFn: (collId: string) => string,
		istore: ItemStorage,
		genDocId: (id?: string) => string
	) =>
	<D extends Store.DocumentAction>(
		collName: string,
		documentAction: (name: string, docRefFn: (docId: string) => string) => D
	): Store.CollectionActions<LocalStorageStoreOption, D> => {
		const collRef = collRefFn(collName);
		const docRefFn = (docId: string) => `${collRef}/${docId}`;

		const queryDoc = async <T extends Store.DocumentData>(
			qo?: Store.SingleQueryFilter | undefined
		) => {
			const docsIds = await getCollectionDocs(istore, collRef);

			const { $id: qid, ...otherQ } = qo || {};
			if (qid !== undefined) {
				const locatedDocId = docsIds.find((id) => {
					if (typeof qid === "string") {
						return qid === id;
					}

					if (qid["$eq"] !== undefined) {
						return qid["$eq"] === id;
					}

					if (qid["$text"] !== undefined) {
						return id.includes(qid["$text"]);
					}

					return false;
				});

				if (locatedDocId !== undefined) {
					return await queryDocument<T>(
						istore,
						docRefFn(locatedDocId)
					);
				}
			}

			const dcs = await Promise.all(
				docsIds.map(
					(docId) =>
						new Promise<T | null>((resolve, reject) => {
							try {
								queryDocument<T>(istore, docRefFn(docId))
									.then((qd) => {
										resolve(
											qd !== null
												? { $id: docId, ...qd }
												: null
										);
									})
									.catch(reject);
							} catch (err) {
								reject(err);
							}
						})
				)
			);

			const locatedDoc = dcs.find((d) => {
				if (otherQ === undefined) {
					return true;
				}

				if (d === null) {
					return false;
				}

				return Object.keys(otherQ).every((k) => {
					const v = otherQ[k];

					if (typeof v === "string") {
						return v === d[k];
					}

					if (v["$eq"] !== undefined) {
						return v["$eq"] === d[k];
					}

					if (v["$text"] !== undefined) {
						return d[k].includes(v["$text"]);
					}

					return v === d[k];
				});
			});

			return locatedDoc !== undefined ? locatedDoc : null;
		};

		/**
		 * Querying multiple documents in a collection.
		 *
		 * CURRENTLY: Only matched by ids
		 * TODO: Make more flexible
		 * @param qo
		 * @returns
		 */
		const queryDocs = async <T extends Store.DocumentData>(
			qo: Store.QueryFilter | undefined
		): Promise<Array<{ $id: string } & T>> => {
			// Performs search  and load what can be loaded
			const docsIds = await getCollectionDocs(istore, collRef);
			let $docsToLoad: string[] = docsIds;

			const { $id: qid, ...otherQ } = qo || {};

			if (qid !== undefined) {
				// console.log("HERE QID:", { qid });

				// filter by id
				$docsToLoad = docsIds.filter((id) => {
					if (Array.isArray(qid)) {
						return qid.includes(id);
					}

					if (typeof qid === "string") {
						return qid === id;
					}

					if (qid["$eq"] !== undefined) {
						return qid["$eq"] === id;
					}

					if (qid["$text"] !== undefined) {
						return id.includes(qid["$text"]);
					}

					return true;
				});
			}

			// console.log("$docsToLoad:", { $docsToLoad, otherQ });

			const dcs = await Promise.all(
				$docsToLoad.map(
					(docId) =>
						new Promise<T | null>((resolve, reject) => {
							try {
								queryDocument<T>(istore, docRefFn(docId))
									.then((qd) => {
										resolve(
											qd !== null
												? { $id: docId, ...qd }
												: null
										);
									})
									.catch(reject);
							} catch (err) {
								reject(err);
							}
						})
				)
			);

			// console.log("%QUERY%", qo);
			// console.log("%%%", { dcs });

			return dcs.filter((d) => {
				if (otherQ === undefined) {
					return true;
				}

				if (d === null) {
					return false;
				}

				return Object.keys(otherQ).every((k) => {
					const v = otherQ[k];

					if (typeof v === "string") {
						return v === d[k];
					}

					if (v["$eq"] !== undefined) {
						return v["$eq"] === d[k];
					}

					if (v["$text"] !== undefined) {
						return d[k].includes(v["$text"]);
					}

					return v === d[k];
				});
			}) as Array<{ $id: string } & T>;
		};

		return {
			create: async (opt) => {
				const { createIfNotExists = true } = opt || {};

				if (createIfNotExists) {
					// console.log("CREATING");
					if (
						!(await collectionExists(istore, collRefFn(collName)))
					) {
						await createCollection(
							COLLECTIONS_REF,
							istore,
							collName,
							collRefFn
						);
					}
				} else {
					await createCollection(
						COLLECTIONS_REF,
						istore,
						collName,
						collRefFn
					);
				}
			},
			addDoc: async (docData) => {
				const { $id, ...other } = docData;
				console.log("Attempting to add a document:", docData);
				return await addDocumentToCollection(
					istore,
					collRef,
					genDocId($id),
					other,
					docRefFn
				);
			},
			// Add implement with a Multiset
			addMult: async (docsData) => {
				return (
					await Promise.all(
						docsData.map(
							(s) =>
								new Promise<string>((resolve, reject) => {
									const { $id, ...o } = s;
									addDocumentToCollection(
										istore,
										collRef,
										genDocId($id),
										o,
										docRefFn
									)
										.then(resolve)
										.catch(reject);
								})
						)
					)
				).map((s) => s);
			},
			queryDoc,
			queryDocs,
			doc: (name) => documentAction(name, docRefFn),
			docs: async () => {
				const $docs = await getCollectionDocs(istore, collRef);
				return $docs.map((docId) => ({
					docId,
					...documentAction(docId, docRefFn),
				}));
			},
			// search: async <T extends Store.DocumentData>(
			// 	query: Store.SearchFilter,
			// 	onResult?: Store.SearchCallback<T>
			// ) => {
			// 	// Performs search  and load what can be loaded
			// 	const $docsIds = getCollectionDocs(istore, collRef);
			// 	let $docsToLoad = $docsIds;
			// 	const $docs: T[] = [];

			// 	const { $id: qid, ...otherQ } = query || {};

			// 	if (qid !== undefined) {
			// 		// filter by id
			// 		$docsToLoad = $docsIds.filter((id) => {
			// 			if (qid["$eq"] !== undefined) {
			// 				return qid["$eq"] === id;
			// 			}

			// 			if (qid["$text"] !== undefined) {
			// 				return id.includes(qid["$text"]);
			// 			}
			// 		});
			// 	}

			// 	const d = await queryDocs<T>({ $id: $docsToLoad });
			// 	const fullDocs = d
			// 		.map((doc, ix, arr) => {
			// 			// make sure all the features are included
			// 			const docPasses = Object.entries(otherQ)
			// 				.map((s) => {
			// 					const [key, value] = s;

			// 					if (doc[key] === undefined) {
			// 						return false;
			// 					}

			// 					if (key === "$text") {
			// 						// text matching
			// 						return doc[key].includes(value.$text);
			// 					}

			// 					if (key === "$eq") {
			// 						// exact matching
			// 						return doc[key] === value.$eq;
			// 					}

			// 					return true;
			// 				})
			// 				.reduce((x, y) => x && y, true);

			// 			if (docPasses) {
			// 				$docs.push(doc as T);

			// 				if (onResult !== undefined) {
			// 					if (ix !== arr.length - 1) {
			// 						onResult($docs, false);
			// 					}
			// 				}
			// 				return doc;
			// 			}

			// 			return null;
			// 		})
			// 		.filter((d) => d !== null) as T[];

			// 	if (onResult !== undefined) onResult(fullDocs, true);
			// 	return fullDocs;
			// },
		};
	};
