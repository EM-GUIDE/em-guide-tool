import React, { useEffect, useState } from "react";
import pluginId from "../../pluginId";
import { getFetchClient } from "@strapi/helper-plugin";

import {
  BaseHeaderLayout,
  Box,
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

interface summarizedSharesMagazine {
  id: number;
  name: string;
  count: number;
}
interface summarizedSharesItem {
  sum: number;
  byMagazine: summarizedSharesMagazine[];
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

  // console.log(data?.data);

  const queryData = data?.data;

  let decodedAllShares;

  if (queryData?.allShares) {
    decodedAllShares = arrayToMap(queryData?.allShares);
    console.log(decodedAllShares);

    // console.log(decodedAllShares.get(1));
  }

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
        />
      </Box>
      <ContentLayout>
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
                    Total number of articles: {queryData?.articles.length}
                  </Typography>
                  <Typography as="h3" variant="beta">
                    Total number of shares:{" "}
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
                        text: "Articles By Magazine",
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
                        label: "Total number of articles",
                        data: queryData?.magazines?.map(
                          (item: any) => item.articles.length
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
                        text: "Articles By Month",
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
                        label: "Total number of articles",
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
                        <GridItem col={6} s={12}>
                          <Box marginBottom={2}>
                            <Typography as="h3" variant="beta">
                              Number of articles: {magazine.articles.length}
                            </Typography>
                          </Box>

                          <Box marginBottom={4}>
                            <Typography as="h3" variant="beta">
                              Shared articles:{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.madeSharesCount
                              }
                            </Typography>
                          </Box>

                          {decodedAllShares.get(magazine.id) && (
                            <Box padding={8} background="neutral100">
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
                                        Number of articles this mag shares from an other mag
                                      </Typography>
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {decodedAllShares
                                    .get(magazine.id)
                                    ?.madeShares.map(
                                      (entry: summarizedSharesMagazine) => (
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
                                      )
                                    )}
                                </Tbody>
                              </Table>
                            </Box>
                          )}
                        </GridItem>
                        <GridItem col={6} s={12}>
                          <Box marginBottom={2}>
                            <Typography as="h3" variant="beta">
                              All shares by others:{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.receivedSharesCount
                              }
                            </Typography>
                          </Box>

                          <Box marginBottom={4}>
                            <Typography as="h3" variant="beta">
                              Number of articles with shares:{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.articlesSharedByOtherMagazinesCount
                              }
                            </Typography>
                          </Box>

                          {decodedAllShares.get(magazine.id) && (
                            <Box padding={8} background="neutral100">
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
                                        Shares recieved from others
                                      </Typography>
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {decodedAllShares
                                    .get(magazine.id)
                                    ?.receivedShares.map(
                                      (entry: summarizedSharesMagazine) => (
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
                                      )
                                    )}
                                </Tbody>
                              </Table>
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
