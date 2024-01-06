import { createArticleEmailTemplate } from "../../../../emails/create-article";
import { updatedArticleEmailTemplate } from "../../../../emails/updated-article";

export default {
  async afterCreate(event) {
    const { result } = event;
    const administrators = await strapi.query("admin::user").findMany();
    const emailsAddresses = administrators.map((admin) => admin.email);
    const creator = administrators.find((admin) => admin.id === result.createdBy.id);
    const { firstname, lastname } = creator;

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
            createdByName: `${firstname} ${lastname}`,
            // TODO make this less hardcoded
            link: `http://localhost:1337/admin/content-manager/collectionType/api::article.article/${result.id}`
          })
      })
    }
  },

  async afterUpdate(event) {
    const { where } = event.params;
    const id = where.id;

    const article = await strapi.entityService.findOne("api::article.article", id, {
      populate: ["subscribers"],
    })

    // @ts-ignore
    const subscriberIds = article.subscribers.map((subscriber) => subscriber.id);

    console.log(subscriberIds)

    const subscribedAdministrators = await strapi.query("admin::user").findMany({
      where: {
        id: {
          $in: subscriberIds,
        },
      },
    });

    if(!event.result.updatedBy) return

    const { firstname, lastname } = event.result.updatedBy;

    console.log(`${firstname} ${lastname}`)

    for (let i = 0; i < subscribedAdministrators.length; i++) {
      const { firstname, lastname, email } = subscribedAdministrators[i];
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: Article has been updated',
        html: updatedArticleEmailTemplate(
          {
            articleTitle: event.result.title,
            createdByName: `${firstname} ${lastname}`,
            // TODO make this less hardcoded
            link: `http://localhost:1337/admin/content-manager/collectionType/api::article.article/${event.result.id}`
          })
      })
    }
  }

};