var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/local/itemStorage/index.ts
var itemStorage_exports = {};
__export(itemStorage_exports, {
  default: () => itemStorage_default
});
module.exports = __toCommonJS(itemStorage_exports);

// src/local/itemStorage/api.ts
async function getDocument(istore, documentRef) {
  const val = await istore.getItem(documentRef);
  if (val === null) {
    throw new Error(`Document w/ REFERENCE "${documentRef}", doesn't exist`);
  }
  const obj = JSON.parse(val);
  return obj.$data;
}
async function queryDocument(istore, documentRef) {
  try {
    return await getDocument(istore, documentRef);
  } catch (err) {
    return null;
  }
}
async function getCollection(istore, collectionRef) {
  const val = await istore.getItem(collectionRef);
  if (val === null) {
    throw new Error(`Collection w/ REFERENCE "${collectionRef}", doesn't exist`);
  }
  const obj = JSON.parse(val);
  return { $docs: (obj == null ? void 0 : obj.$docs) || [] };
}
async function getCollectionDocs(istore, collectionRef) {
  return (await getCollection(istore, collectionRef)).$docs;
}
async function setCollectionDocs(istore, collectionRef, pv) {
  const docs = await getCollectionDocs(istore, collectionRef);
  await istore.setItem(collectionRef, JSON.stringify({ $docs: pv(docs) }));
}
async function createDocument(istore, documentRef, data) {
  const docObjStr = await queryDocument(istore, documentRef);
  console.log(docObjStr);
  if (docObjStr !== null) {
    throw new Error(`Document with REFERENCE "${documentRef}", already exists`);
  }
  await istore.setItem(documentRef, JSON.stringify({ $data: data }));
}
async function setDocument(istore, documentRef, dataFn) {
  const prevData = await getDocument(istore, documentRef);
  istore.setItem(documentRef, JSON.stringify({ $data: dataFn(prevData) }));
}
async function getCollections(COLLECTIONS_REF, istore) {
  const colls = await istore.getItem(COLLECTIONS_REF);
  return colls === null ? [] : JSON.parse(colls);
}
async function _setCollections(COLLECTIONS_REF, istore, pv) {
  istore.setItem(COLLECTIONS_REF, JSON.stringify(pv(await getCollections(COLLECTIONS_REF, istore))));
}
async function createCollection(COLLECTIONS_REF, istore, collectionID, collRefFn) {
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
async function collectionExists(istore, collectionRef) {
  const exists = await istore.getItem(collectionRef) !== null;
  return exists;
}
async function addDocumentToCollection(istore, collectionRef, docID, data, refFn) {
  await setCollectionDocs(istore, collectionRef, (docsIds) => [
    ...docsIds,
    docID
  ]);
  await createDocument(istore, refFn(docID), data);
  return docID;
}
var collectionDocumentWithStore = (istore, collRefFn) => (collId) => (docName, docRefFn) => {
  return {
    create: async (data) => {
      addDocumentToCollection(istore, collRefFn(collId), docName, data, docRefFn);
    },
    set: async (data) => {
      await setDocument(istore, docRefFn(docName), (d) => __spreadValues(__spreadValues({}, d), data));
    },
    query: async () => {
      return await queryDocument(istore, docRefFn(docName));
    }
  };
};
var collectionWithStore = (COLLECTIONS_REF, collRefFn, istore, genDocId) => (collName, documentAction) => {
  const collRef = collRefFn(collName);
  const docRefFn = (docId) => `${collRef}/${docId}`;
  const queryDoc = async (qo) => {
    const docsIds = await getCollectionDocs(istore, collRef);
    const _a = qo || {}, { $id: qid } = _a, otherQ = __objRest(_a, ["$id"]);
    if (qid !== void 0) {
      const locatedDocId = docsIds.find((id) => {
        if (typeof qid === "string") {
          return qid === id;
        }
        if (qid["$eq"] !== void 0) {
          return qid["$eq"] === id;
        }
        if (qid["$text"] !== void 0) {
          return id.includes(qid["$text"]);
        }
        return false;
      });
      if (locatedDocId !== void 0) {
        return await queryDocument(istore, docRefFn(locatedDocId));
      }
    }
    const dcs = await Promise.all(docsIds.map((docId) => new Promise((resolve, reject) => {
      try {
        queryDocument(istore, docRefFn(docId)).then((qd) => {
          resolve(qd !== null ? __spreadValues({ $id: docId }, qd) : null);
        }).catch(reject);
      } catch (err) {
        reject(err);
      }
    })));
    const locatedDoc = dcs.find((d) => {
      if (otherQ === void 0) {
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
        if (v["$eq"] !== void 0) {
          return v["$eq"] === d[k];
        }
        if (v["$text"] !== void 0) {
          return d[k].includes(v["$text"]);
        }
        return v === d[k];
      });
    });
    return locatedDoc !== void 0 ? locatedDoc : null;
  };
  const queryDocs = async (qo) => {
    const docsIds = await getCollectionDocs(istore, collRef);
    let $docsToLoad = docsIds;
    const _a = qo || {}, { $id: qid } = _a, otherQ = __objRest(_a, ["$id"]);
    if (qid !== void 0) {
      $docsToLoad = docsIds.filter((id) => {
        if (Array.isArray(qid)) {
          return qid.includes(id);
        }
        if (typeof qid === "string") {
          return qid === id;
        }
        if (qid["$eq"] !== void 0) {
          return qid["$eq"] === id;
        }
        if (qid["$text"] !== void 0) {
          return id.includes(qid["$text"]);
        }
        return true;
      });
    }
    const dcs = await Promise.all($docsToLoad.map((docId) => new Promise((resolve, reject) => {
      try {
        queryDocument(istore, docRefFn(docId)).then((qd) => {
          resolve(qd !== null ? __spreadValues({ $id: docId }, qd) : null);
        }).catch(reject);
      } catch (err) {
        reject(err);
      }
    })));
    return dcs.filter((d) => {
      if (otherQ === void 0) {
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
        if (v["$eq"] !== void 0) {
          return v["$eq"] === d[k];
        }
        if (v["$text"] !== void 0) {
          return d[k].includes(v["$text"]);
        }
        return v === d[k];
      });
    });
  };
  return {
    create: async (opt) => {
      const { createIfNotExists = true } = opt || {};
      if (createIfNotExists) {
        if (!await collectionExists(istore, collRefFn(collName))) {
          await createCollection(COLLECTIONS_REF, istore, collName, collRefFn);
        }
      } else {
        await createCollection(COLLECTIONS_REF, istore, collName, collRefFn);
      }
    },
    addDoc: async (docData) => {
      const _a = docData, { $id } = _a, other = __objRest(_a, ["$id"]);
      console.log("Attempting to add a document:", docData);
      return await addDocumentToCollection(istore, collRef, genDocId($id), other, docRefFn);
    },
    addMult: async (docsData) => {
      return await Promise.all(docsData.map((s) => new Promise((resolve, reject) => {
        const _a = s, { $id } = _a, o = __objRest(_a, ["$id"]);
        addDocumentToCollection(istore, collRef, genDocId($id), o, docRefFn).then(resolve).catch(reject);
      })));
    },
    queryDoc,
    queryDocs,
    doc: (name) => documentAction(name, docRefFn),
    docs: async () => {
      const $docs = await getCollectionDocs(istore, collRef);
      return $docs.map((docId) => __spreadValues({
        docId
      }, documentAction(docId, docRefFn)));
    }
  };
};

// src/local/itemStorage/index.ts
var ItemStorage = (name, storage, genDocRef) => {
  const COLLECTIONS_REF = `${name}@$$collections`;
  const collRefFn = (collId) => `${name}@/${collId}`;
  return {
    collection: collectionWithStore(COLLECTIONS_REF, collRefFn, storage, genDocRef),
    getCollections: async () => await getCollections(COLLECTIONS_REF, storage),
    collectionDocument: collectionDocumentWithStore(storage, collRefFn)
  };
};
var itemStorage_default = ItemStorage;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
