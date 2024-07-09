"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function summarizeArray(items) {
    const countsMap = new Map();
    items.forEach(item => {
        const key = `${item.name}-${item.id}`;
        const currentCount = countsMap.get(key) || 0;
        countsMap.set(key, currentCount + 1);
    });
    const summarizedItems = Array.from(countsMap.entries()).map(([key, count]) => {
        const [name, id] = key.split('-');
        return { name, id: parseInt(id, 10), count };
    });
    return summarizedItems;
}
function calculateAllShares(articles, magazines) {
    const sharesMap = new Map();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    magazines.forEach((magazine) => {
        var _a;
        sharesMap.set(magazine.id, {
            name: magazine.name,
            receivedSharesCount: 0,
            madeSharesCount: 0,
            receivedShares: [],
            madeShares: [],
            articlesSharedByOtherMagazinesCount: 0,
            articles: [],
            articlesByMonth: months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {})
        });
        (_a = magazine.articles) === null || _a === void 0 ? void 0 : _a.forEach((article) => {
            var _a;
            if (article.urls && ((_a = article.urls) === null || _a === void 0 ? void 0 : _a.length) > 0)
                sharesMap.get(magazine.id).articlesSharedByOtherMagazinesCount += 1;
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
        var _a;
        (_a = article.urls) === null || _a === void 0 ? void 0 : _a.forEach((url) => {
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
    return Array.from(sharesMap.entries());
}
exports.default = ({ strapi }) => ({
    async getArticlesPerMag() {
        var _a, _b;
        const magazines = await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany('api::magazine.magazine', {
            populate: {
                articles: {
                    populate: {
                        urls: {
                            populate: ['urls', 'magazine']
                        }
                    }
                }
            }
        }));
        const articles = await ((_b = strapi.entityService) === null || _b === void 0 ? void 0 : _b.findMany('api::article.article', {
            filters: {
                publishedAt: {
                    $notNull: true,
                }
            },
            populate: {
                origin: true,
                urls: {
                    populate: ['magazine, created_at']
                }
            }
        }));
        // @ts-expect-error
        const allShares = calculateAllShares(articles, magazines);
        return { articles, magazines, allShares };
    },
});
