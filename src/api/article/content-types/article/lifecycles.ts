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
        link: `${env("URL")}admin/content-manager/collectionType/api::article.article/${article.id}`,
      }),
    });
  });
  await Promise.all(promises);
};

export default {
  async afterCreate(event) {
    const { result } = event;
    const administrators = await strapi.query("admin::user").findMany();
    const creator = administrators.find(
      (admin) => admin.id === result.createdBy.id,
    );
    const emailsAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);

    await sendEmails(
      emailsAddresses,
      createArticleEmailTemplate,
      "EM Guide: New article has been created",
      result,
      creator,
    );
  },

  async beforeUpdate(event) {
    // console.log(event);
    // const article = await strapi.query("api::article.article").findOne({
    //   where: {
    //     id: event.params.where.id
    //   },
    //   populate: ["deep"]
    // });
    // console.log(article.publishedAt)

    // if (article && !article.publishedAt) {
    //   console.log('TRIGGERED')

    //   const administrators = await strapi.query("admin::user").findMany();
    //   const creator = administrators.find(
    //     (admin) => admin.id === event.params.data.updatedBy.id,
    //   );
    //   const emailsAddresses = administrators.filter(admin => admin.id !== creator.id).map(admin => admin.email);

    //   await sendEmails(
    //     emailsAddresses,
    //     createArticleEmailTemplate,
    //     "EM Guide: New article has been created",
    //     {
    //       id: article.id,
    //       title: article.title
    //     },
    //     creator,
    //   );
    }

    // const article = (await strapi.entityService.findOne(
    //   "api::article.article",
    //   event.params.id
    // )) as any;
    // const newsUpdated = { ...news, ...data };

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
  //     'EM Guide: Article has been updated',
  //     result,
  //     updater
  //   );
  // }
};
