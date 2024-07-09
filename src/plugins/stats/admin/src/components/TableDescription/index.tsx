import { Flex, Typography } from "@strapi/design-system";

export const TableDescription = ({ text }: { text: string }) => {
  return (
    <Flex justifyContent="center" marginBottom={2}>
      <Typography fontSize={2} variant="beta" fontweight="bold" as="h3">
        {text}
      </Typography>
    </Flex>
  );
};