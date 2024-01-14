"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async find(ctx) {
        ctx.body = await strapi
            .plugin('admin-comments')
            .service('commentService')
            .find(ctx.query);
    },
    async create(ctx) {
        ctx.body = await strapi
            .plugin('admin-comments')
            .service('commentService')
            .create(ctx.request.body);
    }
});
