"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionWithStore = exports.collectionDocumentWithStore = exports.getCollections = void 0;
function getDocument(istore, documentRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = yield istore.getItem(documentRef);
        if (val === null) {
            throw new Error(`Document w/ REFERENCE "${documentRef}", doesn't exist`);
        }
        const obj = JSON.parse(val);
        return obj.$data;
    });
}
function queryDocument(istore, documentRef) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield getDocument(istore, documentRef);
        }
        catch (err) {
            return null;
        }
    });
}
function getCollection(istore, collectionRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = yield istore.getItem(collectionRef);
        if (val === null) {
            throw new Error(`Collection w/ REFERENCE "${collectionRef}", doesn't exist`);
        }
        const obj = JSON.parse(val); // { $docs: [] }
        return { $docs: ((obj === null || obj === void 0 ? void 0 : obj.$docs) || []) };
    });
}
function getCollectionDocs(istore, collectionRef) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield getCollection(istore, collectionRef)).$docs;
    });
}
function setCollectionDocs(istore, collectionRef, pv) {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield getCollectionDocs(istore, collectionRef);
        yield istore.setItem(collectionRef, JSON.stringify({ $docs: pv(docs) }));
    });
}
function createDocument(istore, documentRef, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const docObjStr = yield queryDocument(istore, documentRef);
        console.log(docObjStr);
        if (docObjStr !== null) {
            throw new Error(`Document with REFERENCE "${documentRef}", already exists`);
        }
        yield istore.setItem(documentRef, JSON.stringify({ $data: data }));
    });
}
function setDocument(istore, documentRef, dataFn) {
    return __awaiter(this, void 0, void 0, function* () {
        const prevData = yield getDocument(istore, documentRef);
        // Set a document
        istore.setItem(documentRef, JSON.stringify({ $data: dataFn(prevData) }));
    });
}
function getCollections(COLLECTIONS_REF, istore) {
    return __awaiter(this, void 0, void 0, function* () {
        const colls = yield istore.getItem(COLLECTIONS_REF);
        return colls === null ? [] : JSON.parse(colls);
    });
}
exports.getCollections = getCollections;
function _setCollections(COLLECTIONS_REF, istore, pv) {
    return __awaiter(this, void 0, void 0, function* () {
        istore.setItem(COLLECTIONS_REF, JSON.stringify(pv(yield getCollections(COLLECTIONS_REF, istore))));
    });
}
function createCollection(COLLECTIONS_REF, istore, collectionID, collRefFn) {
    return __awaiter(this, void 0, void 0, function* () {
        const ref = collRefFn(collectionID);
        if (yield collectionExists(istore, ref)) {
            throw new Error(`Collection with ID "${collectionID}", already exists`);
        }
        _setCollections(COLLECTIONS_REF, istore, (f) => {
            if (!f.includes(collectionID)) {
                return [...f, collectionID];
            }
            return f;
        });
        istore.setItem(ref, JSON.stringify({ $docs: [] }));
    });
}
function collectionExists(istore, collectionRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = (yield istore.getItem(collectionRef)) !== null;
        // console.log(`Does ${collectionRef} exist?:`, exists);
        return exists;
    });
}
function addDocumentToCollection(istore, collectionRef, docID, data, refFn) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(
        // 	"Setting the docId",
        // 	docID,
        // 	" to collectionRef:",
        // 	collectionRef
        // );
        yield setCollectionDocs(istore, collectionRef, (docsIds) => [
            ...docsIds,
            docID,
        ]);
        // console.log("Creating document: ", refFn(docID));
        yield createDocument(istore, refFn(docID), data);
        // console.log("ADDED!:", docID);/
        return docID;
    });
}
const collectionDocumentWithStore = (istore, collRefFn) => (collId) => (docName, docRefFn) => {
    return {
        create: (data) => __awaiter(void 0, void 0, void 0, function* () {
            addDocumentToCollection(istore, collRefFn(collId), docName, data, docRefFn);
        }),
        set: (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield setDocument(istore, docRefFn(docName), (d) => (Object.assign(Object.assign({}, d), data)));
        }),
        query: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield queryDocument(istore, docRefFn(docName));
        }),
    };
};
exports.collectionDocumentWithStore = collectionDocumentWithStore;
const collectionWithStore = (COLLECTIONS_REF, collRefFn, istore, genDocId) => (collName, documentAction) => {
    const collRef = collRefFn(collName);
    const docRefFn = (docId) => `${collRef}/${docId}`;
    const queryDoc = (qo) => __awaiter(void 0, void 0, void 0, function* () {
        const docsIds = yield getCollectionDocs(istore, collRef);
        const _a = qo || {}, { $id: qid } = _a, otherQ = __rest(_a, ["$id"]);
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
                return yield queryDocument(istore, docRefFn(locatedDocId));
            }
        }
        const dcs = yield Promise.all(docsIds.map((docId) => new Promise((resolve, reject) => {
            try {
                queryDocument(istore, docRefFn(docId))
                    .then((qd) => {
                    resolve(qd !== null
                        ? Object.assign({ $id: docId }, qd) : null);
                })
                    .catch(reject);
            }
            catch (err) {
                reject(err);
            }
        })));
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
    });
    /**
     * Querying multiple documents in a collection.
     *
     * CURRENTLY: Only matched by ids
     * TODO: Make more flexible
     * @param qo
     * @returns
     */
    const queryDocs = (qo) => __awaiter(void 0, void 0, void 0, function* () {
        // Performs search  and load what can be loaded
        const docsIds = yield getCollectionDocs(istore, collRef);
        let $docsToLoad = docsIds;
        const _b = qo || {}, { $id: qid } = _b, otherQ = __rest(_b, ["$id"]);
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
        // console.log({ $docsToLoad, otherQ });
        const dcs = yield Promise.all($docsToLoad.map((docId) => new Promise((resolve, reject) => {
            try {
                queryDocument(istore, docRefFn(docId))
                    .then((qd) => {
                    resolve(qd !== null
                        ? Object.assign({ $id: docId }, qd) : null);
                })
                    .catch(reject);
            }
            catch (err) {
                reject(err);
            }
        })));
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
        });
    });
    return {
        create: (opt) => __awaiter(void 0, void 0, void 0, function* () {
            const { createIfNotExists = true } = opt || {};
            if (createIfNotExists) {
                // console.log("CREATING");
                if (!(yield collectionExists(istore, collRefFn(collName)))) {
                    yield createCollection(COLLECTIONS_REF, istore, collName, collRefFn);
                }
            }
            else {
                yield createCollection(COLLECTIONS_REF, istore, collName, collRefFn);
            }
        }),
        addDoc: (docData) => __awaiter(void 0, void 0, void 0, function* () {
            const { $id } = docData, other = __rest(docData, ["$id"]);
            console.log("Attempting to add a document:", docData);
            return yield addDocumentToCollection(istore, collRef, genDocId($id), other, docRefFn);
        }),
        // Add implement with a Multiset
        addMult: (docsData) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Promise.all(docsData.map((s) => new Promise((resolve, reject) => {
                const { $id } = s, o = __rest(s, ["$id"]);
                addDocumentToCollection(istore, collRef, genDocId($id), o, docRefFn)
                    .then(resolve)
                    .catch(reject);
            })));
        }),
        queryDoc,
        queryDocs,
        doc: (name) => documentAction(name, docRefFn),
        docs: () => __awaiter(void 0, void 0, void 0, function* () {
            const $docs = yield getCollectionDocs(istore, collRef);
            return $docs.map((docId) => (Object.assign({ docId }, documentAction(docId, docRefFn))));
        }),
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
exports.collectionWithStore = collectionWithStore;
//# sourceMappingURL=api.js.map