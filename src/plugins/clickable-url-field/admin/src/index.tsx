import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import { Link } from '@strapi/icons';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "clickable-url",
      pluginId: "clickable-url-field",
      type: "string",
      intlLabel: {
        id: "clickable-url-field.color.label",
        defaultMessage: "Clickable Url",
      },
      intlDescription: {
        id: "clickable-url-field.color.description",
        defaultMessage: "Enter a valid url",
      },
      icon: Link,
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Input"
          ),
      },
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
