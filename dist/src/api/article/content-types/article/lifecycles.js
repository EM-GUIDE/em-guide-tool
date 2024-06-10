"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_article_1 = require("../../../../emails/create-article");
const share_article_1 = require("../../../../emails/share-article");
// import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";
const utils_1 = require("@strapi/utils");
const utils_2 = require("../../../../emails/utils");
const sendEmails = async (recipients, template, title, article, creatorOrUpdater, shareUrls) => {
    const promises = recipients.map(async (recipient) => {
        await strapi.plugins["email"].services.email.send({
            to: recipient,
            from: (0, utils_1.env)("SMTP_EMAIL"),
            replyTo: (0, utils_1.env)("SMTP_EMAIL"),
            subject: title,
            html: template({
                articleTitle: article.title,
                name: `${creatorOrUpdater.firstname}`,
                link: `${(0, utils_1.env)("URL")}admin/content-manager/collection-types/api::article.article/${article.id}`,
                shareUrls: shareUrls
            }),
        });
    });
    await Promise.all(promises);
};
const getNewArticleUrls = (newRawData) => {
    return newRawData.urls.filter(url => !url.id && url.url !== undefined && url.url !== '').map(url => url.url);
};
exports.default = {
    async beforeCreate(event) {
        const { data } = event.params;
        // subscribe the creator to the article by default
        data.subscribers.connect = [data.createdBy];
    },
    async beforeUpdate(event) {
        const { data, where } = event.params;
        const article = await strapi.entityService.findOne('api::article.article', where.id, {
            populate: {
                urls: true
            },
        });
        // Get raw data
        const ctx = strapi.requestContext.get();
        const newRawData = ctx.request.body;
        const numberOfCurrrentSharedUrls = article.urls.length;
        const numberOfUpdatedSharedUrls = data.urls.length;
        if (!article)
            return;
        if (!article.publishedAt) {
            const administrators = await strapi.query("admin::user").findMany();
            const creator = administrators.find((admin) => admin.id === data.updatedBy);
            const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);
            await sendEmails(emailAddresses, create_article_1.createArticleEmailTemplate, `EM GUIDE: ${creator.firstname} has created a new article: ${article.title}`, {
                id: Number(article.id),
                title: article.title
            }, creator);
        }
        if (numberOfUpdatedSharedUrls > numberOfCurrrentSharedUrls) {
            const administrators = await strapi.query("admin::user").findMany();
            const creator = administrators.find((admin) => admin.id === data.updatedBy);
            const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);
            const newArticleUrls = getNewArticleUrls(newRawData);
            await sendEmails(emailAddresses, share_article_1.createArticleShareEmailTemplate, `EM GUIDE: New share on ${(0, utils_2.truncateText)({ text: article.title })}`, {
                id: newRawData.id,
                title: article.title,
            }, creator, newArticleUrls);
        }
    }
    // // Comment out to enable email notifications on article updates
    // async afterUpdate(event) {
    //   const { result } = event;
    //   const { where } = event.params;
    //   const id = where.id;
    //   const article = await strapi.entityService.findOne("api::article.article", id, {
    //     populate: ["subscribers"],
    //   })
    //   // @ts-expect-error
    //   const subscriberIds = article.subscribers.map((subscriber) => subscriber.id);
    //   const subscribedAdministrators = await strapi.query("admin::user").findMany({
    //     where: {
    //       id: {
    //         $in: subscriberIds,
    //       },
    //     },
    //   });
    //   const emailAddresses = subscribedAdministrators.map((admin) => admin.email);
    //   if (!result.updatedBy) return;
    //   const updater = result.updatedBy;
    //   await sendEmails(
    //     emailAddresses,
    //     updatedArticleEmailTemplate,
    //     'EM GUIDE: Article has been updated',
    //     result,
    //     updater
    //   );
    // }
};
