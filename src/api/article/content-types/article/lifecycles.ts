import { createArticleEmailTemplate } from "../../../../emails/create-article";
import { createArticleShareEmailTemplate } from "../../../../emails/share-article";
// import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";
import { env } from "@strapi/utils";
import { truncateText } from "../../../../emails/utils";

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
  shareUrls?: string[]
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
        shareUrls: shareUrls
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
    const { data } = event.params;

    // subscribe the creator to the article by default
    data.subscribers.connect = [data.createdBy]
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    const article = await strapi.entityService.findOne('api::article.article', where.id, {
      populate: {
        urls: true
      },
    });

    // Get raw data
    const ctx = strapi.requestContext.get();
    const newRawData = ctx.request.body;

    const numberOfCurrrentSharedUrls = article.urls.length
    const numberOfUpdatedSharedUrls = data.urls.length

    if (!article) return;

    if (!article.publishedAt) {

      const administrators = await strapi.query("admin::user").findMany();
      const creator = administrators.find(
        (admin) => admin.id === data.updatedBy,
      );
      const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);

      await sendEmails(
        emailAddresses,
        createArticleEmailTemplate,
        `EM GUIDE: ${creator.firstname} has created a new article: ${article.title}`,
        {
          id: Number(article.id),
          title: article.title
        },
        creator,
      );

    }

    if (numberOfUpdatedSharedUrls > numberOfCurrrentSharedUrls) {
      const administrators = await strapi.query("admin::user").findMany();
      const creator = administrators.find(
        (admin) => admin.id === data.updatedBy,
      );
      const emailAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);

      const newArticleUrls = getNewArticleUrls(newRawData);

      await sendEmails(
        emailAddresses,
        createArticleShareEmailTemplate,
        `EM GUIDE: New share on ${truncateText({ text: article.title })}`,
        {
          id: newRawData.id,
          title: article.title,
        },
        creator,
        newArticleUrls
      );
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
