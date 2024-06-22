"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_article_1 = require("../../../../emails/create-article");
const share_article_1 = require("../../../../emails/share-article");
// import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";
const utils_1 = require("@strapi/utils");
const utils_2 = require("../../../../emails/utils");
const { ValidationError } = utils_1.errors;
const sendEmails = async (recipients, template, title, article, creatorOrUpdater, shareUrls, originName) => {
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
                shareUrls: shareUrls,
                originName: originName
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
        var _a, _b;
        const { data } = event.params;
        const isWithoutOrigin = ((_b = (_a = data.origin) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.length) === 0;
        if (isWithoutOrigin)
            throw new ValidationError('Origin is required to create an article');
        // subscribe the creator to the article by default
        data.subscribers.connect = [data.createdBy];
    },
    async beforeUpdate(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const { data, where } = event.params;
        const article = await strapi.entityService.findOne('api::article.article', where.id, {
            populate: {
                urls: true,
                subscribers: true,
                origin: {
                    populate: {
                        name: true
                    }
                },
            },
        });
        // Get raw data
        const ctx = strapi.requestContext.get();
        const newRawData = ctx.request.body;
        const numberOfCurrrentSharedUrls = (_a = article.urls) === null || _a === void 0 ? void 0 : _a.length;
        const numberOfUpdatedSharedUrls = (_b = data.urls) === null || _b === void 0 ? void 0 : _b.length;
        // const isNotUpdatingExistingOrigin = data.origin?.connect?.length === 0 && data.origin?.disconnect?.length === 0;
        let administrators = [];
        if (!article)
            return;
        // * If the article is not published
        if (!article.publishedAt) {
            // * Guard clause to prevent publishing an article without an origin
            if ((!article.origin && !((_c = data.origin) === null || _c === void 0 ? void 0 : _c.connect)) || article.origin && ((_e = (_d = data.origin) === null || _d === void 0 ? void 0 : _d.disconnect) === null || _e === void 0 ? void 0 : _e.length) !== 0 && ((_g = (_f = data.origin) === null || _f === void 0 ? void 0 : _f.connect) === null || _g === void 0 ? void 0 : _g.length) === 0)
                throw new ValidationError('Origin is required to create an article');
            const isNotUpdatingExistingOrigin = !data.origin && !newRawData.origin;
            administrators = await strapi.query("admin::user").findMany();
            const creator = administrators.find((admin) => admin.id === data.updatedBy);
            const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);
            const origin = await strapi.entityService.findOne('api::magazine.magazine', isNotUpdatingExistingOrigin ? article.origin.id : (_h = data.origin) === null || _h === void 0 ? void 0 : _h.connect[0].id);
            await sendEmails(emailAddresses, create_article_1.createArticleEmailTemplate, `EM GUIDE: ${origin.name} has published a new article: ${article.title}`, {
                id: Number(article.id),
                title: article.title
            }, creator, null, origin.name);
            // * If the article is published
        }
        else {
            const isWithoutAndNotAddingOrigin = !article.origin && ((_k = (_j = data.origin) === null || _j === void 0 ? void 0 : _j.connect) === null || _k === void 0 ? void 0 : _k.length) === 0;
            const isUpdatedWithOriginRemoved = ((_m = (_l = data.origin) === null || _l === void 0 ? void 0 : _l.disconnect) === null || _m === void 0 ? void 0 : _m.length) !== 0 && ((_p = (_o = data.origin) === null || _o === void 0 ? void 0 : _o.connect) === null || _p === void 0 ? void 0 : _p.length) === 0;
            if (isWithoutAndNotAddingOrigin || isUpdatedWithOriginRemoved)
                throw new ValidationError('Origin is required for articles');
            if (numberOfUpdatedSharedUrls > numberOfCurrrentSharedUrls) {
                const subscriberIds = article.subscribers.map((subscriber) => subscriber.id);
                const subscribedAdministrators = administrators.length > 0 ? administrators.filter(admin => subscriberIds.includes(admin.id)) : await strapi.query("admin::user").findMany({
                    where: {
                        id: {
                            $in: subscriberIds,
                        },
                    },
                });
                const subscribedAdminEmailAddresses = subscribedAdministrators.filter(admin => admin.id !== data.updatedBy).map(admin => admin.email);
                const newArticleUrls = getNewArticleUrls(newRawData);
                await sendEmails(subscribedAdminEmailAddresses, share_article_1.createArticleShareEmailTemplate, `EM GUIDE: New share on ${(0, utils_2.truncateText)({ text: article.title })}`, {
                    id: newRawData.id,
                    title: article.title,
                }, data.updatedBy, newArticleUrls);
            }
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
