import { createTranslationRequestEmailTemplate } from "../../../../emails/create-translation-request";
import { errors, env } from '@strapi/utils';

const { ValidationError } = errors;

export default {
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
    const { result, params  } = event;

    const administrators = await strapi.query("admin::user").findMany();
    const emailsAddresses = administrators.map((admin) => admin.email);
    const creator = administrators.find((admin) => admin.id === result.createdBy.id);
    const { firstname, lastname } = creator;

    const connectedArticle = await strapi.entityService.findOne('api::article.article', params.data.article.connect[0].id);

    if (!connectedArticle) {
      throw new ValidationError('Article not found');
    }

    for (let i = 0; i < emailsAddresses.length; i++) {
      const emailAddress = emailsAddresses[i];
      await strapi.plugins['email'].services.email.send({
        to: emailAddress,
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: New translation request has been created',
        html: createTranslationRequestEmailTemplate(
          {
            articleTitle: connectedArticle.title as string,
            createdByName: `${firstname} ${lastname}`,
            language: result.language,
            // TODO make this less hardcoded
            link: `${env('URL')}admin/content-manager/collectionType/api::translation-request.translation-request/${result.id}`
          })
      })
    }
  },

};