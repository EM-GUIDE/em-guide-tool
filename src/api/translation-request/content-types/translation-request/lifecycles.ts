import { createTranslationRequestEmailTemplate } from "../../../../emails/create-translation-request";
import { updatedTranslationRequestEmailTemplate } from "../../../../emails/updated-translation-request";
import { errors, env } from '@strapi/utils';

const { ValidationError } = errors;

interface Language {
  id: number,
  name: string,
  code: string
  createdAt: string,
  updatedAt: string,
}

interface TranslationRequest {
  id: number,
  createdAt: string,
  updatedAt: string,
  language: Language,
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
  template: ({ articleTitle, name, language, link, shareUrls }: {
    articleTitle: string;
    name: string;
    language?: string,
    link: string;
    shareUrls?: string[];
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
  }
) => {
  const promises = recipients.map(async (recipient) => {
    await strapi.plugins['email'].services.email.send({
      to: recipient,
      from: env('SMTP_EMAIL'),
      replyTo: env('SMTP_EMAIL'),
      subject: env("ENVIRONMENT") === "development" ?  `TEST ${title}` : title,
      html: template({
        articleTitle: article.title,
        language: translationRequest.language.name,
        name: `${creatorOrUpdater.firstname}`,
        link: `${env('URL')}admin/content-manager/collection-types/api::translation-request.translation-request/${translationRequest.id}`
      })
    });
  });
  await Promise.all(promises);

  console.log('Emails sent');
};


export default {
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
    }) as TranslationRequest[];

    if (translationRequests && translationRequests.length > 0) {
      throw new ValidationError('A translation request for this article in this language already exists.');
    }
  },

  async afterCreate(event) {
    const { result, params } = event;

    const connectedArticle = await strapi.entityService.findOne('api::article.article', params.data.article.connect[0].id, {
      populate: ["subscribers", "language"]
    }) as any;

    if (!connectedArticle) {
      throw new ValidationError('Article not found');
    }

    const creator = result.createdBy;

    const emailAddresses = connectedArticle.subscribers.filter((subscriber) => subscriber.id !== creator.id).map(subscriber => subscriber.email);

    await sendEmails(
      emailAddresses,
      createTranslationRequestEmailTemplate,
      `EM GUIDE: Translation request has been created for ${connectedArticle.title} by ${creator.firstname}`,
      connectedArticle,
      result,
      creator
    );
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    const currentTranslationRequest = await strapi.entityService.findOne('api::translation-request.translation-request', data.id, {
      populate: ['article', 'language'],
    }) as TranslationRequest;

    if ((data?.language?.disconnect.length > 0 && data?.language?.connect.length === 0) || (data?.article?.disconnect.length > 0 && data?.article?.connect.length === 0)) throw new ValidationError('An article and a language is required for translation requests');

    const isLanguageUpdated = (data?.language?.connect[0]?.id !== currentTranslationRequest?.language?.id) && !(data?.language?.connect.length === 0 && data?.language?.disconnect.length === 0);

    const isArticleUpdated = (data?.article?.connect[0]?.id !== currentTranslationRequest?.article?.id) && !(data?.article?.connect?.length === 0 && data?.article?.disconnect?.length === 0);

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
        language: {
          fields: ['name', 'code']
        },
        article: {
          populate: ['subscribers']
        }
      }
    });


    if (!result.updatedBy) return

    const updater = result.updatedBy;

    const emailAddresses = translationRequestWithArticles.article.subscribers.filter((subscriber) => subscriber.id !== updater.id).map(subscriber => subscriber.email);

    await sendEmails(
      emailAddresses,
      updatedTranslationRequestEmailTemplate,
      `EM GUIDE: Translation request for ${translationRequestWithArticles.article.title} has been updated`,
      {
        id: Number(translationRequestWithArticles.article.id),
        title: translationRequestWithArticles.article.title
      },
      // @ts-expect-error
      translationRequestWithArticles,
      updater
    );
  }
};