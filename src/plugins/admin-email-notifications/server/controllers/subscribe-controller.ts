import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const { adminId, articleId } = ctx.request.body;
    const adminIdString = adminId.toString();

    ctx.body = await strapi
      .plugin('admin-email-notifications')
      .service('subscribeService')
      .subscribeAdminToEmailUpdates(adminIdString, articleId);
  },
});