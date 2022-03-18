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

// src/local/react-native-mmkv/api.ts
var api_exports = {};
__export(api_exports, {
  collectionDocumentWithStore: () => collectionDocumentWithStore,
  collectionWithStore: () => collectionWithStore,
  getCollections: () => getCollections
});
module.exports = __toCommonJS(api_exports);
function getDocument(mmkv, documentRef) {
  const val = mmkv.getString(documentRef);
  if (val === void 0) {
    throw new Error(`Document w/ REFERENCE "${documentRef}", doesn't exist`);
  }
  const obj = JSON.parse(val);
  return obj.$data;
}
function queryDocument(mmkv, documentRef) {
  try {
    return getDocument(mmkv, documentRef);
  } catch (err) {
    return null;
  }
}
function getCollection(mmkv, collectionRef) {
  const val = mmkv.getString(collectionRef);
  if (val === void 0) {
    throw new Error(`Collection w/ REFERENCE "${collectionRef}", doesn't exist`);
  }
  const obj = JSON.parse(val);
  return { $docs: (obj == null ? void 0 : obj.$docs) || [] };
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
  mmkv.set(documentRef, JSON.stringify({ $data: dataFn(prevData) }));
}
var COLLECTIONS_REF = "$$collections";
function getCollections(mmkv) {
  const colls = mmkv.getString(COLLECTIONS_REF);
  return colls === void 0 ? [] : JSON.parse(colls);
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
  return mmkv.getString(collectionRef) !== void 0;
}
function addDocumentToCollection(mmkv, collectionRef, docID, data, refFn) {
  console.log({ collectionRef, docID, data });
  setCollectionDocs(mmkv, collectionRef, (docsIds) => [...docsIds, docID]);
  createDocument(mmkv, refFn(docID), data);
  return docID;
}
var collectionDocumentWithStore = (mmkv) => (collName) => (docName) => {
  const docRefFn = (docId) => `${collName}/${docId}`;
  return {
    create: async (data) => {
      addDocumentToCollection(mmkv, collName, docName, data, docRefFn);
    },
    set: async (data) => {
      setDocument(mmkv, docRefFn(docName), (d) => __spreadValues(__spreadValues({}, d), data));
    },
    query: async () => {
      return queryDocument(mmkv, docRefFn(docName));
    }
  };
};
var collectionWithStore = (mmkv, genDocId) => (collName, documentAction) => {
  const docRefFn = (docId) => `${collName}/${docId}`;
  const collRefFn = (collId) => collId;
  const collRef = collRefFn(collName);
  const queryDocs = async (qo) => {
    const docsIds = getCollectionDocs(mmkv, collRef);
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
    console.log({ $docsToLoad, otherQ });
    return $docsToLoad.map((docId) => {
      const qd = queryDocument(mmkv, docRefFn(docId));
      return qd !== null ? __spreadValues({ $id: docId }, qd) : null;
    }).filter((d) => {
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
      const { checkIfExists = true } = opt || {};
      if (checkIfExists) {
        if (!collectionExists(mmkv, collRefFn(collName))) {
          createCollection(mmkv, collName, collRefFn);
        }
      } else {
        createCollection(mmkv, collName, collRefFn);
      }
    },
    addDoc: async (docData) => {
      const _a = docData, { $id } = _a, other = __objRest(_a, ["$id"]);
      return addDocumentToCollection(mmkv, collRef, genDocId($id), other, docRefFn);
    },
    addMult: async (docsData) => {
      return docsData.map((s) => {
        const _a = s, { $id } = _a, o = __objRest(_a, ["$id"]);
        return addDocumentToCollection(mmkv, collRef, genDocId($id), o, docRefFn);
      });
    },
    queryDoc: async () => ({}),
    queryDocs,
    doc: documentAction,
    docs: async () => {
      const $docs = getCollectionDocs(mmkv, collRef);
      return $docs.map((docId) => __spreadValues({
        docId
      }, documentAction(docId)));
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectionDocumentWithStore,
  collectionWithStore,
  getCollections
});
