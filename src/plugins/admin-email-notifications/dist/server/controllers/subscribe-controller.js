"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async index(ctx) {
        const { adminId, articleId } = ctx.request.body;
        const adminIdString = adminId.toString();
        ctx.body = await strapi
            .plugin('admin-email-notifications')
            .service('subscribeService')
            .subscribeAdminToEmailUpdates(adminIdString, articleId);
    },
});
