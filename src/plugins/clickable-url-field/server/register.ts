import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "clickable-url",
    plugin: "clickable-url-field",
    type: "string",
    inputSize: {
      default: 12,
      isResizable: true,
    },
  });
}; 
