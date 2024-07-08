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
    shareUrls?: string[];
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
  shareUrls?: string[],
  originName?: string
) => {
  const promises = recipients.map(async (recipient) => {
    await strapi.plugins["email"].services.email.send({
      to: recipient,
      from: env("SMTP_EMAIL"),
      replyTo: env("SMTP_EMAIL"),
      subject: title,
      html: template({
        articleTitle: article.title,
        name: `${creatorOrUpdater.firstname}`,
        link: `${env("URL")}admin/content-manager/collection-types/api::article.article/${article.id}`,
        shareUrls: shareUrls,
        originName: originName
      }),
    });
  });
  await Promise.all(promises);
};

const getNewArticleUrls = (newRawData: any): string[] => {
  return newRawData.urls.filter(url => !url.id && url.url !== undefined && url.url !== '').map(url => url.url);
};

export default {
  async beforeCreate(event) {
    console.log('beforeCreate')
    const { data } = event.params;

    const isWithoutOrigin = data.origin?.connect?.length === 0;

    if (isWithoutOrigin) throw new ValidationError('Origin is required to create an article');

    const ctx = strapi.requestContext.get();
    const newRawData = ctx.request.body;

    console.log(data.urls)
    console.log(newRawData.urls)

    const hasUrlsWithoutMagazine = newRawData?.urls?.length > 0 && newRawData?.urls?.some(url => url.magazine.connect.length === 0);

    if (hasUrlsWithoutMagazine) throw new ValidationError('All shared urls need to have a magazine associated with them');

    console.log(data)
    // subscribe the creator to the article by default
    console.log(!data.subscribers)
    console.log(data.subscribers)
    if (!data.subscribers) return
    data.subscribers.connect = [data.createdBy]
  },

  async beforeUpdate(event) {
    console.log('beforeUpdate')
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

    const numberOfCurrrentSharedUrls = article.urls?.length
    const numberOfUpdatedSharedUrls = data.urls?.length

    console.log({ article })

    console.log({ data })
    console.log({ newRawData })

    console.log({ dataUrls: data.urls })

    console.log({ newRawDataUurls: newRawData.urls })

    // return

    let administrators = []

    if (!article) return;

    // * Guard clause to prevent adding or publishing an article without an origin
    const isUnpublishingArticle = article.publishedAt !== null && data.publishedAt === null;

    console.log({ isUnpublishingArticle })

    const isWithoutAndNotAddingOrigin = !article.origin && data.origin?.connect?.length === 0;
    const isUpdatedWithOriginRemoved = data.origin?.disconnect?.length !== 0 && data.origin?.connect?.length === 0;

    console.log({
      isWithoutAndNotAddingOrigin,
      isUpdatedWithOriginRemoved
    })

    if (isWithoutAndNotAddingOrigin || isUpdatedWithOriginRemoved) throw new ValidationError('Origin is required for articles');

    const isDisconnectingUrlMagazineWithoutAddingNewOne = newRawData.urls?.some(url => url.magazine.disconnect?.length > 0 && url.magazine.connect?.length === 0);

    console.log({
      isDisconnectingUrlMagazineWithoutAddingNewOne
    })

    if (!isUnpublishingArticle && isDisconnectingUrlMagazineWithoutAddingNewOne) throw new ValidationError('All shared urls need to have a magazine associated with them');

    const hasUrlsWithoutMagazine = newRawData?.urls?.length > 0 && newRawData?.urls?.some(url => url.magazine.connect.length === 0);

    if (hasUrlsWithoutMagazine) throw new ValidationError('All shared urls need to have a magazine associated with them');

    // * If the article is not published
    if (!article.publishedAt) {
      // ! TODO when you try to update an article in draft that has shared urls without a magazine or you try to disconnect the magazine and save it
      const isNotUpdatingExistingOrigin = (article.origin && !data.origin) || (!(data.origin.disconnect.length === 0) && !newRawData.origin)

      console.log({ isNotUpdatingExistingOrigin })

      // console.log(article.origin)

      // console.log(data.origin)

      // console.log(newRawData.origin)

      // ! If origin is already added 

      const origin = await strapi.entityService.findOne('api::magazine.magazine', isNotUpdatingExistingOrigin ? article.origin.id : data.origin?.connect[0].id);

      administrators = await strapi.query("admin::user").findMany();

      // console.log(data)

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

        const newArticleUrls = getNewArticleUrls(newRawData);

        console.log(newRawData.urls)
        // console.log(data)

        await sendEmails(
          subscribedAdminEmailAddresses,
          createArticleShareEmailTemplate,
          `EM GUIDE: New share on ${truncateText({ text: article.title })}`,
          {
            id: newRawData.id,
            title: article.title,
          },
          data.updatedBy,
          newArticleUrls
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
