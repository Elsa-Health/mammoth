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

// src/remote/mongo/client.ts
var client_exports = {};
__export(client_exports, {
  default: () => MongoClientStore
});
module.exports = __toCommonJS(client_exports);
var documentAction = (dbColl) => (docName) => {
  return {
    create: async (data) => {
      return await dbColl.insertOne(__spreadValues({ _id: docName }, data));
    },
    query: async () => await dbColl.findOne({ _id: docName }),
    set: async (data) => await dbColl.findOneAndUpdate({ _id: docName }, __spreadValues({}, data), { upsert: true }),
    delete: async () => await dbColl.findOneAndDelete({ _id: docName })
  };
};
var qfConv = (qf) => {
  return qf;
};
var collectionActions = (db) => (collName) => {
  const ref = () => db.collection(collName);
  const coll = ref();
  return {
    ref: ref(),
    create: async (opts = {}) => await db.createCollection(collName, opts),
    addDoc: async (docData) => {
      (await coll.insertOne(docData)).insertedId;
    },
    addMult: async (docData) => (await coll.insertMany(docData)).insertedIds,
    queryDocs: async (queryOptions) => {
      return await coll.find(qfConv(queryOptions));
    },
    queryDoc: async (queryOptions) => {
      return await coll.findOne(qfConv(queryOptions));
    },
    doc: documentAction(coll),
    docs: () => coll.find().map((d) => documentAction(coll)(d._id.toString()))
  };
};
function MongoClientStore(db) {
  return {
    collection: collectionActions(db),
    getCollections: async () => await db.listCollections().map((s) => s.name),
    collectionDocument: (collName) => {
      return documentAction(db.collection(collName));
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
