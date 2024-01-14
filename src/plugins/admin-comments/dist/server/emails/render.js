"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderReactToMjml = void 0;
const renderToMjml_1 = require("@faire/mjml-react/utils/renderToMjml");
const mjml_1 = __importDefault(require("mjml"));
function renderReactToMjml(email) {
    return (0, mjml_1.default)((0, renderToMjml_1.renderToMjml)(email));
}
exports.renderReactToMjml = renderReactToMjml;
