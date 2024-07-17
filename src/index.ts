import { Strapi } from "@strapi/strapi";
import magazine from "./api/magazine/controllers/magazine";
import { parseISO, format } from "date-fns";

type MagazineMapItem = {
  urlPattern: string;
  magazineName: Magazine;
};

interface Magazine {
  id: number;
  name: string;
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const urlToMagazineMap: Map<string, Magazine> = new Map();

    function getDomain(url: string): string | null {
      const match = url.match(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/
      );
      return match ? match[1] : null;
    }

    async function findMagazineIdByUrl(
      url: string
    ): Promise<Magazine | undefined> {
      const domain = getDomain(url);
      if (!domain) {
        console.error("Invalid URL format");
        return undefined;
      }

      // Check if we have a mapping for this domain
      const matchedMagazine = urlToMagazineMap.get(domain);
      if (!matchedMagazine) {
        console.warn(`No magazine name found for domain ${domain}`);
        return undefined;
      }

      return matchedMagazine;
    }

    const allMagazines = await strapi.entityService?.findMany(
      "api::magazine.magazine"
    );

    const hardcodedMappings = [
      { domain: "noies.nrw", name: "ON" },
      { domain: "strumandiodine.com", name: "S+I" },
      { domain: "34.sk", name: "3/4" },
      { domain: "easterndaze.net", name: "ED" },
      { domain: "kaput-mag.com", name: "Kaput" },
      { domain: "mmn-mag.hu", name: "MMN Mag" },
    ];

    allMagazines.forEach((magazine) => {
      const matchingMapping = hardcodedMappings.find(
        (mapping) => mapping.name === magazine.name
      );
      if (matchingMapping) {
        const magazineId = magazine.id;
        urlToMagazineMap.set(matchingMapping.domain, {
          id: magazineId,
          name: matchingMapping.name,
        });
      }

      console.log("Created url magazine map item for " + matchingMapping.name);
    });

    const articles = await strapi.entityService?.findMany(
      "api::article.article",
      {
        populate: {
          origin: true,
          urls: {
            populate: ["magazine"],
          },
        },
      }
    );

    for (let i = 0; i < articles.length; i++) {
      if (
        articles[i].urls &&
        articles[i].urls.length > 0 &&
        articles[i].urls.some((url) => !url.date)
      ) {
        console.log("Fixing missing shared url dates");

        for (let k = 0; k < articles[i].urls.length; k++) {
          const date = articles[i].urls[k].date;
          if (!date && articles[i].publishedAt) {
            const generatedDateFromPublishedAt = format(
              parseISO(articles[i].publishedAt),
              "yyyy-MM-dd"
            );

            console.log(
              `Adding date ${generatedDateFromPublishedAt} to article ${articles[i].title} url id ${articles[i].urls[k].id}`
            );

            await strapi.db
              .connection("components_url_original_urls")
              .where({ id: articles[i].urls[k].id })
              .update({
                date: generatedDateFromPublishedAt,
              });
          }
        }
      }

      if (
        articles[i].urls &&
        articles[i].urls.length > 0 &&
        articles[i].urls.some((url) => !url.magazine)
      ) {
        console.log("Fixing missing shared url magazines");

        for (let k = 0; k < articles[i].urls.length; k++) {
          if (!articles[i].urls[k].magazine) {
            const url = articles[i].urls[k].url;

            console.log(articles[i].urls[k]);

            if (!url) {
              console.log(
                "No url found for article: " +
                  articles[i].name +
                  " id: " +
                  articles[i].urls[k].id
              );
              return;
            }
            const matchedMagazine = await findMagazineIdByUrl(url);
            if (matchedMagazine) {
              console.log(
                `Found magazine ${matchedMagazine.name} for url ${url}`
              );
              // articles[i].urls[k].magazine = { name: magazineName };
              await strapi.db
                .connection("components_url_original_urls_magazine_links")
                .insert({
                  original_urls_id: articles[i].urls[k].id,
                  magazine_id: matchedMagazine.id,
                });
            }
          }
        }
      }
    }
    
  },

};
