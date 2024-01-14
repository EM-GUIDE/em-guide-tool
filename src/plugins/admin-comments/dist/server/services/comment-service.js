"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async find(query) {
        var _a;
        strapi;
        return await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany('plugin::admin-comments.comment', query));
    },
    async create(data) {
        var _a;
        console.log(data);
        return await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.create('plugin::admin-comments.comment', data));
    }
});
