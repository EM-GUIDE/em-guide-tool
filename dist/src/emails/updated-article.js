"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedArticleEmailTemplate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const render_1 = require("./render");
const utils_1 = require("@strapi/utils");
const mjml_react_1 = require("@faire/mjml-react");
const updatedArticleEmailTemplate = ({ articleTitle, name, link, }) => {
    const { html, errors } = (0, render_1.renderReactToMjml)((0, jsx_runtime_1.jsxs)(mjml_react_1.Mjml, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlHead, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlTitle, { children: [(0, utils_1.env)("ENVIRONMENT") === "development" && 'TEST', " EM GUIDE | Article updated"] }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlPreview, { children: [name, " has updated an article you have subscribed to..."] })] }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlBody, { width: 600, children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlSection, { paddingBottom: "16px", children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlText, { color: "#212134", "font-size": "32px", "font-weight": "700", "font-family": "sans-serif", lineHeight: "1.5", paddingBottom: " 16px", children: [(0, utils_1.env)("ENVIRONMENT") === "development" && 'TEST', " EM GUIDE | Article updated"] }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlDivider, { padding: "16px 0", "border-width": "1px", "border-color": "#F6F6F9" })] }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlSection, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlText, { "line-height": "1.5", "font-size": "16px", color: "#4A4A6A", "font-family": "sans-serif", children: [name, " has updated an article: ", articleTitle, ". You can view it by clicking the link below."] }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlWrapper, { padding: "16px 0", fullWidth: true, textAlign: "center", children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlButton, { href: link, "background-color": "#4945FF", "font-weight": "700", "font-size": "14px", padding: "8px 16px", "border-right": "4px", height: "40px", "line-height": "1.5", textAlign: "center", align: "center", children: "Open article" }) })] })] })] }));
    return html;
};
exports.updatedArticleEmailTemplate = updatedArticleEmailTemplate;
