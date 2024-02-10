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

    const isSubscribed = article.subscribers.some(
      (subscriber) => subscriber.id.toString() === adminId
    );

    console.log('isSubscribed: ', isSubscribed)

    if (isSubscribed) {
      await strapi?.entityService?.update('api::article.article', articleId, {
        data: {
          // @ts-expect-error
          subscribers: {
            disconnect: [adminId],
          },
        },
      });

      return 'unsubscribed'
    } else {
      await strapi?.entityService?.update('api::article.article', articleId, {
        data: {
          // @ts-expect-error
          subscribers: {
            connect: [adminId],
          },
        },
      });

      return 'subscribed'
    }
  }
});
