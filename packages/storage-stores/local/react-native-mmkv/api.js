function getDocument(mmkv, documentRef) {
    const val = mmkv.getString(documentRef);
    if (val === undefined) {
        throw new Error(`Document w/ REFERENCE "${documentRef}", doesn't exist`);
    }
    const obj = JSON.parse(val);
    return obj.$data;
}
function queryDocument(mmkv, documentRef) {
    try {
        return getDocument(mmkv, documentRef);
    }
    catch (err) {
        return null;
    }
}
function getCollection(mmkv, collectionRef) {
    const val = mmkv.getString(collectionRef);
    if (val === undefined) {
        throw new Error(`Collection w/ REFERENCE "${collectionRef}", doesn't exist`);
    }
    const obj = JSON.parse(val); // { $docs: [] }
    return { $docs: obj?.$docs || [] };
}
function getCollectionDocs(mmkv, collectionRef) {
    return getCollection(mmkv, collectionRef).$docs;
}
function setCollectionDocs(mmkv, collectionRef, pv) {
    const docs = getCollectionDocs(mmkv, collectionRef);
    mmkv.set(collectionRef, JSON.stringify({ $docs: pv(docs) }));
}
function createDocument(mmkv, documentRef, data) {
    const docObjStr = queryDocument(mmkv, documentRef);
    if (docObjStr !== null) {
        throw new Error(`Document with REFERENCE "${documentRef}", already exists`);
    }
    mmkv.set(documentRef, JSON.stringify({ $data: data }));
}
function setDocument(mmkv, documentRef, dataFn) {
    const prevData = getDocument(mmkv, documentRef);
    // Set a document
    mmkv.set(documentRef, JSON.stringify({ $data: dataFn(prevData) }));
}
const COLLECTIONS_REF = "$$collections";
export function getCollections(mmkv) {
    const colls = mmkv.getString(COLLECTIONS_REF);
    return colls === undefined ? [] : JSON.parse(colls);
}
function _setCollections(mmkv, pv) {
    mmkv.set(COLLECTIONS_REF, JSON.stringify(pv(getCollections(mmkv))));
}
function createCollection(mmkv, collectionID, collRefFn) {
    const ref = collRefFn(collectionID);
    if (collectionExists(mmkv, ref)) {
        throw new Error(`Collection with ID "${collectionID}", already exists`);
    }
    _setCollections(mmkv, (f) => {
        if (!f.includes(collectionID)) {
            return [...f, collectionID];
        }
        return f;
    });
    mmkv.set(ref, JSON.stringify({ $docs: [] }));
}
function collectionExists(mmkv, collectionRef) {
    return mmkv.getString(collectionRef) !== undefined;
}
function addDocumentToCollection(mmkv, collectionRef, docID, data, refFn) {
    console.log({ collectionRef, docID, data });
    setCollectionDocs(mmkv, collectionRef, (docsIds) => [...docsIds, docID]);
    createDocument(mmkv, refFn(docID), data);
    return docID;
}
export const collectionDocumentWithStore = (mmkv) => (collName) => (docName) => {
    const docRefFn = (docId) => `${collName}/${docId}`;
    return {
        create: async (data) => {
            addDocumentToCollection(mmkv, collName, docName, data, docRefFn);
        },
        set: async (data) => {
            setDocument(mmkv, docRefFn(docName), (d) => ({
                ...d,
                ...data,
            }));
        },
        query: async () => {
            return queryDocument(mmkv, docRefFn(docName));
        },
    };
};
export const collectionWithStore = (mmkv, genDocId) => (collName, documentAction) => {
    const docRefFn = (docId) => `${collName}/${docId}`;
    const collRefFn = (collId) => collId;
    const collRef = collRefFn(collName);
    /**
     * Querying multiple documents in a collection.
     *
     * CURRENTLY: Only matched by ids
     * TODO: Make more flexible
     * @param qo
     * @returns
     */
    const queryDocs = async (qo) => {
        // Performs search  and load what can be loaded
        const docsIds = getCollectionDocs(mmkv, collRef);
        let $docsToLoad = docsIds;
        const { $id: qid, ...otherQ } = qo || {};
        if (qid !== undefined) {
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
        console.log({ $docsToLoad, otherQ });
        return $docsToLoad
            .map((docId) => {
            const qd = queryDocument(mmkv, docRefFn(docId));
            return qd !== null ? { $id: docId, ...qd } : null;
        })
            .filter((d) => {
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
    };
    return {
        create: async (opt) => {
            const { checkIfExists = true } = opt || {};
            if (checkIfExists) {
                if (!collectionExists(mmkv, collRefFn(collName))) {
                    createCollection(mmkv, collName, collRefFn);
                }
            }
            else {
                createCollection(mmkv, collName, collRefFn);
            }
        },
        addDoc: async (docData) => {
            const { $id, ...other } = docData;
            return addDocumentToCollection(mmkv, collRef, genDocId($id), other, docRefFn);
        },
        addMult: async (docsData) => {
            return docsData.map((s) => {
                const { $id, ...o } = s;
                return addDocumentToCollection(mmkv, collRef, genDocId($id), o, docRefFn);
            });
        },
        queryDoc: async () => ({}),
        queryDocs,
        doc: documentAction,
        docs: async () => {
            const $docs = getCollectionDocs(mmkv, collRef);
            return $docs.map((docId) => ({
                docId,
                ...documentAction(docId),
            }));
        },
        // search: async <T extends Store.DocumentData>(
        // 	query: Store.SearchFilter,
        // 	onResult?: Store.SearchCallback<T>
        // ) => {
        // 	// Performs search  and load what can be loaded
        // 	const $docsIds = getCollectionDocs(mmkv, collRef);
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
        // 	// @ts-ignore
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
