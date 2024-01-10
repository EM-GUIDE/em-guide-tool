import { createArticleEmailTemplate } from "../../../../emails/create-article";
import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";
import { env } from '@strapi/utils';

export default {
  async afterCreate(event) {
    const { result } = event;
    const administrators = await strapi.query("admin::user").findMany();
    const emailsAddresses = administrators.map((admin) => admin.email);
    const creator = administrators.find((admin) => admin.id === result.createdBy.id);
    const creatorFirstname = creator.firstname;
    const creatorLastname = creator.lastname;

    for (let i = 0; i < emailsAddresses.length; i++) {
      const emailAddress = emailsAddresses[i];
      await strapi.plugins['email'].services.email.send({
        to: emailAddress,
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: New article has been created',
        html: createArticleEmailTemplate(
          {
            articleTitle: result.title,
            createdByName: `${creatorFirstname} ${creatorLastname}`,
            link: `${env('URL')}admin/content-manager/collectionType/api::article.article/${result.id}`
          })
      })
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    const { where } = event.params;
    const id = where.id;

    const article = await strapi.entityService.findOne("api::article.article", id, {
      populate: ["subscribers"],
    })

    // @ts-ignore
    const subscriberIds = article.subscribers.map((subscriber) => subscriber.id);

    const subscribedAdministrators = await strapi.query("admin::user").findMany({
      where: {
        id: {
          $in: subscriberIds,
        },
      },
    });

    if(!result.updatedBy) return

    const updater = result.updatedBy;
    const updaterFirstname = updater.firstname;
    const updaterLastname = updater.lastname;

    for (let i = 0; i < subscribedAdministrators.length; i++) {
      const { email } = subscribedAdministrators[i];
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: Article has been updated',
        html: updatedArticleEmailTemplate(
          {
            articleTitle: event.result.title,
            updatedByName: `${updaterFirstname} ${updaterLastname}`,
            link: `${env('URL')}admin/content-manager/collectionType/api::article.article/${event.result.id}`
          })
      })
    }
  }

};