"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_translation_request_1 = require("../../../../emails/create-translation-request");
const updated_translation_request_1 = require("../../../../emails/updated-translation-request");
const utils_1 = require("@strapi/utils");
const { ValidationError } = utils_1.errors;
exports.default = {
    async beforeCreate(event) {
        const { data } = event.params;
        // @ts-ignore
        if (!data.article.connect[0].id) {
            throw new ValidationError('An article is required to create translation requests.');
        }
        const existingTranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
            populate: {
                article: {
                    fields: ['id'],
                }
            },
            filters: {
                $and: [
                    {
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
        // @ts-expect-error
        if (existingTranslationRequests && existingTranslationRequests.length > 0) {
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
        const creatorFirstname = creator.firstname;
        const creatorLastname = creator.lastname;
        // @ts-ignore
        const subscriberIds = connectedArticle.subscribers.map((subscriber) => subscriber.id);
        const subscribedAdministrators = await strapi.query("admin::user").findMany({
            where: {
                id: {
                    $in: subscriberIds,
                },
            },
        });
        for (let i = 0; i < subscribedAdministrators.length; i++) {
            const { email } = subscribedAdministrators[i];
            await strapi.plugins['email'].services.email.send({
                to: email,
                from: 'hello@freizeit.hu',
                replyTo: 'hello@freizeit.hu',
                subject: 'EM Guide: New translation request has been created',
                html: (0, create_translation_request_1.createTranslationRequestEmailTemplate)({
                    articleTitle: connectedArticle.title,
                    language: result.language,
                    createdByName: `${creatorFirstname} ${creatorLastname}`,
                    link: `${(0, utils_1.env)('URL')}admin/content-manager/collectionType/api::translation-request.translation-request/${result.id}`
                })
            });
        }
        // // Notify all admins of the new translation request
        // for (let i = 0; i < emailsAddresses.length; i++) {
        //   const emailAddress = emailsAddresses[i];
        //   await strapi.plugins['email'].services.email.send({
        //     to: emailAddress,
        //     from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        //     replyTo: 'hello@freizeit.hu',
        //     subject: 'EM Guide: New translation request has been created',
        //     html: createTranslationRequestEmailTemplate(
        //       {
        //         articleTitle: connectedArticle.title as string,
        //         createdByName: `${firstname} ${lastname}`,
        //         language: result.language,
        //         link: `${env('URL')}admin/content-manager/collectionType/api::translation-request.translation-request/${result.id}`
        //       })
        //   })
        // }
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
        // @ts-ignore
        const subscriberIds = translationRequestWithArticles.article.subscribers.map((subscriber) => subscriber.id);
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
                subject: 'EM Guide: Translation request has been updated',
                html: (0, updated_translation_request_1.updatedTranslationRequestEmailTemplate)({
                    // @ts-ignore
                    articleTitle: translationRequestWithArticles.article.title,
                    updatedByName: `${updaterFirstname} ${updaterLastname}`,
                    link: `${(0, utils_1.env)('URL')}admin/content-manager/collectionType/api::article.article/${event.result.id}`
                })
            });
        }
    }
};
