import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(query) {
    strapi
    return await strapi.entityService?.findMany('plugin::admin-comments.comment', query);
  },
  async create(data) {
    return await strapi.entityService?.create('plugin::admin-comments.comment', data);
  }
});
