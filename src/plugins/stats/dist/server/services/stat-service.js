"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function summarizeArray(items) {
    const countsMap = new Map();
    items.forEach((item) => {
        const key = `${item.name}-${item.id}`;
        const currentCount = countsMap.get(key) || 0;
        countsMap.set(key, currentCount + 1);
    });
    const summarizedItems = Array.from(countsMap.entries()).map(([key, count]) => {
        const [name, id] = key.split("-");
        return { name, id: parseInt(id, 10), count };
    });
    return summarizedItems;
}
function calculateAllShares(articles, magazines, translationRequests) {
    const sharesMap = new Map();
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
    function getAbbreviatedMonth(monthIndex) {
        return months[monthIndex];
    }
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
            articlesByMonth: months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {}),
            receivedSharesByMonth: months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {}),
            madeSharesByMonth: months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {}),
            translatedArticlesCount: 0,
            translatedArticlesByMonth: months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {}),
        });
        translationRequests.forEach((translationRequest) => {
            var _a;
            if (((_a = translationRequest.translated_by) === null || _a === void 0 ? void 0 : _a.id) === magazine.id) {
                const magazineStats = sharesMap.get(magazine.id);
                if (magazineStats) {
                    magazineStats.translatedArticlesCount += 1;
                    const currentDate = new Date(translationRequest.createdAt);
                    const monthIndex = currentDate.getMonth();
                    const abbreviatedMonth = getAbbreviatedMonth(monthIndex);
                    magazineStats.translatedArticlesByMonth[abbreviatedMonth] += 1;
                    sharesMap.set(magazine.id, magazineStats);
                }
            }
        });
        (_a = magazine.articles) === null || _a === void 0 ? void 0 : _a.forEach((article) => {
            var _a;
            if (article.urls && ((_a = article.urls) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                sharesMap.get(magazine.id).articlesSharedByOtherMagazinesCount += 1;
                // article.urls.forEach((url: ArticleUrl) => {
                //   if (url.is_translation === true) sharesMap.get(magazine.id)!.translatedArticlesCount += 1;
                // });
            }
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
                // if (url.is_translation === true) {
                //   sharedMagazine.translatedArticlesCount += 1;
                //   sharedMagazine.translatedArticlesByMonth[abbreviatedMonth] += 1;
                // }
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
function calculateLanguages(translationRequests) {
    const fromLanguages = new Map();
    const toLanguages = new Map();
    translationRequests.forEach((translationRequest) => {
        var _a, _b;
        // @ts-expect-error
        if ((_a = translationRequest === null || translationRequest === void 0 ? void 0 : translationRequest.original_language) === null || _a === void 0 ? void 0 : _a.code)
            fromLanguages.set(translationRequest.original_language.code, (fromLanguages.get(translationRequest.original_language.code) || 0) + 1);
        // @ts-expect-error
        if ((_b = translationRequest === null || translationRequest === void 0 ? void 0 : translationRequest.language) === null || _b === void 0 ? void 0 : _b.code)
            toLanguages.set(translationRequest.language.code, (fromLanguages.get(translationRequest.language.code) || 0) + 1);
    });
    return {
        from: fromLanguages,
        to: toLanguages
    };
}
exports.default = ({ strapi }) => ({
    async getArticlesPerMag() {
        var _a, _b, _c, _d;
        const magazines = await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("api::magazine.magazine", {
            populate: {
                articles: {
                    populate: {
                        urls: {
                            populate: ["urls", "magazine"],
                        },
                    },
                }
            },
        }));
        const articles = await ((_b = strapi.entityService) === null || _b === void 0 ? void 0 : _b.findMany("api::article.article", {
            populate: {
                language: true,
                origin: true,
                urls: {
                    populate: {
                        magazine: true,
                        created_at: true,
                        is_translation: true,
                        translation_request: {
                            populate: {
                                language: true
                            }
                        }
                    }
                },
            },
        }));
        const translationRequests = await ((_c = strapi.entityService) === null || _c === void 0 ? void 0 : _c.findMany("api::translation-request.translation-request", {
            populate: {
                original_language: true,
                language: true,
                status: true,
                translated_by: true,
                article: {
                    populate: {
                        language: true,
                        origin: true,
                        urls: {
                            populate: {
                                magazine: true,
                                created_at: true,
                                is_translation: true,
                                translation_request: {
                                    populate: {
                                        language: true
                                    }
                                }
                            }
                        },
                    },
                },
                created_at: true
            },
        }));
        const languages = await ((_d = strapi.entityService) === null || _d === void 0 ? void 0 : _d.findMany("api::language.language"));
        // @ts-expect-error
        const translationCounts = calculateLanguages(translationRequests);
        // @ts-expect-error
        const allShares = calculateAllShares(articles, magazines, translationRequests);
        const translations = {
            from: languages === null || languages === void 0 ? void 0 : languages.map((language) => ({
                name: language.name,
                code: language.code,
                count: translationCounts.from.get(language.code) || 0,
            })),
            to: languages === null || languages === void 0 ? void 0 : languages.map((language) => ({
                name: language.name,
                code: language.code,
                count: translationCounts.to.get(language.code) || 0,
            })),
            translationRequests
        };
        return { articles, magazines, allShares, translations };
    },
});
