"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_json_1 = __importDefault(require("./comment/schema.json"));
const contentTypes = {
    comment: { schema: schema_json_1.default },
};
exports.default = contentTypes;
