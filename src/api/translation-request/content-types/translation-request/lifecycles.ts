import { createTranslationRequestEmailTemplate } from "../../../../emails/create-translation-request";
import { updatedTranslationRequestEmailTemplate } from "../../../../emails/updated-translation-request";
import { errors, env } from '@strapi/utils';

const { ValidationError } = errors;

interface ExistingTranslationRequest {
  id: number,
  createdAt: string,
  updatedAt: string,
  language: string,
  status: string,
  article?: {
    id: number,
    title: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    locale: string,
    url?: string,
    excerpt: string,
  }
}

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    const existingTranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
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
    }) as ExistingTranslationRequest[];

    // @ts-ignore
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
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: New translation request has been created',
        html: createTranslationRequestEmailTemplate(
          {
            articleTitle: connectedArticle.title as string,
            language: result.language,
            createdByName: `${creatorFirstname} ${creatorLastname}`,
            link: `${env('URL')}admin/content-manager/collectionType/api::translation-request.translation-request/${result.id}`
          })
      })
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

  async beforeUpdate(event) {
    const { data } = event.params;

    const currentTranslationRequest = await strapi.entityService.findOne('api::translation-request.translation-request', data.id, {
      populate: ['article'],
    }) as ExistingTranslationRequest;

    console.log(currentTranslationRequest);

    const existingTranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
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
    }) as ExistingTranslationRequest[];

    console.log(existingTranslationRequests)

    // @ts-ignore
    if (existingTranslationRequests && existingTranslationRequests.length > 0) {
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

    // @ts-ignore
    const subscriberIds = translationRequestWithArticles.article.subscribers.map((subscriber) => subscriber.id);

    const subscribedAdministrators = await strapi.query("admin::user").findMany({
      where: {
        id: {
          $in: subscriberIds,
        },
      },
    });

    if (!result.updatedBy) return

    const updater = result.updatedBy;
    const updaterFirstname = updater.firstname;
    const updaterLastname = updater.lastname;

    for (let i = 0; i < subscribedAdministrators.length; i++) {
      const { email } = subscribedAdministrators[i];
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: Translation request has been updated',
        html: updatedTranslationRequestEmailTemplate(
          {
            // @ts-ignore
            articleTitle: translationRequestWithArticles.article.title,
            updatedByName: `${updaterFirstname} ${updaterLastname}`,
            link: `${env('URL')}admin/content-manager/collectionType/api::article.article/${event.result.id}`
          })
      })
    }
  }
};