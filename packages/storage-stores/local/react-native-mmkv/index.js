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
const api_1 = require("./api");
// TODO: Fix the types
function MMKVStore(mmkv, genDocId) {
    return {
        // @ts-ignore
        collection: (0, api_1.collectionWithStore)(mmkv, genDocId),
        collectionDocument: (0, api_1.collectionDocumentWithStore)(mmkv),
        getCollections: () => __awaiter(this, void 0, void 0, function* () { return (0, api_1.getCollections)(mmkv); }),
    };
}
exports.default = MMKVStore;
//# sourceMappingURL=index.js.map