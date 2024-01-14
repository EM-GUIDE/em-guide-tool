"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_article_1 = require("../../../../emails/create-article");
const updated_article_1 = require("../../../../emails/updated-article");
const utils_1 = require("@strapi/utils");
const sendEmails = async (recipients, template, title, article, creatorOrUpdater) => {
    const promises = recipients.map(async (recipient) => {
        await strapi.plugins['email'].services.email.send({
            to: recipient,
            from: 'hello@freizeit.hu',
            replyTo: 'hello@freizeit.hu',
            subject: title,
            html: template({
                articleTitle: article.title,
                name: `${creatorOrUpdater.firstname} ${creatorOrUpdater.lastname}`,
                link: `${(0, utils_1.env)('URL')}admin/content-manager/collectionType/api::article.article/${article.id}`
            })
        });
    });
    await Promise.all(promises);
};
exports.default = {
    async afterCreate(event) {
        const { result } = event;
        const administrators = await strapi.query("admin::user").findMany();
        const emailsAddresses = administrators.map((admin) => admin.email);
        const creator = administrators.find((admin) => admin.id === result.createdBy.id);
        await sendEmails(emailsAddresses, create_article_1.createArticleEmailTemplate, 'EM Guide: New article has been created', result, creator);
    },
    async afterUpdate(event) {
        const { result } = event;
        const { where } = event.params;
        const id = where.id;
        const article = await strapi.entityService.findOne("api::article.article", id, {
            populate: ["subscribers"],
        });
        // @ts-ignore
        const subscriberIds = article.subscribers.map((subscriber) => subscriber.id);
        const subscribedAdministrators = await strapi.query("admin::user").findMany({
            where: {
                id: {
                    $in: subscriberIds,
                },
            },
        });
        const emailAddresses = subscribedAdministrators.map((admin) => admin.email);
        if (!result.updatedBy)
            return;
        const updater = result.updatedBy;
        await sendEmails(emailAddresses, updated_article_1.updatedArticleEmailTemplate, 'EM Guide: Article has been updated', result, updater);
    }
};
