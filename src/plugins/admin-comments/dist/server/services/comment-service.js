"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const comment_added_1 = require("../emails/comment-added");
const sendEmails = async (recipients, template, title, article, creatorOrUpdater) => {
    const promises = recipients.map(async (recipient) => {
        await strapi.plugins['email'].services.email.send({
            to: recipient,
            from: (0, utils_1.env)('SMTP_EMAIL'),
            replyTo: (0, utils_1.env)('SMTP_EMAIL'),
            subject: (0, utils_1.env)("ENVIRONMENT") === "development" ? `TEST ${title}` : title,
            html: template({
                articleTitle: article.title,
                name: `${creatorOrUpdater.firstname} ${creatorOrUpdater.lastname}`,
                link: `${(0, utils_1.env)('URL')}admin/content-manager/collection-types/api::article.article/${article.id}`
            })
        });
    });
    await Promise.all(promises);
};
exports.default = ({ strapi }) => ({
    async find(query) {
        var _a;
        strapi;
        return await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany('plugin::admin-comments.comment', query));
    },
    async create(request) {
        var _a, _b;
        const commenterId = request.data.admin_user.connect[0];
        const article = await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findOne("api::article.article", request.data.entityId, {
            populate: ["subscribers"],
        }));
        const subscriberIds = article === null || article === void 0 ? void 0 : article.subscribers.map((subscriber) => subscriber.id);
        const administrators = await strapi.query("admin::user").findMany();
        const commenter = administrators.find((admin) => admin.id === commenterId);
        const subscribedAdministrators = administrators.filter((admin) => subscriberIds.includes(admin.id));
        const emailAddresses = subscribedAdministrators.filter(admin => admin.id !== commenterId).map((admin) => admin.email);
        if (!article) {
            throw new Error('Article not found');
        }
        await sendEmails(emailAddresses, comment_added_1.commentAddedEmailTemplate, `EM GUIDE: New comment on ${article.title}`, article, commenter);
        return await ((_b = strapi.entityService) === null || _b === void 0 ? void 0 : _b.create('plugin::admin-comments.comment', request));
    }
});
