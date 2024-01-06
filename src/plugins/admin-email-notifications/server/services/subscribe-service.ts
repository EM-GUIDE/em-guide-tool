import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  async subscribeAdminToEmailUpdates(adminId: string, articleId: string) {

    const article = await strapi?.entityService?.findOne('api::article.article', articleId, {
      populate: '*',
    });

    if(!article) throw new Error('Article not found')

    // @ts-ignore
    const isSubscribed = article.subscribers.some(
      (subscriber) => subscriber.id.toString() === adminId
    );

    if (isSubscribed) {
      await strapi?.entityService?.update('api::article.article', articleId, {
        data: {
          // @ts-ignore
          subscribers: {
            disconnect: [adminId],
          },
        },
      });

      return 'unsubscribed'
    } else {
      await strapi?.entityService?.update('api::article.article', articleId, {
        data: {
          // @ts-ignore
          subscribers: {
            connect: [adminId],
          },
        },
      });

      return 'subscribed'
    }
  }
});
