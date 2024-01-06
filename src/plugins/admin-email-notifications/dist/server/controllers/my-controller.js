"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async index(ctx) {
        console.log('ctx ', ctx);
        const { body } = ctx.request;
        const adminIdString = body.adminId.toString();
        console.log({
            admin: adminIdString,
            article: body.articleId,
        });
        // const article = await strapi?.entityService?.findOne('api::article.article', body.articleId, {
        //   populate: '*',
        // });
        // console.log(article)
        // if(!article) throw new Error('Article not found')
        // // @ts-ignore
        // const isSubscribed = article.subscribers.some(
        //   (subscriber) => subscriber.id === body.adminId
        // );
        // if (isSubscribed) {
        //   await strapi?.entityService?.update('api::article.article', body.articleId, {
        //     data: {
        //       // @ts-ignore
        //       subscribers: {
        //         disconnect: [adminIdString],
        //       },
        //     },
        //   });
        // } else {
        //   await strapi?.entityService?.update('api::article.article', body.articleId, {
        //     data: {
        //       // @ts-ignore
        //       subscribers: {
        //         connect: [adminIdString],
        //       },
        //     },
        //   });
        // }
        ctx.body = strapi
            .plugin('admin-email-notifications')
            .service('myService')
            .subscribeAdminToEmailUpdates(adminIdString, body.articleId);
        // .getWelcomeMessage()
        // .subscribe()
    },
});
