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
            from: 'hello@freizeit.hu',
            replyTo: 'hello@freizeit.hu',
            subject: title,
            html: template({
                articleTitle: article.title,
                language: translationRequest.language,
                name: `${creatorOrUpdater.firstname} ${creatorOrUpdater.lastname}`,
                link: `${(0, utils_1.env)('URL')}admin/content-manager/collectionType/api::translation-request.translation-request/${article.id}`
            })
        });
    });
    await Promise.all(promises);
};
exports.default = {
    async beforeCreate(event) {
        const { data } = event.params;
        const TranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
            populate: ['article'],
            filters: {
                $and: [
                    {
                        // @ts-ignore
                        language: data.language
                    },
                    {
                        article: {
                            id: data.article.connect[0].id
                        }
                    },
                ],
            },
        });
        // @ts-ignore
        if (TranslationRequests && TranslationRequests.length > 0) {
            throw new ValidationError('A translation request for this article in this language already exists.');
        }
    },
    async afterCreate(event) {
        const { result, params } = event;
        const connectedArticle = await strapi.entityService.findOne('api::article.article', params.data.article.connect[0].id, {
            populate: ["subscribers"]
        });
        if (!connectedArticle) {
            throw new ValidationError('Article not found');
        }
        const creator = result.createdBy;
        const emailAddresses = connectedArticle.subscribers.map((subscriber) => subscriber.email);
        await sendEmails(emailAddresses, create_translation_request_1.createTranslationRequestEmailTemplate, 'EM Guide: New translation request has been created', connectedArticle, result, creator);
    },
    async beforeUpdate(event) {
        const { data } = event.params;
        const currentTranslationRequest = await strapi.entityService.findOne('api::translation-request.translation-request', data.id, {
            populate: ['article'],
        });
        const TranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
            populate: ['article'],
            filters: {
                $and: [
                    {
                        // @ts-ignore
                        language: data.language
                    },
                    {
                        article: {
                            id: currentTranslationRequest.article.id
                        }
                    },
                ],
            },
        });
        // @ts-ignore
        if (TranslationRequests && TranslationRequests.length > 0) {
            throw new ValidationError('A translation request for this article in this language already exists.');
        }
    },
    async afterUpdate(event) {
        const { result, params } = event;
        const translationRequestWithArticles = await strapi.entityService.findOne('api::translation-request.translation-request', params.data.id, {
            populate: {
                article: {
                    populate: ['subscribers']
                }
            }
        });
        const emailAddresses = translationRequestWithArticles.article.subscribers.map((subscriber) => subscriber.email);
        if (!result.updatedBy)
            return;
        const updater = result.updatedBy;
        await sendEmails(emailAddresses, updated_translation_request_1.updatedTranslationRequestEmailTemplate, 'EM Guide: Translation request has been updated', translationRequestWithArticles.article, result, updater);
    }
};
