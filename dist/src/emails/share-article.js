"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticleShareEmailTemplate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const render_1 = require("./render");
const utils_1 = require("@strapi/utils");
const mjml_react_1 = require("@faire/mjml-react");
const utils_2 = require("./utils");
const createArticleShareEmailTemplate = ({ articleTitle, name, link, newUrlWithMagazine, }) => {
    console.log(newUrlWithMagazine);
    const { html, errors } = (0, render_1.renderReactToMjml)((0, jsx_runtime_1.jsxs)(mjml_react_1.Mjml, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlHead, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlTitle, { children: [(0, utils_1.env)("ENVIRONMENT") === "development" && 'TEST', "EM GUIDE | ", newUrlWithMagazine.sharerMagazine, " has just shared", " ", newUrlWithMagazine.originName, "'s article:", " ", (0, utils_2.truncateText)({ text: articleTitle })] }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlPreview, { children: ["New share on ", (0, utils_2.truncateText)({ text: articleTitle })] })] }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlBody, { width: 600, children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { paddingBottom: "16px", children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlDivider, { padding: "16px 0", "border-width": "1px", "border-color": "#F6F6F9" }) }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlSection, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlText, { "line-height": "1.5", "font-size": "16px", color: "#4A4A6A", "font-family": "sans-serif", children: [(0, utils_1.env)("ENVIRONMENT") === "development" && 'TEST', newUrlWithMagazine.sharerMagazine, " has just shared", " ", newUrlWithMagazine.originName, "'s article: ", (0, jsx_runtime_1.jsx)("i", { children: articleTitle }), "."] }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSpacer, { height: "16px" }), newUrlWithMagazine && newUrlWithMagazine.url && ((0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { "line-height": "1.5", "font-size": "16px", color: "#4A4A6A", "font-family": "sans-serif", paddingBottom: "8px", children: newUrlWithMagazine.url })), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlWrapper, { padding: "16px 0", fullWidth: true, textAlign: "center", children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlButton, { href: link, "background-color": "#4945FF", "font-weight": "700", "font-size": "14px", padding: "8px 16px", "border-right": "4px", height: "40px", "line-height": "1.5", textAlign: "center", align: "center", children: "Open article" }) })] })] })] }));
    return html;
};
exports.createArticleShareEmailTemplate = createArticleShareEmailTemplate;
