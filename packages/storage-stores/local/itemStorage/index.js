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
const ItemStorage = (name, storage, genDocRef) => {
    // reference to the `collections` document
    const COLLECTIONS_REF = `${name}@$$collections`;
    const collRefFn = (collId) => `${name}@/${collId}`;
    return {
        collection: (0, api_1.collectionWithStore)(COLLECTIONS_REF, collRefFn, storage, genDocRef),
        getCollections: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, api_1.getCollections)(COLLECTIONS_REF, storage); }),
        collectionDocument: (0, api_1.collectionDocumentWithStore)(storage, collRefFn),
    };
};
exports.default = ItemStorage;
//# sourceMappingURL=index.js.map