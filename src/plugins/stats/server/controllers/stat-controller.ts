import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
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
