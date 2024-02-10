import { Strapi } from "@strapi/strapi";
import { env } from "@strapi/utils";
import { commentAddedEmailTemplate } from "../emails/comment-added";

interface Article {
  id: number;
  title: string;
  subscribers: any[]
}

const sendEmails = async (
  recipients: string[],
  template: ({ articleTitle, name, link }: {
    articleTitle: string;
    name: string;
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
    lastname: string;
    email: string;
  }) => {
  const promises = recipients.map(async (recipient) => {
    await strapi.plugins['email'].services.email.send({
      to: recipient,
      from: 'hello@freizeit.hu',
      replyTo: 'hello@freizeit.hu',
      subject: title,
      html: template({
        articleTitle: article.title,
        name: `${creatorOrUpdater.firstname} ${creatorOrUpdater.lastname}`,
        link: `${env('URL')}admin/content-manager/collectionType/api::article.article/${article.id}`
      })
    });
  });
  await Promise.all(promises);
};

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(query) {
    strapi
    return await strapi.entityService?.findMany('plugin::admin-comments.comment', query);
  },
  async create(request) {
    const commenterId = request.data.admin_user.connect[0]

    const article = await strapi.entityService?.findOne("api::article.article", request.data.entityId, {
      populate: ["subscribers"],
    }) as Article

    const subscriberIds: number[] = article?.subscribers.map((subscriber) => subscriber.id);

    const administrators = await strapi.query("admin::user").findMany();

    const commenter = administrators.find((admin) => admin.id === commenterId);

    const subscribedAdministrators = administrators.filter((admin) => subscriberIds.includes(admin.id));

    const emailAddresses = subscribedAdministrators.map((admin) => admin.email);

    if (!article) {
      throw new Error('Article not found');
    }

    await sendEmails(
      emailAddresses,
      commentAddedEmailTemplate,
      'EM Guide: Comment added',
      article,
      commenter
    );

    return await strapi.entityService?.create('plugin::admin-comments.comment', request);
  }
});
