"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: "clickable-url",
        plugin: "clickable-url-field",
        type: "string",
        inputSize: {
            default: 12,
            isResizable: true,
        },
    });
};
