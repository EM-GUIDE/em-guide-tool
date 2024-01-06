"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    getWelcomeMessage() {
        return 'Welcome to Strapi 🚀';
    },
    async subscribeAdminToEmailUpdates(adminId, articleId) {
        var _a, _b, _c;
        const article = await ((_a = strapi === null || strapi === void 0 ? void 0 : strapi.entityService) === null || _a === void 0 ? void 0 : _a.findOne('api::article.article', articleId, {
            populate: '*',
        }));
        if (!article)
            throw new Error('Article not found');
        // @ts-ignore
        const isSubscribed = article.subscribers.some((subscriber) => subscriber.id.toString() === adminId);
        if (isSubscribed) {
            await ((_b = strapi === null || strapi === void 0 ? void 0 : strapi.entityService) === null || _b === void 0 ? void 0 : _b.update('api::article.article', articleId, {
                data: {
                    // @ts-ignore
                    subscribers: {
                        disconnect: [adminId],
                    },
                },
            }));
            return 'unsubscribed';
        }
        else {
            await ((_c = strapi === null || strapi === void 0 ? void 0 : strapi.entityService) === null || _c === void 0 ? void 0 : _c.update('api::article.article', articleId, {
                data: {
                    // @ts-ignore
                    subscribers: {
                        connect: [adminId],
                    },
                },
            }));
            return 'subscribed';
        }
    }
});
