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

import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  const getData = async () => {
    const res = await get(`/${pluginId}/data`);
    console.log(res.data);
    return res.data;
  };

  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["magazines", "articles", "shares", "allShares"],
    queryFn: getData,
  });

  const calculateShares = (magazines: any[]): Map<number, number> => {
    const sharesCount = new Map<number, number>();

    magazines.forEach((magazine) => {
      magazine.articles?.forEach((article: any) => {
        article.urls?.forEach((url: any) => {
          const sourceMagazineName = url.magazine.name;
          if (!sharesCount.has(sourceMagazineName)) {
            sharesCount.set(sourceMagazineName, 0);
          }
          sharesCount.set(
            sourceMagazineName,
            sharesCount.get(sourceMagazineName)! + 1
          );
        });
      });
    });

    return sharesCount;
  };

  function calculateSharesWithBreakdown(magazines: any[]): any {
    const sharesBreakdownByName: any = {};

    magazines.forEach((targetMagazine: any) => {
      const targetMagazineName = targetMagazine.name;
      const breakdownByName: any = {};

      targetMagazine.articles?.forEach((article: any) => {
        article.urls?.forEach((url: any) => {
          const sourceMagazineName = url.magazine.name;
          if (!breakdownByName[sourceMagazineName]) {
            breakdownByName[sourceMagazineName] = 0;
          }
          breakdownByName[sourceMagazineName]++;
        });
      });

      sharesBreakdownByName[targetMagazineName] = breakdownByName;
    });

    return sharesBreakdownByName;
  }

  const arrayToMap = (array: [number, any][]): Map<number, any> => {
    const deserializedMap = new Map<number, any>();
    array.forEach(([key, value]) => {
      deserializedMap.set(key, value);
    });
    return deserializedMap;
  };

  console.log(data);

  let decodedAllShares;

  if (data?.allShares) {
    decodedAllShares = arrayToMap(data?.allShares);
    console.log(decodedAllShares);

    console.log(decodedAllShares.get(1));
  }
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
          <GridItem col={6} s={12}>
            {isPending && <Loader />}
            {data?.articles && (
              <Box
                background="neutral0"
                hasRadius
                padding={[6, 6, 1]}
                shadow="tableShadow"
              >
                <Typography as="h3" variant="beta">
                  Articles
                </Typography>
                <Flex alignItems="center" justifyContent="center" padding={8}>
                  <Typography as="h3" variant="beta">
                    Total number of articles: {data?.articles.length}
                  </Typography>
                </Flex>
              </Box>
            )}
          </GridItem>
          <GridItem col={6} s={12}>
            {isPending && <Loader />}
            {data?.magazines && data?.magazines?.length > 0 && (
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
                    labels: data?.magazines?.map((item: any) => item.name),
                    datasets: [
                      {
                        label: "Total number of articles",
                        data: data?.magazines?.map(
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
        </Grid>
        <Box paddingTop={8} paddingBottom={4}>
          <Typography as="h3" variant="beta">
            Magazines
          </Typography>
        </Box>
        <Grid
          gap={{
            desktop: 5,
            tablet: 2,
            mobile: 1,
          }}
        >
          {data?.magazines &&
            decodedAllShares &&
            data.magazines.map((magazine: any) => (
              <GridItem key={magazine.id} col={12} s={12}>
                {isPending && <Loader />}
                {data?.articles && (
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
                      // justifyContent="center"
                      padding={8}
                      gap={4}
                      direction="column"
                    >
                      <Typography as="h3" variant="beta">
                        Total number of articles: {magazine.articles.length}
                      </Typography>
                      <Grid gap={6}>
                        <GridItem col={6} s={12}>
                          <Box marginBottom={4}>
                            <Typography as="h3" variant="beta">
                              Share of other articles:{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.totalMadeShares
                              }
                            </Typography>
                          </Box>

                          {decodedAllShares.get(magazine.id) && (
                            <Box padding={8} background="neutral100">
                              <Table
                                colCount={2}
                                rowCount={
                                  decodedAllShares.get(magazine.id)
                                    .totalMadeShares
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
                                        Number of shares made to others
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
                          <Box marginBottom={4}>
                            <Typography as="h3" variant="beta">
                              Shares by others:{" "}
                              {
                                decodedAllShares.get(magazine.id)
                                  ?.totalReceivedShares
                              }
                            </Typography>
                          </Box>

                          {decodedAllShares.get(magazine.id) && (
                            <Box padding={8} background="neutral100">
                              <Table
                                colCount={2}
                                rowCount={
                                  decodedAllShares.get(magazine.id)
                                    .totalReceivedShares
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
      </ContentLayout>
    </>
  );
};

export default StatsPage;
