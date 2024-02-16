import { createTranslationRequestEmailTemplate } from "../../../../emails/create-translation-request";
import { updatedTranslationRequestEmailTemplate } from "../../../../emails/updated-translation-request";
import { errors, env } from '@strapi/utils';

const { ValidationError } = errors;

interface TranslationRequest {
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

const sendEmails = async (
  recipients: string[],
  template: ({ articleTitle, name, language, link }: {
    articleTitle: string;
    name: string;
    language?: string,
    link: string;
  }) => string,
  title: string,
  article: {
    id: number;
    title: string;
  },
  translationRequest: TranslationRequest,
  creatorOrUpdater: {
    id: number;
    firstname: string;
    lastname?: string;
    email: string;
  }) => {
  const promises = recipients.map(async (recipient) => {
    await strapi.plugins['email'].services.email.send({
      to: recipient,
      from: env('RESEND_EMAIL'),
      replyTo: env('RESEND_EMAIL'),
      subject: title,
      html: template({
        articleTitle: article.title,
        language: translationRequest.language,
        name: `${creatorOrUpdater.firstname}`,
        link: `${env('URL')}admin/content-manager/collectionType/api::translation-request.translation-request/${article.id}`
      })
    });
  });
  await Promise.all(promises);
};


export default {
  async beforeCreate(event) {
    const { data } = event.params;

    const TranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
      populate: ['article'],
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
    }) as TranslationRequest[];

    if (TranslationRequests && TranslationRequests.length > 0) {
      throw new ValidationError('A translation request for this article in this language already exists.');
    }
  },

  async afterCreate(event) {
    const { result, params } = event;

    const connectedArticle = await strapi.entityService.findOne('api::article.article', params.data.article.connect[0].id, {
      populate: ["subscribers"]
    }) as any;

    if (!connectedArticle) {
      throw new ValidationError('Article not found');
    }

    const creator = result.createdBy;

    const emailAddresses = connectedArticle.subscribers.map((subscriber) => subscriber.email);

    await sendEmails(
      emailAddresses,
      createTranslationRequestEmailTemplate,
      'EM Guide: New translation request has been created',
      connectedArticle,
      result,
      creator
    );
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    console.log(data.article)

    const currentTranslationRequest = await strapi.entityService.findOne('api::translation-request.translation-request', data.id, {
      populate: ['article'],
    }) as TranslationRequest;

    if (currentTranslationRequest.language !== data.language) {
      const translationRequestsWithSameArticleAndLanguage = await strapi.entityService.findMany('api::translation-request.translation-request', {
        populate: ['article'],
        filters: {
          $and: [
            {
              language: data.language
            },
            {
              article: {
                id: currentTranslationRequest.article.id
              }
            },
          ],
        },
      }) as TranslationRequest[];

      if (translationRequestsWithSameArticleAndLanguage && translationRequestsWithSameArticleAndLanguage.length > 0) {
        throw new ValidationError('A translation request for this article in this language already exists.');
      }
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

    if (!result.updatedBy) return

    const updater = result.updatedBy;

    await sendEmails(
      emailAddresses,
      updatedTranslationRequestEmailTemplate,
      'EM Guide: Translation request has been updated',
      {
        id: Number(translationRequestWithArticles.article.id),
        title: translationRequestWithArticles.article.title
      },
      result,
      updater
    );
  }
};