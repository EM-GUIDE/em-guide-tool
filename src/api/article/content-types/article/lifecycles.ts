import { createArticleEmailTemplate } from "../../../../emails/create-article";

export default {
  async afterCreate(event) {    
    const { data } = event.params;
    const administrators = await strapi.query("admin::user").findMany({
      populate: true
    });
    const emailsAddresses = administrators.map((admin) => admin.email);

    for (let i = 0; i < emailsAddresses.length; i++) {
      const emailAddress = emailsAddresses[i];
      await strapi.plugins['email'].services.email.send({
        to: emailAddress,
        from: 'hello@freizeit.hu', //e.g. single sender verification in SendGrid
        replyTo: 'hello@freizeit.hu',
        subject: 'EM Guide: New article has been created',
        text: `Card ${data.title} has been created.}`,
        html: createArticleEmailTemplate(
          {
            articleTitle: data.title,
            createdByName: "Pista Jóska",
            // TODO make this less hardcoded
            link: `http://localhost:1337/admin/content-manager/collectionType/api::article.article/${data.id}` })
      })
    }
  },
};