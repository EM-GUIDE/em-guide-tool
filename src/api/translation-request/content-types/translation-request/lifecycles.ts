import { createArticleEmailTemplate } from "../../../../emails/create-article";
import { errors } from '@strapi/utils';

const { ValidationError } = errors;

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    const existingTranslationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
      populate: {
        article: {
          fields: ['id'],
      } },
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

    // @ts-expect-error TODO: fix this type error
    if (existingTranslationRequests && existingTranslationRequests.length > 0) {
      throw new ValidationError('A translation request for this article in this language already exists.');
    }
  },

  async afterCreate(event) {    
    const { data } = event.params;
    console.log(data)
  },
};