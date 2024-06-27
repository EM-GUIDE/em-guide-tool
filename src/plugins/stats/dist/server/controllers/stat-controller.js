"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    // async getArticlesPerMag(ctx) {
    //   ctx.body = await strapi
    //     .plugin('stats')
    //     .service('statService')
    //     .getArticlesPerMag();
    // },
    async index(ctx) {
        ctx.body = await strapi
            .plugin('stats')
            .service('statService')
            .getArticlesPerMag();
    }
});
