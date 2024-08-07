import { Strapi } from "@strapi/strapi";
import type { Attribute } from "@strapi/strapi";

export type Article = Attribute.GetValues<"api::article.article">;
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
  receivedSharesByMonth: Record<string, number>; // Tracks received shares by date
  madeShares: ShareDetails[]; // Tracks articles of other magazines shared by this magazine
  madeSharesByMonth: Record<string, number>; // Tracks made shares by date
  articles: Article[];
  articlesByMonth: Record<string, number>;
}

interface SummaryItem {
  name: string;
  id: number;
  count: number;
}

interface ArticleUrl {
  id: number;
  url: string;
  magazine: ShareDetails;
  date: string; // yyyy-MM-dd format
}

function summarizeArray(items: { name: string; id: number }[]): SummaryItem[] {
  const countsMap = new Map<string, number>();

  items.forEach((item) => {
    const key = `${item.name}-${item.id}`;
    const currentCount = countsMap.get(key) || 0;
    countsMap.set(key, currentCount + 1);
  });

  const summarizedItems: SummaryItem[] = Array.from(countsMap.entries()).map(
    ([key, count]) => {
      const [name, id] = key.split("-");
      return { name, id: parseInt(id, 10), count };
    }
  );

  return summarizedItems;
}
function calculateAllShares(articles: any[], magazines: any[]) {
  const sharesMap = new Map<number, MagazineShares>();

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  function getAbbreviatedMonth(monthIndex: number): string {
    return months[monthIndex];
  }

  magazines.forEach((magazine) => {
    sharesMap.set(magazine.id, {
      name: magazine.name,
      receivedSharesCount: 0,
      madeSharesCount: 0,
      receivedShares: [],
      madeShares: [],
      articlesSharedByOtherMagazinesCount: 0,
      articles: [],
      articlesByMonth: months.reduce(
        (acc, month) => ({ ...acc, [month]: 0 }),
        {}
      ),
      receivedSharesByMonth: months.reduce(
        (acc, month) => ({ ...acc, [month]: 0 }),
        {}
      ),
      madeSharesByMonth: months.reduce(
        (acc, month) => ({ ...acc, [month]: 0 }),
        {}
      )
    });

    magazine.articles?.forEach((article: any) => {
      
      if (article.urls && article.urls?.length > 0)
        sharesMap.get(magazine.id)!.articlesSharedByOtherMagazinesCount += 1;
      
      const monthIndex = new Date(article.publishedAt).getMonth();
      const monthName = months[monthIndex];
      const magazineEntry = sharesMap.get(magazine.id);
      if (magazineEntry) {
        magazineEntry.articles.push(article);
        if (monthName) {
          magazineEntry.articlesByMonth[monthName]++;
        }
      }
    });
  });

  articles.forEach((article) => {
    article.urls?.forEach((url: ArticleUrl) => {
      const sharingMagazine = sharesMap.get(url.magazine.id);
      const sharedMagazine = sharesMap.get(article.origin.id);

      if (sharingMagazine) {
        const currentDate = new Date(url.date);
        const monthIndex = currentDate.getMonth(); // Get the month index (0-based)
        const abbreviatedMonth = getAbbreviatedMonth(monthIndex); // Convert to abbreviated month name

        sharingMagazine.madeSharesCount += 1;
        sharingMagazine.madeShares.push({
          name: article.origin.name,
          id: article.origin.id,
        });

        sharingMagazine.madeSharesByMonth[abbreviatedMonth] += 1;

        sharesMap.set(url.magazine.id, sharingMagazine);
      }

      if (sharedMagazine) {
        const currentDate = new Date(url.date);
        const monthIndex = currentDate.getMonth(); // Get the month index (0-based)
        const abbreviatedMonth = getAbbreviatedMonth(monthIndex); // Convert to abbreviated month name

        sharedMagazine.receivedSharesCount += 1;
        sharedMagazine.receivedShares.push({
          name: url.magazine.name,
          id: url.magazine.id,
        });

        sharedMagazine.receivedSharesByMonth[abbreviatedMonth] += 1;

        sharesMap.set(article.origin.id, sharedMagazine);
      }
    });
  });

  sharesMap.forEach((value, key) => {
    const summarizedMadeShares = summarizeArray(value.madeShares);
    const summarizedReceivedShares = summarizeArray(value.receivedShares);
    const updatedValue = {
      ...value,
      madeShares: summarizedMadeShares,
      receivedShares: summarizedReceivedShares,
    };

    sharesMap.set(key, updatedValue);
  });

  return Array.from(sharesMap.entries());
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async getArticlesPerMag() {
    const magazines = await strapi.entityService?.findMany(
      "api::magazine.magazine",
      {
        populate: {
          articles: {
            populate: {
              urls: {
                populate: ["urls", "magazine"],
              },
            },
          },
        },
      }
    );

    const articles = await strapi.entityService?.findMany(
      "api::article.article",
      {
        populate: {
          origin: true,
          urls: {
            populate: ["magazine, created_at"],
          },
        },
      }
    );
    // @ts-expect-error
    const allShares = calculateAllShares(articles, magazines);

    return { articles, magazines, allShares };
  },
});
