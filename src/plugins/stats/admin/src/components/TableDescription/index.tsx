import { Flex, Typography } from "@strapi/design-system";

export const TableDescription = ({ text }: { text: string }) => {
  return (
    <Flex justifyContent="center" marginBottom={2}>
      <Typography fontSize={1} variant="beta" fontweight="bold" as="h4">
        {text}
      </Typography>
    </Flex>
  );
};