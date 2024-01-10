"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_article_1 = require("../../../../emails/create-article");
const updated_article_1 = require("../../../../emails/updated-article");
const utils_1 = require("@strapi/utils");
exports.default = {
    async afterCreate(event) {
        const { result } = event;
        const administrators = await strapi.query("admin::user").findMany();
        const emailsAddresses = administrators.map((admin) => admin.email);
        const creator = administrators.find((admin) => admin.id === result.createdBy.id);
        const creatorFirstname = creator.firstname;
        const creatorLastname = creator.lastname;
        for (let i = 0; i < emailsAddresses.length; i++) {
            const emailAddress = emailsAddresses[i];
            await strapi.plugins['email'].services.email.send({
                to: emailAddress,
                from: 'hello@freizeit.hu',
                replyTo: 'hello@freizeit.hu',
                subject: 'EM Guide: New article has been created',
                html: (0, create_article_1.createArticleEmailTemplate)({
                    articleTitle: result.title,
                    createdByName: `${creatorFirstname} ${creatorLastname}`,
                    link: `${(0, utils_1.env)('URL')}admin/content-manager/collectionType/api::article.article/${result.id}`
                })
            });
        }
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
        if (!result.updatedBy)
            return;
        const updater = result.updatedBy;
        const updaterFirstname = updater.firstname;
        const updaterLastname = updater.lastname;
        for (let i = 0; i < subscribedAdministrators.length; i++) {
            const { email } = subscribedAdministrators[i];
            await strapi.plugins['email'].services.email.send({
                to: email,
                from: 'hello@freizeit.hu',
                replyTo: 'hello@freizeit.hu',
                subject: 'EM Guide: Article has been updated',
                html: (0, updated_article_1.updatedArticleEmailTemplate)({
                    articleTitle: event.result.title,
                    updatedByName: `${updaterFirstname} ${updaterLastname}`,
                    link: `${(0, utils_1.env)('URL')}admin/content-manager/collectionType/api::article.article/${event.result.id}`
                })
            });
        }
    }
};
