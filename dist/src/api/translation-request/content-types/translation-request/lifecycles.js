"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_translation_request_1 = require("../../../../emails/create-translation-request");
const updated_translation_request_1 = require("../../../../emails/updated-translation-request");
const utils_1 = require("@strapi/utils");
const { ValidationError } = utils_1.errors;
const sendEmails = async (recipients, template, title, article, translationRequest, creatorOrUpdater) => {
    const promises = recipients.map(async (recipient) => {
        await strapi.plugins['email'].services.email.send({
            to: recipient,
            from: (0, utils_1.env)('SMTP_EMAIL'),
            replyTo: (0, utils_1.env)('SMTP_EMAIL'),
            subject: title,
            html: template({
                articleTitle: article.title,
                language: translationRequest.language.name,
                name: `${creatorOrUpdater.firstname}`,
                link: `${(0, utils_1.env)('URL')}admin/content-manager/collection-types/api::translation-request.translation-request/${translationRequest.id}`
            })
        });
    });
    await Promise.all(promises);
    console.log('Emails sent');
};
exports.default = {
    async beforeCreate(event) {
        const { data } = event.params;
        if (data.article.connect.length === 0) {
            throw new ValidationError('Article is required to create a translation request');
        }
        if (data.language.connect.length === 0) {
            throw new ValidationError('Language is required to create a translation request');
        }
        const translationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
            populate: ['article'],
            filters: {
                $and: [
                    {
                        language: {
                            id: data.language.connect[0].id
                        }
                    },
                    {
                        article: {
                            id: data.article.connect[0].id
                        }
                    },
                ],
            },
        });
        if (translationRequests && translationRequests.length > 0) {
            throw new ValidationError('A translation request for this article in this language already exists.');
        }
    },
    async afterCreate(event) {
        const { result, params } = event;
        const connectedArticle = await strapi.entityService.findOne('api::article.article', params.data.article.connect[0].id, {
            populate: ["subscribers", "language"]
        });
        if (!connectedArticle) {
            throw new ValidationError('Article not found');
        }
        const creator = result.createdBy;
        const emailAddresses = connectedArticle.subscribers.map((subscriber) => subscriber.email);
        await sendEmails(emailAddresses, create_translation_request_1.createTranslationRequestEmailTemplate, `EM GUIDE: Translation request has been created for ${connectedArticle.title} by ${creator.firstname}`, connectedArticle, result, creator);
    },
    async beforeUpdate(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const { data } = event.params;
        const currentTranslationRequest = await strapi.entityService.findOne('api::translation-request.translation-request', data.id, {
            populate: ['article', 'language'],
        });
        if ((((_a = data === null || data === void 0 ? void 0 : data.language) === null || _a === void 0 ? void 0 : _a.disconnect.length) > 0 && ((_b = data === null || data === void 0 ? void 0 : data.language) === null || _b === void 0 ? void 0 : _b.connect.length) === 0) || (((_c = data === null || data === void 0 ? void 0 : data.article) === null || _c === void 0 ? void 0 : _c.disconnect.length) > 0 && ((_d = data === null || data === void 0 ? void 0 : data.article) === null || _d === void 0 ? void 0 : _d.connect.length) === 0))
            throw new ValidationError('An article and a language is required for translation requests');
        const isLanguageUpdated = (((_f = (_e = data === null || data === void 0 ? void 0 : data.language) === null || _e === void 0 ? void 0 : _e.connect[0]) === null || _f === void 0 ? void 0 : _f.id) !== ((_g = currentTranslationRequest === null || currentTranslationRequest === void 0 ? void 0 : currentTranslationRequest.language) === null || _g === void 0 ? void 0 : _g.id)) && !(((_h = data === null || data === void 0 ? void 0 : data.language) === null || _h === void 0 ? void 0 : _h.connect.length) === 0 && ((_j = data === null || data === void 0 ? void 0 : data.language) === null || _j === void 0 ? void 0 : _j.disconnect.length) === 0);
        const isArticleUpdated = (((_l = (_k = data === null || data === void 0 ? void 0 : data.article) === null || _k === void 0 ? void 0 : _k.connect[0]) === null || _l === void 0 ? void 0 : _l.id) !== ((_m = currentTranslationRequest === null || currentTranslationRequest === void 0 ? void 0 : currentTranslationRequest.article) === null || _m === void 0 ? void 0 : _m.id)) && !(((_p = (_o = data === null || data === void 0 ? void 0 : data.article) === null || _o === void 0 ? void 0 : _o.connect) === null || _p === void 0 ? void 0 : _p.length) === 0 && ((_r = (_q = data === null || data === void 0 ? void 0 : data.article) === null || _q === void 0 ? void 0 : _q.disconnect) === null || _r === void 0 ? void 0 : _r.length) === 0);
        console.log({
            isLanguageUpdated,
            isArticleUpdated
        });
        if (isLanguageUpdated || isArticleUpdated) {
            const translationRequestsWithSameArticleAndLanguage = await strapi.entityService.findMany('api::translation-request.translation-request', {
                populate: ['article', 'language'],
                filters: {
                    $and: [
                        {
                            language: {
                                id: isLanguageUpdated ? data.language.connect[0].id : currentTranslationRequest.language.id
                            }
                        },
                        {
                            article: {
                                id: isArticleUpdated ? data.article.connect[0].id : currentTranslationRequest.article.id
                            }
                        },
                    ],
                },
            });
            if (translationRequestsWithSameArticleAndLanguage && translationRequestsWithSameArticleAndLanguage.length > 0) {
                throw new ValidationError('A translation request for this article in this language already exists.');
            }
        }
    },
    async afterUpdate(event) {
        const { result, params } = event;
        const translationRequestWithArticles = await strapi.entityService.findOne('api::translation-request.translation-request', params.data.id, {
            populate: {
                language: {
                    fields: ['name', 'code']
                },
                article: {
                    populate: ['subscribers']
                }
            }
        });
        const emailAddresses = translationRequestWithArticles.article.subscribers.map((subscriber) => subscriber.email);
        if (!result.updatedBy)
            return;
        const updater = result.updatedBy;
        await sendEmails(emailAddresses, updated_translation_request_1.updatedTranslationRequestEmailTemplate, `EM GUIDE: Translation request for ${translationRequestWithArticles.article.title} has been updated`, {
            id: Number(translationRequestWithArticles.article.id),
            title: translationRequestWithArticles.article.title
        }, 
        // @ts-expect-error
        translationRequestWithArticles, updater);
    }
};
