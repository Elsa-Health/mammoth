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
exports.collection = exports.collectionDocument = void 0;
const qs = require("query-string");
const collectionDocument = (snAxios) => (collName) => (docName, docRefFn) => {
    const collectionRef = collName;
    const docId = docName;
    return {
        create: (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield snAxios.post(`/col/${collectionRef}/doc/${docId}/create`, {
                data,
            });
            // return res.data.$id as string;
        }),
        query: () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield snAxios.post(`/col/${collectionRef}/doc/${docId}/query`);
            // console.log(`/col/${collectionRef}/doc/${docId}/query`);
            // Current return $id
            return res.data.data;
        }),
        set: (data) => __awaiter(void 0, void 0, void 0, function* () {
            // const { $id, ...data } = _data;
            yield snAxios.post(`/col/${collectionRef}/doc/${docId}/set`, {
                data,
            });
        }),
    };
};
exports.collectionDocument = collectionDocument;
const collection = (snAxios) => {
    return (name, documentAction) => {
        return {
            create: (opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
                const { createOpts } = opts, rest = __rest(opts, ["createOpts"]);
                yield snAxios.post(`/col/${name}/create?${qs.stringify(rest)}`, {
                    opt: createOpts,
                });
            }),
            addDoc: (docData) => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield snAxios.post(`/col/${name}/add`, {
                    data: docData,
                });
                return res.data.$id;
            }),
            addMult: (docData) => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield snAxios.post(`/col/${name}/add-multiple`, {
                    data: docData,
                });
                return res.data.$id;
            }),
            queryDoc: (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield snAxios.post(`/col/${name}/query?${qs.stringify(queryOptions || {})}`);
                return res.data.data;
            }),
            queryDocs: (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield snAxios.post(`/col/${name}/query-multiple?${qs.stringify(queryOptions || {})}`);
                return res.data.data;
            }),
            doc: documentAction,
            docs: () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield snAxios.post(`/col/${name}/docs`);
                return res.data.$ids.map((docName) => (Object.assign({ docId: docName }, documentAction(docName))));
            }),
        };
    };
};
exports.collection = collection;
//# sourceMappingURL=api.js.map