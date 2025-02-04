import { createArticleEmailTemplate } from "../../../../emails/create-article";
import { createArticleShareEmailTemplate } from "../../../../emails/share-article";
// import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";
import { errors, env } from "@strapi/utils";
import { truncateText } from "../../../../emails/utils";

const { ValidationError } = errors;
interface Language {
  id: number,
  name: string,
  code: string
  createdAt: string,
  updatedAt: string,
}

const sendEmails = async (
  recipients: string[],
  template: ({
    articleTitle,
    name,
    language,
    link,
  }: {
    articleTitle: string;
    name: string;
    language?: Language;
    link: string;
    newUrlWithMagazine: {
      url: string;
      sharerMagazine: string;
      originName: string;
    };
    originName?: string
  }) => string,
  title: string,
  article: {
    id: number;
    title: string;
  },
  creatorOrUpdater: {
    id: number;
    firstname: string;
    email: string;
  },
  newUrlWithMagazine: {
    url: string;
    sharerMagazine: string;
    originName: string;
  },
  originName?: string
) => {
  const promises = recipients.map(async (recipient) => {
    await strapi.plugins["email"].services.email.send({
      to: recipient,
      from: env("SMTP_EMAIL"),
      replyTo: env("SMTP_EMAIL"),
      subject: env("ENVIRONMENT") === "development" ? `TEST ${title}` : title,
      html: template({
        articleTitle: article.title,
        name: `${creatorOrUpdater.firstname}`,
        link: `${env("URL")}admin/content-manager/collection-types/api::article.article/${article.id}`,
        newUrlWithMagazine: newUrlWithMagazine,
        originName: originName
      }),
    });
  });
  await Promise.all(promises);
};

export default {
  async beforeCreate(event) {
    console.log('beforeCreate')
    const { data } = event.params;

    const isWithoutOrigin = data.origin?.connect?.length === 0;

    if (isWithoutOrigin) throw new ValidationError('Origin is required to create an article');

    const ctx = strapi.requestContext.get();
    const newRawData = ctx.request.body;

    const hasUrlsWithoutMagazine = newRawData?.urls?.length > 0 && newRawData?.urls?.some(url => url.magazine.connect.length === 0);

    if (hasUrlsWithoutMagazine) throw new ValidationError('All shared urls need to have a magazine associated with them');

    const hasTranslationUrlsWithoutTranslationRequest = newRawData?.urls?.length > 0 && newRawData?.urls?.some(url => url.is_translation && url.translation_request.connect.length === 0);

    if (hasTranslationUrlsWithoutTranslationRequest) throw new ValidationError('All shared urls that are translations need to have a translation request associated with them');

    if (!data.subscribers) return
    data.subscribers.connect = [data.createdBy]
  },

  async beforeUpdate(event) {
    console.log('beforeUpdate')
    const { data, where } = event.params;
    const knex = strapi.db.connection;

    const hasTranslationUrlsWithoutTranslationRequestsAndIsNotAddingCurrently = async (urls: any[]) => {
      const promises = urls.map(async (url) => {
        const result = await knex.raw(`
          SELECT EXISTS (
              SELECT 1 
              FROM components_url_original_urls u
              LEFT JOIN components_url_original_urls_translation_request_links tr 
              ON u.id = tr.original_urls_id
              WHERE u.id = ? 
              AND u.is_translation = true 
              AND tr.translation_request_id IS NULL
          ) as exists_and_matches;
        `, [url.id]);

        const hasEmptyTranslationRequest = url.is_translation && url.translation_request.connect.length !== 1;
        return Number(result[0][0].exists_and_matches) === 1 && hasEmptyTranslationRequest;
      });

      const results = await Promise.all(promises);
      return results.some(result => result === true);
    };

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

    const numberOfCurrrentSharedUrls = article.urls?.length
    const numberOfUpdatedSharedUrls = data.urls?.length

    let administrators = []

    if (!article) return;

    const isUnpublishingArticle = article.publishedAt !== null && data.publishedAt === null;

    // * Guard clause to prevent adding or publishing an article without a language
    const isUpdatedWithLangugeRemoved = data.language?.disconnect?.length !== 0 && data.language?.connect?.length === 0;

    if (!isUnpublishingArticle && isUpdatedWithLangugeRemoved) throw new ValidationError('All articles need to have a language associated with them');

    // * Guard clause to prevent adding or publishing an article without an origin

    const isWithoutAndNotAddingOrigin = !article.origin && data.origin?.connect?.length === 0;
    const isUpdatedWithOriginRemoved = data.origin?.disconnect?.length !== 0 && data.origin?.connect?.length === 0;

    if (isWithoutAndNotAddingOrigin || isUpdatedWithOriginRemoved) throw new ValidationError('Origin is required for articles');

    const isDisconnectingUrlMagazineWithoutAddingNewOne = newRawData.urls?.some(url => url.magazine.disconnect?.length > 0 && url.magazine.connect?.length === 0);

    if (!isUnpublishingArticle && isDisconnectingUrlMagazineWithoutAddingNewOne) throw new ValidationError('All shared urls need to have a magazine associated with them');

    // * Guard clause to prevent adding or publishing an article with translation shared urls without a translation request

    const hasEmptyTranslationUrls = await hasTranslationUrlsWithoutTranslationRequestsAndIsNotAddingCurrently(newRawData.urls);

    const isDisconnectingTranslationUrlithoutAddingNewOne = newRawData.urls?.some(url => url.is_translation && url.translation_request.disconnect?.length > 0 && url.translation_request.connect?.length === 0);

    if (hasEmptyTranslationUrls || (!isUnpublishingArticle && isDisconnectingTranslationUrlithoutAddingNewOne)) throw new ValidationError('All shared urls that are translations need to have a translation request associated with them');

    // ! TODO hasUrlsWithoutMagazin should be implemented somehow...

    // const hasUrlsWithoutMagazine = newRawData?.urls?.length > 0 && newRawData?.urls?.some(url => url.magazine.connect.length === 0);

    // if (hasUrlsWithoutMagazine) throw new ValidationError('All shared urls need to have a magazine associated with them');

    // * Handle original language change fot translation requests
    if (data.language?.disconnect?.length === 1 && data.language?.connect?.length === 1) {
      const translationRequests = await strapi.entityService.findMany('api::translation-request.translation-request', {
        populate: ['article', 'original_language', 'language'],
        filters: {
          article: {
            id: {
              $eq: data.id
            }
          },
        },
      })

      //  @ts-expect-error
      if (translationRequests.length > 0) {
        //  @ts-expect-error
        for (let i = 0; i < translationRequests.length; i++) {
          const translationRequest = translationRequests[i]

          await knex.transaction(async (trx) => {
            await trx('translation_requests_original_language_links')
              .where('translation_request_id', '=', translationRequest.id)
              .del();
            await trx.raw(`
      INSERT INTO translation_requests_original_language_links (translation_request_id, language_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE language_id = VALUES(language_id)
    `, [translationRequest.id, data.language.connect[0].id]);
            const updatedRow = await trx('translation_requests_original_language_links')
              .where('translation_request_id', '=', translationRequest.id)
              .first();

            return updatedRow;
          });
        }
      }
    }

    // * If the article is not published
    if (!article.publishedAt && data.publishedAt) {
      // ! TODO when you try to update an article in draft that has shared urls without a magazine or you try to disconnect the magazine and save it
      const isNotUpdatingExistingOrigin = (article.origin && !data.origin) || (!(data.origin.disconnect.length === 0) && !newRawData.origin) || (article.origin && (data.origin && (data.origin.disconnect.length === 0)) && (data.origin && (data.origin.connect.length === 0)))

      // ! If origin is already added 

      const origin = await strapi.entityService.findOne('api::magazine.magazine', isNotUpdatingExistingOrigin ? article.origin.id : data.origin?.connect[0].id);



      administrators = await strapi.query("admin::user").findMany();

      const creator = administrators.find(
        (admin) => admin.id === data.updatedBy,
      );

      const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);

      await sendEmails(
        emailAddresses,
        createArticleEmailTemplate,
        `EM GUIDE: ${origin.name} has published a new article: ${article.title}`,
        {
          id: Number(article.id),
          title: article.title
        },
        creator,
        null,
        origin.name
      );

      // * If the article is published
    } else {
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

        const newUrlMagazine = await strapi.entityService.findOne('api::magazine.magazine', newRawData.urls[newRawData.urls.length - 1].magazine.connect[0].id);

        const newUrl = newRawData.urls[newRawData.urls.length - 1].url

        await sendEmails(
          subscribedAdminEmailAddresses,
          createArticleShareEmailTemplate,
          `EM GUIDE: ${newUrlMagazine.name} has just shared ${article.origin.name}'s article: ${truncateText({ text: article.title })}`,
          {
            id: newRawData.id,
            title: article.title,
          },
          data.updatedBy,
          {
            url: newUrl,
            sharerMagazine: newUrlMagazine.name,
            originName: article.origin.name
          }
        );
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
