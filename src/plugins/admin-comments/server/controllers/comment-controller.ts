import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
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
