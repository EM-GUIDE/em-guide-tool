import { createArticleEmailTemplate } from "../../../../emails/create-article";

export default {
  async afterCreate(event) {    
    const { result } = event;
    const administrators = await strapi.query("admin::user").findMany();
    const emailsAddresses = administrators.map((admin) => admin.email);
    const creator = administrators.find((admin) => admin.id === 1);
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
            link: `http://localhost:1337/admin/content-manager/collectionType/api::article.article/${result.id}` })
      })
    }
  }
};