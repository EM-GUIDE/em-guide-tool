"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHeaderTemplate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mjml_react_1 = require("@faire/mjml-react");
const EmailHeaderTemplate = ({ title, preview, }) => {
    return ((0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlHead, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlTitle, { children: title }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlPreview, { children: preview })] }));
};
exports.EmailHeaderTemplate = EmailHeaderTemplate;
