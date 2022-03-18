var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ASyncLTRStoreBuild: () => ASyncLTRStoreBuild,
  SyncLTRStoreBuild: () => SyncLTRStoreBuild
});
module.exports = __toCommonJS(src_exports);
var import_lodash = __toESM(require("lodash.omit"));
var import_lodash2 = __toESM(require("lodash.isequal"));
var collectionDocumentLTR = (mdf, rdf, sync) => (name) => {
  const md = mdf(name);
  const rd = rdf(name);
  return {
    create: async (data) => {
      await md.create(data);
      if (sync)
        await rd.create(data);
      else
        rd.create(data);
    },
    set: async (_data) => {
      const data = (0, import_lodash.default)(_data, ["$id"]);
      await md.set(data);
      if (sync)
        await rd.set(data);
      else
        rd.create(data);
    },
    query: async () => {
      const lq = await md.query();
      const rq = await rd.query();
      console.log("QUERY:", rq);
      if (rq === null) {
        rd.create(lq);
      } else {
        if (lq === null) {
          md.create(rq);
        } else {
          console.log({ lq, rq });
          if (!(0, import_lodash2.default)(lq, rq)) {
            rd.set(lq);
          }
        }
      }
      return await md.query();
    }
  };
};
var collectionLTR = (mc, rc, sync, convConfig) => (documentActionLTR) => {
  return {
    create: async (opt) => {
      await mc.create(opt);
      const run = async () => await rc.create(convConfig(opt));
      if (sync)
        await run();
      else
        run();
    },
    addDoc: async (docData) => {
      const d = await mc.addDoc(docData);
      const run = async () => await rc.addDoc(__spreadValues({ $id: d }, docData));
      if (sync)
        await run();
      else
        run();
      return d;
    },
    addMult: async (docsData) => {
      const ds = await mc.addMult(docsData);
      const run = async () => await rc.addMult(docsData.map((d, ix) => __spreadValues({ $id: ds[ix] }, d)));
      if (sync)
        await run();
      else
        run();
      return ds;
    },
    queryDoc: async (qo) => {
      const ld = await mc.queryDoc(qo);
      const rd = await rc.queryDoc(qo);
      console.log("STOREPAIR.queryDoc");
      if (ld === null) {
        if (rd !== null) {
          mc.addDoc(__spreadProps(__spreadValues({}, rd), { $id: rd.$id }));
        } else {
          return null;
        }
      } else {
        if (rd === null) {
          rc.addDoc(__spreadProps(__spreadValues({}, ld), { $id: ld.$id }));
        } else {
          console.log({ ld, rd });
          if (!(0, import_lodash2.default)(ld, rd)) {
            console.log("THEY DONT MATCH");
          } else {
            return ld;
          }
        }
      }
      if (!(0, import_lodash2.default)(ld, rd)) {
        if (ld !== null) {
          const _a = ld, { $id } = _a, lld = __objRest(_a, ["$id"]);
          if ($id !== void 0) {
            await rc.doc($id).set(lld);
          } else {
            console.error(ld);
            throw new Error("ID MISSING FROM");
          }
        } else {
          if (rd !== null) {
            const _b = rd, { $id } = _b, rrd = __objRest(_b, ["$id"]);
            if ($id !== void 0) {
              await mc.doc($id).set(rrd);
            } else {
              console.error(ld);
              throw new Error("ID MISSING FROM");
            }
          }
        }
      }
      return await mc.queryDoc(qo);
    },
    queryDocs: mc.queryDocs,
    doc: documentActionLTR,
    docs: async () => {
      const lds = await mc.docs();
      const ldsIds = lds.map((l) => l.docId);
      const rdsIds = (await rc.docs()).map((s) => s.docId);
      rdsIds.forEach((docId) => {
        if (!ldsIds.includes(docId)) {
          lds.push(__spreadValues({ docId }, documentActionLTR(docId)));
        }
      });
      const docsData = await mc.queryDocs({
        $id: ldsIds.filter((l) => !rdsIds.includes(l))
      });
      if (docsData.length > 0) {
        await rc.addMult(docsData);
      }
      console.log({ lds, rdsIds });
      return lds;
    }
  };
};
var LTRStoreConfig = (sync) => (local, remote, convConfig) => {
  return {
    collection: (name, documentAction) => {
      return collectionLTR(local.collection(name, local.collectionDocument(name)), remote.collection(name, remote.collectionDocument(name)), sync, convConfig)(documentAction);
    },
    collectionDocument: (collName) => (name) => collectionDocumentLTR(local.collectionDocument(collName), remote.collectionDocument(collName), sync)(name),
    getCollections: local.getCollections
  };
};
var SyncLTRStoreBuild = LTRStoreConfig(true);
var ASyncLTRStoreBuild = LTRStoreConfig(false);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ASyncLTRStoreBuild,
  SyncLTRStoreBuild
});
