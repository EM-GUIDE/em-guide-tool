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
        var _a, _b, _c, _d;
        console.log('beforeCreate');
        const { data } = event.params;
        const isWithoutOrigin = ((_b = (_a = data.origin) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.length) === 0;
        if (isWithoutOrigin)
            throw new ValidationError('Origin is required to create an article');
        const ctx = strapi.requestContext.get();
        const newRawData = ctx.request.body;
        console.log(data.urls);
        console.log(newRawData.urls);
        const hasUrlsWithoutMagazine = ((_c = newRawData === null || newRawData === void 0 ? void 0 : newRawData.urls) === null || _c === void 0 ? void 0 : _c.length) > 0 && ((_d = newRawData === null || newRawData === void 0 ? void 0 : newRawData.urls) === null || _d === void 0 ? void 0 : _d.some(url => url.magazine.connect.length === 0));
        if (hasUrlsWithoutMagazine)
            throw new ValidationError('All shared urls need to have a magazine associated with them');
        console.log(data);
        // subscribe the creator to the article by default
        console.log(!data.subscribers);
        console.log(data.subscribers);
        if (!data.subscribers)
            return;
        data.subscribers.connect = [data.createdBy];
    },
    async beforeUpdate(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        console.log('beforeUpdate');
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
        console.log({ article });
        console.log({ data });
        console.log({ newRawData });
        console.log({ dataUrls: data.urls });
        console.log({ newRawDataUurls: newRawData.urls });
        // return
        let administrators = [];
        if (!article)
            return;
        // * Guard clause to prevent adding or publishing an article without an origin
        const isUnpublishingArticle = article.publishedAt !== null && data.publishedAt === null;
        console.log({ isUnpublishingArticle });
        const isWithoutAndNotAddingOrigin = !article.origin && ((_d = (_c = data.origin) === null || _c === void 0 ? void 0 : _c.connect) === null || _d === void 0 ? void 0 : _d.length) === 0;
        const isUpdatedWithOriginRemoved = ((_f = (_e = data.origin) === null || _e === void 0 ? void 0 : _e.disconnect) === null || _f === void 0 ? void 0 : _f.length) !== 0 && ((_h = (_g = data.origin) === null || _g === void 0 ? void 0 : _g.connect) === null || _h === void 0 ? void 0 : _h.length) === 0;
        console.log({
            isWithoutAndNotAddingOrigin,
            isUpdatedWithOriginRemoved
        });
        if (isWithoutAndNotAddingOrigin || isUpdatedWithOriginRemoved)
            throw new ValidationError('Origin is required for articles');
        const isDisconnectingUrlMagazineWithoutAddingNewOne = (_j = newRawData.urls) === null || _j === void 0 ? void 0 : _j.some(url => { var _a, _b; return ((_a = url.magazine.disconnect) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = url.magazine.connect) === null || _b === void 0 ? void 0 : _b.length) === 0; });
        console.log({
            isDisconnectingUrlMagazineWithoutAddingNewOne
        });
        if (!isUnpublishingArticle && isDisconnectingUrlMagazineWithoutAddingNewOne)
            throw new ValidationError('All shared urls need to have a magazine associated with them');
        const hasUrlsWithoutMagazine = ((_k = newRawData === null || newRawData === void 0 ? void 0 : newRawData.urls) === null || _k === void 0 ? void 0 : _k.length) > 0 && ((_l = newRawData === null || newRawData === void 0 ? void 0 : newRawData.urls) === null || _l === void 0 ? void 0 : _l.some(url => url.magazine.connect.length === 0));
        if (hasUrlsWithoutMagazine)
            throw new ValidationError('All shared urls need to have a magazine associated with them');
        // * If the article is not published
        if (!article.publishedAt) {
            // ! TODO when you try to update an article in draft that has shared urls without a magazine or you try to disconnect the magazine and save it
            const isNotUpdatingExistingOrigin = (article.origin && !data.origin) || (!(data.origin.disconnect.length === 0) && !newRawData.origin);
            console.log({ isNotUpdatingExistingOrigin });
            // console.log(article.origin)
            // console.log(data.origin)
            // console.log(newRawData.origin)
            // ! If origin is already added 
            const origin = await strapi.entityService.findOne('api::magazine.magazine', isNotUpdatingExistingOrigin ? article.origin.id : (_m = data.origin) === null || _m === void 0 ? void 0 : _m.connect[0].id);
            administrators = await strapi.query("admin::user").findMany();
            console.log(data);
            const creator = administrators.find((admin) => admin.id === data.updatedBy);
            const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);
            await sendEmails(emailAddresses, create_article_1.createArticleEmailTemplate, `EM GUIDE: ${origin.name} has published a new article: ${article.title}`, {
                id: Number(article.id),
                title: article.title
            }, creator, null, origin.name);
            // * If the article is published
        }
        else {
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
