var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/local/localStorage/index.ts
var localStorage_exports = {};
__export(localStorage_exports, {
  default: () => localStorage_default
});
module.exports = __toCommonJS(localStorage_exports);

// src/local/localStorage/api.ts
function getCollections() {
  const collStr = localStorage.getItem("__collections");
  return collStr === null ? [] : (() => {
    const s = JSON.parse(collStr);
    return Array.isArray(s) ? s : [s];
  })();
}
function _setCollections(pv) {
  const newColls = pv(getCollections());
  localStorage.setItem("__collections", JSON.stringify(newColls));
}
function collectionExists(collectionRef) {
  const collObjStr = localStorage.getItem(collectionRef);
  return collObjStr !== null;
}
function queryCollection(collectionRef) {
  const collObjStr = localStorage.getItem(collectionRef);
  const collObj = collObjStr === null ? null : JSON.parse(collObjStr);
  if (collObj === null) {
    return null;
  }
  return {
    docsRefs: collObj.__docs
  };
}
function queryDocument(documentRef) {
  const docObjStr = localStorage.getItem(documentRef);
  const docObj = docObjStr === null ? null : JSON.parse(docObjStr);
  if (docObj === null) {
    return null;
  }
  return {
    data: docObj.__data
  };
}
function createDocument(documentRef, data) {
  const docObjStr = localStorage.getItem(documentRef);
  if (docObjStr !== null) {
    throw new Error(`Document with REFERENCE "${documentRef}", already exists`);
  }
  localStorage.setItem(documentRef, JSON.stringify({ __data: data }));
}
function setDocument(documentRef, pv) {
  const obj = queryDocument(documentRef);
  if (obj === null) {
    throw new Error(`Document w/ REFERENCE "${documentRef}", doesn't exist`);
  }
  const { data: __data } = pv(obj);
  localStorage.setItem(documentRef, JSON.stringify({ __data }));
}
function setCollectionDocs(pv, collectionRef) {
  const obj = queryCollection(collectionRef);
  if (obj === null) {
    throw new Error(`Collection with REFERENCE "${collectionRef}", doesn't exist`);
  }
  const { docsRefs: oldDocRefs } = obj;
  localStorage.setItem(collectionRef, JSON.stringify({ __docs: pv(oldDocRefs) }));
}
function createCollection(collectionRef) {
  const docObjStr = localStorage.getItem(collectionRef);
  if (docObjStr !== null) {
    throw new Error(`Collection with REFERENCE "${collectionRef}", already exists`);
  }
  _setCollections((f) => {
    if (!f.includes(collectionRef)) {
      return [...f, collectionRef];
    }
    return f;
  });
  localStorage.setItem(collectionRef, JSON.stringify({ __docs: [] }));
}
var addDocumentToCollection = (collectionRef, data) => {
  const { $id, normalizedData } = data;
  console.log(normalizedData);
  const docId = $id;
  const docRef = `${collectionRef}/${docId}`;
  setCollectionDocs((docsIds) => [...docsIds, docId], collectionRef);
  createDocument(docRef, normalizedData);
  return docId;
};
var collectionDocument = (genDocRef) => (collName) => (docName) => {
  const collectionRef = collName;
  const docId = genDocRef(docName);
  const docRef = `${collectionRef}/${docId}`;
  return {
    create: async (data) => {
      addDocumentToCollection(collectionRef, __spreadProps(__spreadValues({}, data), {
        $id: docId
      }));
    },
    set: async (data) => {
      setDocument(docRef, (d) => __spreadValues(__spreadValues({}, d), data));
    },
    query: async () => {
      const obj = queryDocument(docRef);
      return obj === null ? null : obj.data;
    }
  };
};
var collection = (genDocRef) => (name, documentAction) => {
  const collectionRef = name;
  const docRefFn = (docId) => `${collectionRef}/${genDocRef(docId)}`;
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
      const _a = docData, { $id } = _a, other = __objRest(_a, ["$id"]);
      return addDocumentToCollection(collectionRef, __spreadValues({
        $id: genDocRef($id)
      }, other));
    },
    addMult: async (docsData) => {
      return docsData.map((s) => {
        const _a = s, { $id } = _a, o = __objRest(_a, ["$id"]);
        return addDocumentToCollection(collectionRef, __spreadValues({
          $id: genDocRef($id)
        }, o));
      });
    },
    queryDoc: async (queryOptions) => {
      const { docsRefs } = queryCollection(collectionRef) || {
        docsRefs: []
      };
      if (docsRefs.length > 0) {
        if (queryOptions !== void 0) {
          const _a = queryOptions, { $id } = _a, other = __objRest(_a, ["$id"]);
          if (Array.isArray($id)) {
            throw new Error("You are querying for $ids. You shouldn't use arrays");
          } else {
            if ($id !== void 0) {
              if (Array.isArray($id)) {
                throw new Error("$id are Array");
              }
              const qd = queryDocument(docRefFn($id));
              return qd !== null ? qd.data : null;
            } else {
              const searchedDoc = docsRefs.map((docId) => {
                const qd = queryDocument(docRefFn(docId));
                return qd !== null ? qd.data : null;
              }).filter((d) => d !== null).find((s) => Object.entries(other).map((x) => {
                const [key, val] = x;
                if (s !== null) {
                  return s[key] === val;
                }
                return false;
              }).reduce((x, y) => Boolean(x) || Boolean(y), true));
              return searchedDoc !== void 0 ? searchedDoc : null;
            }
          }
        } else {
          const qd = queryDocument(docRefFn(docsRefs[0]));
          return qd !== null ? qd.data : null;
        }
      }
      return null;
    },
    queryDocs: async (qOpts) => {
      const { docsRefs } = queryCollection(collectionRef) || {
        docsRefs: []
      };
      if (docsRefs.length > 0) {
        if (qOpts !== void 0) {
          const _a = qOpts, { $id } = _a, other = __objRest(_a, ["$id"]);
          const $ids = !Array.isArray($id) ? $id !== void 0 ? [$id] : void 0 : $id;
          const content = docsRefs.filter((id) => $ids === void 0 ? true : $ids.includes(id)).map((id) => {
            const qd = queryDocument(docRefFn(id));
            return qd !== null ? __spreadValues({ $id: id }, qd.data) : null;
          }).filter((s) => s !== null).filter((s) => Object.entries(other).map((x) => {
            const [key, val] = x;
            if (s !== null) {
              return s[key] === val;
            }
            return false;
          }).reduce((x, y) => Boolean(x) || Boolean(y), true));
          return content;
        }
        return docsRefs.map((docRef) => queryDocument(docRef)).filter((s) => s !== null).map((s) => s.data);
      }
      return [];
    },
    doc: documentAction,
    docs: async () => {
      const docsRefs = (queryCollection(collectionRef) || { docsRefs: [] }).docsRefs || [];
      return docsRefs.map((docRef) => __spreadValues({
        docId: docRef
      }, documentAction(docRef)));
    }
  };
};

// src/local/localStorage/index.ts
var localStorageBuildConfig = (genDocRef) => ({
  collection: collection(genDocRef),
  getCollections: async () => getCollections(),
  collectionDocument: collectionDocument(genDocRef)
});
var localStorage_default = localStorageBuildConfig;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
