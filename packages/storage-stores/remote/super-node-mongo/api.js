var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/remote/super-node-mongo/api.ts
var api_exports = {};
__export(api_exports, {
  collection: () => collection,
  collectionDocument: () => collectionDocument
});
module.exports = __toCommonJS(api_exports);
var qs = __toESM(require("query-string"));
var collectionDocument = (snAxios) => (collName) => (docName) => {
  const collectionRef = collName;
  const docId = docName;
  return {
    create: async (data) => {
      await snAxios.post(`/col/${collectionRef}/doc/${docId}/create`, {
        data
      });
    },
    query: async () => {
      const res = await snAxios.post(`/col/${collectionRef}/doc/${docId}/query`);
      console.log(`/col/${collectionRef}/doc/${docId}/query`);
      return res.data.data;
    },
    set: async (data) => {
      await snAxios.post(`/col/${collectionRef}/doc/${docId}/set`, {
        data
      });
    }
  };
};
var collection = (snAxios) => {
  return (name, documentAction) => {
    return {
      create: async (opts = {}) => {
        const _a = opts, { createOpts } = _a, rest = __objRest(_a, ["createOpts"]);
        await snAxios.post(`/col/${name}/create?${qs.stringify(rest)}`, {
          opt: createOpts
        });
      },
      addDoc: async (docData) => {
        const res = await snAxios.post(`/col/${name}/add`, {
          data: docData
        });
        return res.data.$id;
      },
      addMult: async (docData) => {
        const res = await snAxios.post(`/col/${name}/add-multiple`, {
          data: docData
        });
        return res.data.$id;
      },
      queryDoc: async (queryOptions) => {
        const res = await snAxios.post(`/col/${name}/query?${qs.stringify(queryOptions || {})}`);
        return res.data.data;
      },
      queryDocs: async (queryOptions) => {
        const res = await snAxios.post(`/col/${name}/query-multiple?${qs.stringify(queryOptions || {})}`);
        return res.data.data;
      },
      doc: documentAction,
      docs: async () => {
        const res = await snAxios.post(`/col/${name}/docs`);
        return res.data.$ids.map((docName) => __spreadValues({
          docId: docName
        }, documentAction(docName)));
      }
    };
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collection,
  collectionDocument
});
