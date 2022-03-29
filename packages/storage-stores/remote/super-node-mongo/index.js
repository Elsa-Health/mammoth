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
const axios_1 = require("axios");
const api_1 = require("./api");
const createSuperNodeAxios = (url) => axios_1.default.create({ baseURL: url });
function superNodeMongoBuildConfig(SUPER_NODE_API_URL) {
    const snAxios = createSuperNodeAxios(SUPER_NODE_API_URL);
    return {
        // @ts-ignore
        collection: (0, api_1.collection)(snAxios),
        collectionDocument: (0, api_1.collectionDocument)(snAxios),
        getCollections: () => __awaiter(this, void 0, void 0, function* () {
            const res = yield snAxios.post("/collections");
            return res.data;
        }),
    };
}
exports.default = superNodeMongoBuildConfig;
//# sourceMappingURL=index.js.map