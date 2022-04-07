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
Object.defineProperty(exports, "__esModule", { value: true });
const documentAction = (dbColl) => (docName) => {
    return {
        create: (data) => __awaiter(void 0, void 0, void 0, function* () {
            // @ts-ignore
            return yield dbColl.insertOne(Object.assign({ _id: docName }, data));
        }),
        query: () => __awaiter(void 0, void 0, void 0, function* () { return yield dbColl.findOne({ _id: docName }); }),
        set: (data) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dbColl.findOneAndUpdate({ _id: docName }, Object.assign({}, data), { upsert: true });
        }),
        delete: () => __awaiter(void 0, void 0, void 0, function* () { return yield dbColl.findOneAndDelete({ _id: docName }); }),
    };
};
/**
 * Converts query filter from one form to another
 * @param qf
 * @returns
 */
const qfConv = (qf) => {
    return qf;
};
const collectionActions = (db) => (collName) => {
    const ref = () => db.collection(collName);
    const coll = ref();
    return {
        ref: ref(),
        create: (opts = {}) => __awaiter(void 0, void 0, void 0, function* () { return yield db.createCollection(collName, opts); }),
        addDoc: (docData) => __awaiter(void 0, void 0, void 0, function* () {
            (yield coll.insertOne(docData)).insertedId;
        }),
        addMult: (docData) => __awaiter(void 0, void 0, void 0, function* () { return (yield coll.insertMany(docData)).insertedIds; }),
        queryDocs: (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
            return yield coll.find(qfConv(queryOptions));
        }),
        queryDoc: (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
            return yield coll.findOne(qfConv(queryOptions));
        }),
        doc: documentAction(coll),
        docs: () => coll.find().map((d) => documentAction(coll)(d._id.toString())),
    };
};
/**
 * @deprecated DO NOT USE THIS!
 * @param db
 * @returns
 */
function MongoClientStore(db) {
    return {
        collection: collectionActions(db),
        getCollections: () => __awaiter(this, void 0, void 0, function* () { return yield db.listCollections().map((s) => s.name); }),
        collectionDocument: (collName) => {
            return documentAction(db.collection(collName));
        },
    };
}
exports.default = MongoClientStore;
//# sourceMappingURL=client.js.map