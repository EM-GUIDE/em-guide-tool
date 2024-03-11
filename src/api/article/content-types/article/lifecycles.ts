import { createArticleEmailTemplate } from "../../../../emails/create-article";
// import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";
import { env } from "@strapi/utils";

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
      }),
    });
  });
  await Promise.all(promises);
};

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    // subscribe the creator to the article by default
    data.subscribers.connect = [data.createdBy]
  },

  async beforeUpdate(event) {
    const { data, where, select, populate } = event.params;

    const article = await strapi.query("api::article.article").findOne({
      where: {
        id: where.id
      },
      populate: ["deep"]
    });

    if (article && !article.publishedAt) {

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
          id: article.id,
          title: article.title
        },
        creator,
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
