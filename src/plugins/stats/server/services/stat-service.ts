import { Strapi } from "@strapi/strapi";
import { env, getAbsoluteServerUrl } from "@strapi/utils";
import type { Attribute, Shared } from "@strapi/strapi";

export type Article = Attribute.GetValues<'api::article.article'>;
interface summarizedSharesItem {
  sum: number;
  byMagazine: {
    id: number;
    name: string;
    count: number;
  }[];
}

function calculateTotalAndBreakdownByMagazine(magazines: any[]): Record<string, summarizedSharesItem> {
  const resultMap: Record<string, summarizedSharesItem> = {};

  magazines.forEach((targetMagazine: any) => {
    const targetMagazineName: string = targetMagazine.name;
    let sum = 0;
    const byMagazine: summarizedSharesItem['byMagazine'] = [];

    targetMagazine.articles?.forEach((article: any) => {

      article.urls?.forEach((url: any) => {
        const sourceMagazine = url.magazine;
        sum++;

        // console.log(url)


        const existingEntry = byMagazine.find(
          (entry: any) => entry.magazineId === sourceMagazine.id
        );

        if (existingEntry) {

          existingEntry.count++;
        } else {

          byMagazine.push({
            id: sourceMagazine.id,
            name: sourceMagazine.name,
            count: 1,
          });
        }
      });
    });

    resultMap[targetMagazineName] = {
      sum: sum,
      byMagazine: byMagazine,
    };
  });

  return resultMap;
}
interface ShareDetails {
  id: number;
  name: string;
}

interface MagazineShares {
  name: string;
  receivedSharesCount: number;
  madeSharesCount: number;
  articlesSharedByOtherMagazinesCount: number;
  receivedShares: ShareDetails[]; // Tracks the total number of share actions towards this magazine's articles
  madeShares: ShareDetails[]; // Tracks articles of other magazines shared by this magazine
}

interface SummaryItem {
  name: string;
  id: number;
  count: number;
}

function summarizeArray(items: { name: string; id: number }[]): SummaryItem[] {
  const countsMap = new Map<string, number>();

  items.forEach(item => {
    const key = `${item.name}-${item.id}`;
    const currentCount = countsMap.get(key) || 0;
    countsMap.set(key, currentCount + 1);
  });

  const summarizedItems: SummaryItem[] = Array.from(countsMap.entries()).map(([key, count]) => {
    const [name, id] = key.split('-');
    return { name, id: parseInt(id, 10), count };
  });

  return summarizedItems;
}
function calculateAllShares(articles: any[], magazines: any[]) {
  const sharesMap = new Map<number, MagazineShares>();

  magazines.forEach((magazine) => {
    sharesMap.set(magazine.id, {
      name: magazine.name,
      receivedSharesCount: 0,
      madeSharesCount: 0,
      receivedShares: [],
      madeShares: [],
      articlesSharedByOtherMagazinesCount: 0
    });

    magazine.articles?.forEach((article: any) => {
      if (article.urls && article.urls?.length > 0) sharesMap.get(magazine.id)!.articlesSharedByOtherMagazinesCount += 1;
    });
  });

  articles.forEach((article) => {
    article.urls?.forEach((url) => {
      const sharingMagazine = sharesMap.get(url.magazine.id);
      const sharedMagazine = sharesMap.get(article.origin.id);

      if (sharingMagazine) {
        sharingMagazine.madeSharesCount += 1;
        sharingMagazine.madeShares.push({
          name: article.origin.name,
          id: article.origin.id,
        });
        sharesMap.set(url.magazine.id, sharingMagazine);
      }

      if (sharedMagazine) {
        sharedMagazine.receivedSharesCount += 1;
        sharedMagazine.receivedShares.push({
          name: url.magazine.name,
          id: url.magazine.id,
        });
        sharesMap.set(article.origin.id, sharedMagazine);
      }
    });
  });

  sharesMap.forEach((value, key) => {
    const summarizedMadeShares = summarizeArray(value.madeShares);
    const summarizedReceivedShares = summarizeArray(value.receivedShares);
    const updatedValue = { ...value, madeShares: summarizedMadeShares, receivedShares: summarizedReceivedShares };

    sharesMap.set(key, updatedValue);
  });

  // console.log(sharesMap);

  return Array.from(sharesMap.entries());
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async getArticlesPerMag() {
    const magazines = await strapi.entityService?.findMany('api::magazine.magazine', {
      populate: {
        articles: {
          populate: {
            urls: {
              populate: ['urls', 'magazine']
            }
          }
        }
      }
    });

    const articles = await strapi.entityService?.findMany('api::article.article', {
      filters: {
        publishedAt: {
          $notNull: true,
        }
      },
      populate: {
        origin: true,
        urls: {
          populate: ['magazine']
        }
      }
    });


    // @ts-expect-error
    const shares = calculateTotalAndBreakdownByMagazine(magazines)
    // @ts-expect-error
    const allShares = calculateAllShares(articles, magazines);

    return { articles, magazines, shares, allShares }
  },
});