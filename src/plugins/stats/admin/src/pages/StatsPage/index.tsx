import React, { useEffect, useState } from "react";
import pluginId from "../../pluginId";
import { getFetchClient } from "@strapi/helper-plugin";

import {
  BaseHeaderLayout,
  Box,
  Button,
  ContentLayout,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link,
  Loader,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Typography,
} from "@strapi/design-system";

import { TableDescription } from "../../components/TableDescription";

import useSWR from "swr";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { ArrowLeft } from "@strapi/icons";

import { Parser } from "@json2csv/plainjs";

interface summarizedSharesMagazine {
  id: number;
  name: string;
  count: number;
}

ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const StatsPage = () => {
  const { get } = getFetchClient();

  const { data, error, isLoading } = useSWR(`/${pluginId}/data`, get);

  const arrayToMap = (array: [number, any][]): Map<number, any> => {
    const deserializedMap = new Map<number, any>();
    array.forEach(([key, value]) => {
      deserializedMap.set(key, value);
    });
    return deserializedMap;
  };

  const queryData = data?.data;

  let decodedAllShares;

  if (queryData?.allShares) {
    decodedAllShares = arrayToMap(queryData?.allShares);
  }

  const getCsvFileNameTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  };

  const exportOverallCsv = async () => {
    const dataTransform = {
      totalArtilesCount: queryData?.articles.filter(
        (article: any) => article.publishedAt !== null
      ).length,
      totalSharesCount: queryData?.articles.reduce(
        (acc: any, article: any) => acc + (article.urls?.length ?? 0),
        0
      ),
    };

    try {
      const opts = {
        fields: [
          {
            label:
              "EM GUIDE's total number of original articles (drafts excl.)",
            value: "totalArtilesCount",
          },
          {
            label: `EM GUIDE's total number of shared articles (drafts incl.)`,
            value: "totalSharesCount",
          },
        ],
      };

      const parser = new Parser(opts);
      const csv = parser.parse(dataTransform);

      const filename = `em-tool_statistics_${getCsvFileNameTimestamp()}.csv`;

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const exportPerMagazineCsv = async () => {
    const dataTransform = queryData?.allShares.map((item: any) => {
      return {
        name: item[1].name,
        totalNumberOfArticles: item[1].articles.filter(
          (article: any) => article.publishedAt !== null
        ).length,
        articlesByMonth: item[1].articlesByMonth,
        madeSharesCount: item[1].madeSharesCount,
        madeSharesByMonth: item[1].madeSharesByMonth,
        madeShares: item[1].madeShares.map(
          (subItem: { name: string; id: number; count: number }) => {
            return { name: subItem.name, count: subItem.count };
          }
        ),
        receivedSharesCount: item[1].receivedSharesCount,
        receivedShares: item[1].receivedShares.map(
          (subItem: { name: string; id: number; count: number }) => {
            return { name: subItem.name, count: subItem.count };
          }
        ),
        articlesSharedByOtherMagazinesCount:
          item[1].articlesSharedByOtherMagazinesCount,
      };
    });

    try {
      const opts = {
        fields: [
          {
            label: "Magazine",
            value: "name",
          },
          {
            label: `Magazine's total number of original articles (drafts excl.)`,
            value: "totalNumberOfArticles",
          },
          {
            label: `Original articles by month (drafts excl.)`,
            value: "articlesByMonth",
          },
          {
            label: `Magazine's total number of shared articles (drafts incl.)`,
            value: "madeSharesCount",
          },
          {
            label: `Shared articles by months`,
            value: "madeSharesByMonth",
          },
          {
            label: `Magazine's shares from other magazines (drafts incl.)`,
            value: "madeShares",
          },
          {
            label: `Total number of shares from this magazine (drafts incl.)`,
            value: "receivedSharesCount",
          },
          {
            label: `Magazine's original articles shared by other magazines (drafts incl.)`,
            value: "receivedShares",
          },
          {
            label: `Magazine's total number of original articles shared by at least one other magazine (drafts excl.)`,
            value: "articlesSharedByOtherMagazinesCount",
          },
        ],
      };

      const parser = new Parser(opts);
      const csv = parser.parse(dataTransform);

      const filename = `em-tool_statistics_${getCsvFileNameTimestamp()}.csv`;

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div>failed to load</div>;

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          navigationAction={
            <Link startIcon={<ArrowLeft />} to="/">
              Go back
            </Link>
          }
          title="Statistics"
          as="h2"
        ></BaseHeaderLayout>
      </Box>
      <ContentLayout>
        <Box paddingBottom={4}>
          <Button onClick={exportOverallCsv}>Export CSV (overall)</Button>
        </Box>
        <Box paddingBottom={4}>
          <Button onClick={exportPerMagazineCsv}>
            Export CSV (per magazine)
          </Button>
        </Box>
        <Grid
          gap={{
            desktop: 5,
            tablet: 2,
            mobile: 1,
          }}
        >
          <GridItem col={12} s={12}>
            {isLoading && <Loader />}
            {queryData?.articles && (
              <Box
                background="neutral0"
                hasRadius
                padding={[6, 6, 1]}
                shadow="tableShadow"
              >
                <Typography as="h3" variant="beta">
                  Articles
                </Typography>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  padding={8}
                  gap={4}
                >
                  <Typography as="h3" variant="beta">
                    EM GUIDE's total number of original articles (drafts excl.):{" "}
                    {
                      queryData?.articles.filter(
                        (article: any) => article.publishedAt !== null
                      ).length
                    }
                  </Typography>
                  <Typography as="h3" variant="beta">
                    EM GUIDE's total number of shared articles (drafts incl.):{" "}
                    {queryData?.articles.reduce(
                      (acc: any, article: any) =>
                        acc + (article.urls?.length ?? 0),
                      0
                    )}
                  </Typography>
                </Flex>
              </Box>
            )}
          </GridItem>
          <GridItem col={6} s={12}>
            {isLoading && <Loader />}
            {queryData?.magazines && queryData?.magazines?.length > 0 && (
              <Box
                background="neutral0"
                hasRadius
                padding={[2, 2, 1]}
                shadow="tableShadow"
              >
                <Bar
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      title: {
                        display: true,
                        text: "Original articles by magazine (drafts excl.)",
                        font: {
                          weight: "bold",
                          size: 14,
                        },
                      },
                      datalabels: {
                        color: "rgb(123, 121, 255)",
                        font: {
                          weight: "bold",
                          size: 14,
                        },
                      },
                      tooltip: {
                        enabled: true,
                        callbacks: {
                          label: function (context) {
                            let label = context.dataset.label || "";
                            if (label) {
                              label += ": ";
                            }
                            if (context.parsed.y !== null) {
                              label += context.parsed.y;
                            }
                            return label;
                          },
                        },
                      },
                    },
                  }}
                  data={{
                    labels: queryData?.magazines?.map((item: any) => item.name),
                    datasets: [
                      {
                        label: "Number of published articles",
                        data: queryData?.magazines?.map(
                          (item: any) =>
                            item.articles.filter(
                              (article: any) => article.publishedAt !== null
                            ).length
                        ),
                        backgroundColor: "rgb(217, 216, 255)",
                        borderColor: "rgb(123, 121, 255)",
                        borderWidth: 2,
                        hoverBackgroundColor: "rgb(217, 216, 255)",
                        borderRadius: 4,
                      },
                    ],
                  }}
                />
              </Box>
            )}
          </GridItem>
          <GridItem col={6} s={12}>
            {isLoading && <Loader />}
            {queryData?.magazines && queryData?.magazines?.length > 0 && (
              <Box
                background="neutral0"
                hasRadius
                padding={[2, 2, 1]}
                shadow="tableShadow"
              >
                <Bar
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      title: {
                        display: true,
                        text: "Original articles by month (drafts excl.)",
                        font: {
                          weight: "bold",
                          size: 14,
                        },
                      },
                      datalabels: {
                        color: "rgb(123, 121, 255)",
                        font: {
                          weight: "bold",
                          size: 14,
                        },
                      },
                      tooltip: {
                        enabled: true,
                        callbacks: {
                          label: function (context) {
                            let label = context.dataset.label || "";
                            if (label) {
                              label += ": ";
                            }
                            if (context.parsed.y !== null) {
                              label += context.parsed.y;
                            }
                            return label;
                          },
                        },
                      },
                    },
                  }}
                  data={{
                    labels: [
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
                    ],
                    datasets: [
                      {
                        label: "Number of articles",
                        data: Array.from({ length: 12 }, () => 0).map(
                          (_, i) =>
                            queryData?.articles.filter(
                              (a: any) =>
                                a.publishedAt !== null &&
                                new Date(a.publishedAt).getMonth() === i
                            ).length
                        ),
                        backgroundColor: "rgb(217, 216, 255)",
                        borderColor: "rgb(123, 121, 255)",
                        borderWidth: 2,
                        hoverBackgroundColor: "rgb(217, 216, 255)",
                        borderRadius: 4,
                      },
                    ],
                  }}
                />
              </Box>
            )}
          </GridItem>

          <GridItem col={12} s={12}>
            {isLoading && <Loader />}
            {queryData?.translations && (
              <Box
                background="neutral0"
                hasRadius
                padding={[6, 6, 1]}
                shadow="tableShadow"
              >
                <Typography as="h3" variant="beta">
                  Translations from
                </Typography>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  padding={8}
                  gap={4}
                >
                  {queryData?.translations.from
                    .map(
                      (translation: {
                        name: string;
                        code: string;
                        count: number;
                      }) => (
                        <Typography
                          key={translation.code}
                          as="h3"
                          variant="beta"
                        >
                          Total number of articles (in entire project)
                          translated from {translation.name}:{" "}
                          {translation.count}
                        </Typography>
                      )
                    )
                    .toSorted(
                      (
                        a: {
                          name: string;
                          code: string;
                          count: number;
                        },
                        b: {
                          name: string;
                          code: string;
                          count: number;
                        }
                      ) => b.count - a.count
                    )}
                </Flex>
              </Box>
            )}
          </GridItem>
          <GridItem col={12} s={12}>
            {isLoading && <Loader />}
            {queryData?.translations && (
              <Box
                background="neutral0"
                hasRadius
                padding={[6, 6, 1]}
                shadow="tableShadow"
              >
                <Typography as="h3" variant="beta">
                  Translations to
                </Typography>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  padding={8}
                  gap={4}
                >
                  {queryData?.translations.to.map(
                    (translation: {
                      name: string;
                      code: string;
                      count: number;
                    }) => (
                      <Typography key={translation.code} as="h3" variant="beta">
                        Total number of articles (in entire project) translated
                        into {translation.name}: {translation.count}
                      </Typography>
                    )
                  )}
                </Flex>
              </Box>
            )}
          </GridItem>
        </Grid>
        <Box paddingTop={8} paddingBottom={4}>
          <Typography as="h3" variant="beta">
            Magazines
          </Typography>
        </Box>
        {queryData?.magazines && decodedAllShares && (
          <Grid
            gap={{
              desktop: 5,
              tablet: 2,
              mobile: 1,
            }}
          >
            {queryData.magazines.map((magazine: any) => (
              <GridItem key={magazine.id} col={12} s={12}>
                {isLoading && <Loader />}
                {queryData?.articles && (
                  <Box
                    background="neutral0"
                    hasRadius
                    padding={[6, 6, 1]}
                    shadow="tableShadow"
                  >
                    <Box marginBottom={4}>
                      <Typography as="h3" variant="beta">
                        {magazine.name}
                      </Typography>
                    </Box>
                    <Divider />
                    <Flex
                      alignItems="normal"
                      padding={8}
                      gap={4}
                      direction="column"
                    >
                      <Grid gap={6}>
                        <GridItem col={12}>
                          <Box marginBottom={2}>
                            <Typography as="h3" variant="beta">
                              Magazine's total number of original articles
                              (drafts excl.):{" "}
                              {
                                magazine.articles.filter(
                                  (article: any) => article.publishedAt !== null
                                ).length
                              }
                            </Typography>
                          </Box>

                          <Box marginBottom={2}>
                            <Typography as="h3" variant="beta">
                              Magazine's total number of shared articles (drafts
                              incl.):{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.madeSharesCount
                              }
                            </Typography>
                          </Box>

                          <Box marginBottom={4}>
                            <Typography as="h3" variant="beta">
                              Magazine's total number of own translations:{" "}
                              {
                                queryData?.translations.translationRequests.filter(
                                  (translationRequest: any) =>
                                    translationRequest.translated_by?.id ===
                                    magazine.id
                                ).length
                              }
                            </Typography>
                          </Box>

                          {decodedAllShares.get(magazine.id) && (
                            <Box padding={8} background="neutral100">
                              <TableDescription
                                text={
                                  "Magazine's shares from other magazines (drafts incl.)"
                                }
                              />
                              <Table
                                colCount={2}
                                rowCount={
                                  decodedAllShares.get(magazine.id)
                                    .madeSharesCount
                                }
                              >
                                <Thead>
                                  <Tr>
                                    <Th>
                                      <Typography variant="sigma">
                                        Magazine name
                                      </Typography>
                                    </Th>
                                    <Th>
                                      <Typography variant="sigma">
                                        Counter
                                      </Typography>
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {decodedAllShares
                                    .get(magazine.id)
                                    ?.madeShares.sort(
                                      (a: any, b: any) => b.count - a.count
                                    )
                                    .map((entry: summarizedSharesMagazine) => (
                                      <Tr key={entry.id}>
                                        <Td>
                                          <Typography textColor="neutral800">
                                            {entry.name}
                                          </Typography>
                                        </Td>
                                        <Td>
                                          <Typography textColor="neutral800">
                                            {entry.count}
                                          </Typography>
                                        </Td>
                                      </Tr>
                                    ))}
                                </Tbody>
                              </Table>
                            </Box>
                          )}
                        </GridItem>
                        <GridItem col={12}>
                          <Box marginBottom={2}>
                            <Typography as="h3" variant="beta">
                              Total number of shares from this magazine (drafts
                              incl.):{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.receivedSharesCount
                              }
                            </Typography>
                          </Box>

                          <Box marginBottom={4}>
                            <Typography as="h3" variant="beta">
                              Magazine's total number of original articles
                              shared by at least one other magazine (drafts
                              excl.):{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.articlesSharedByOtherMagazinesCount
                              }
                            </Typography>
                          </Box>

                          {decodedAllShares.get(magazine.id) && (
                            <Box padding={8} background="neutral100">
                              <TableDescription
                                text={
                                  "Magazine's original articles shared by other magazines (drafts incl.)"
                                }
                              />
                              <Table
                                colCount={2}
                                rowCount={
                                  decodedAllShares.get(magazine.id)
                                    .receivedSharesCount
                                }
                              >
                                <Thead>
                                  <Tr>
                                    <Th>
                                      <Typography variant="sigma">
                                        Name
                                      </Typography>
                                    </Th>
                                    <Th>
                                      <Typography variant="sigma">
                                        Counter
                                      </Typography>
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {decodedAllShares
                                    .get(magazine.id)
                                    ?.receivedShares.sort(
                                      (a: any, b: any) => b.count - a.count
                                    )
                                    .map((entry: summarizedSharesMagazine) => (
                                      <Tr key={entry.id}>
                                        <Td>
                                          <Typography textColor="neutral800">
                                            {entry.name}
                                          </Typography>
                                        </Td>
                                        <Td>
                                          <Typography textColor="neutral800">
                                            {entry.count}
                                          </Typography>
                                        </Td>
                                      </Tr>
                                    ))}
                                </Tbody>
                              </Table>
                            </Box>
                          )}
                        </GridItem>
                        <GridItem col={6}>
                          {isLoading && <Loader />}
                          {decodedAllShares.get(magazine.id) &&
                            decodedAllShares.get(magazine.id).articles?.length >
                              0 && (
                              <Box
                                background="neutral0"
                                hasRadius
                                padding={[2, 2, 1]}
                                shadow="tableShadow"
                              >
                                <Bar
                                  height={300}
                                  options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                      x: {
                                        stacked: true,
                                        grid: {
                                          display: false,
                                        },
                                      },
                                      y: {
                                        display: false,
                                        grid: {
                                          display: false,
                                        },
                                      },
                                    },
                                    plugins: {
                                      title: {
                                        display: true,
                                        text: "Original articles by month (drafts excl.)",
                                        font: {
                                          weight: "bold",
                                          size: 14,
                                        },
                                      },
                                      datalabels: {
                                        color: "rgb(123, 121, 255)",
                                        font: {
                                          weight: "bold",
                                          size: 14,
                                        },
                                      },
                                      tooltip: {
                                        enabled: true,
                                        callbacks: {
                                          label: function (context) {
                                            let label =
                                              context.dataset.label || "";
                                            if (label) {
                                              label += ": ";
                                            }
                                            if (context.parsed.y !== null) {
                                              label += context.parsed.y;
                                            }
                                            return label;
                                          },
                                        },
                                      },
                                    },
                                  }}
                                  data={{
                                    labels: [
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
                                    ],
                                    datasets: [
                                      {
                                        label: "Number of published articles",
                                        data: Array.from(
                                          { length: 12 },
                                          () => 0
                                        ).map(
                                          (_, i) =>
                                            decodedAllShares
                                              .get(magazine.id)
                                              ?.articles.filter(
                                                (a: any) =>
                                                  a.publishedAt !== null &&
                                                  new Date(
                                                    a.publishedAt
                                                  ).getMonth() === i
                                              ).length
                                        ),
                                        backgroundColor: "rgb(217, 216, 255)",
                                        borderColor: "rgb(123, 121, 255)",
                                        borderWidth: 2,
                                        hoverBackgroundColor:
                                          "rgb(217, 216, 255)",
                                        borderRadius: 4,
                                      },
                                    ],
                                  }}
                                />
                              </Box>
                            )}
                        </GridItem>
                        <GridItem col={6}>
                          {isLoading && <Loader />}
                          {decodedAllShares.get(magazine.id) &&
                            decodedAllShares.get(magazine.id).madeSharesCount >
                              0 && (
                              <Box
                                background="neutral0"
                                hasRadius
                                padding={[2, 2, 1]}
                                shadow="tableShadow"
                              >
                                <Bar
                                  height={300}
                                  options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                      x: {
                                        stacked: true,
                                        grid: {
                                          display: false,
                                        },
                                      },
                                      y: {
                                        display: false,
                                        grid: {
                                          display: false,
                                        },
                                      },
                                    },
                                    plugins: {
                                      title: {
                                        display: true,
                                        text: "Shared articles by month",
                                        font: {
                                          weight: "bold",
                                          size: 14,
                                        },
                                      },
                                      datalabels: {
                                        color: "rgb(123, 121, 255)",
                                        font: {
                                          weight: "bold",
                                          size: 14,
                                        },
                                      },
                                      tooltip: {
                                        enabled: true,
                                        callbacks: {
                                          label: function (context) {
                                            let label =
                                              context.dataset.label || "";
                                            if (label) {
                                              label += ": ";
                                            }
                                            if (context.parsed.y !== null) {
                                              label += context.parsed.y;
                                            }
                                            return label;
                                          },
                                        },
                                      },
                                    },
                                  }}
                                  data={{
                                    labels: [
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
                                    ],
                                    datasets: [
                                      {
                                        label: "Number of shared articles",
                                        data: Object.values(
                                          decodedAllShares.get(magazine.id)
                                            ?.madeSharesByMonth
                                        ),
                                        backgroundColor: "rgb(217, 216, 255)",
                                        borderColor: "rgb(123, 121, 255)",
                                        borderWidth: 2,
                                        hoverBackgroundColor:
                                          "rgb(217, 216, 255)",
                                        borderRadius: 4,
                                      },
                                    ],
                                  }}
                                />
                              </Box>
                            )}
                        </GridItem>
                        <GridItem col={6}>
                          {isLoading && <Loader />}
                          {decodedAllShares.get(magazine.id) && (
                            <Box
                              background="neutral0"
                              hasRadius
                              padding={[2, 2, 1]}
                              shadow="tableShadow"
                            >
                              <Bar
                                height={300}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  scales: {
                                    x: {
                                      stacked: true,
                                      grid: {
                                        display: false,
                                      },
                                    },
                                    y: {
                                      display: false,
                                      grid: {
                                        display: false,
                                      },
                                    },
                                  },
                                  plugins: {
                                    title: {
                                      display: true,
                                      text: "Magazine's total number of own translations",
                                      font: {
                                        weight: "bold",
                                        size: 14,
                                      },
                                    },
                                    datalabels: {
                                      color: "rgb(123, 121, 255)",
                                      font: {
                                        weight: "bold",
                                        size: 14,
                                      },
                                    },
                                    tooltip: {
                                      enabled: true,
                                      callbacks: {
                                        label: function (context) {
                                          let label =
                                            context.dataset.label || "";
                                          if (label) {
                                            label += ": ";
                                          }
                                          if (context.parsed.y !== null) {
                                            label += context.parsed.y;
                                          }
                                          return label;
                                        },
                                      },
                                    },
                                  },
                                }}
                                data={{
                                  labels: [
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
                                  ],
                                  datasets: [
                                    {
                                      label: "Number of own translations",
                                      data: Object.values(
                                        decodedAllShares.get(magazine.id)
                                          ?.translatedArticlesByMonth
                                      ),
                                      backgroundColor: "rgb(217, 216, 255)",
                                      borderColor: "rgb(123, 121, 255)",
                                      borderWidth: 2,
                                      hoverBackgroundColor:
                                        "rgb(217, 216, 255)",
                                      borderRadius: 4,
                                    },
                                  ],
                                }}
                              />
                            </Box>
                          )}
                        </GridItem>
                      </Grid>
                    </Flex>
                  </Box>
                )}
              </GridItem>
            ))}
          </Grid>
        )}
      </ContentLayout>
    </>
  );
};

export default StatsPage;
