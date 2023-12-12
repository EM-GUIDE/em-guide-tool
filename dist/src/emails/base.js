"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailBaseTemplate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mjml_react_1 = require("@faire/mjml-react");
const EmailBaseTemplate = ({ header, body, footer, }) => {
    return ((0, jsx_runtime_1.jsx)(mjml_react_1.Mjml, { children: (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlBody, { width: 500, children: [header, (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: body }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: footer })] }) }));
};
exports.EmailBaseTemplate = EmailBaseTemplate;
