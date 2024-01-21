import {
  Box,
  Typography,
  Flex,
} from "@strapi/design-system";
import { format } from "date-fns";

import type { Comment } from "../../hooks/useComment";

export const CommentItem = ({
  comment
}: {
  comment: Comment ;
}) => {

  return (
    <Box
      tabIndex={0}
      hasRadius
      padding={2}
      background="neutral0"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="neutral150"
      shadow="tableShadow"
      as="article"
      width="100%"
    >
      <Flex gap={2} justifyContent={"space-between"}>
        <Flex gap={2} direction={"column"} alignItems={"flex-start"}>
          <Flex
            direction="column"
            gap={1}
            alignItems={"flex-start"}
            width="100%"
          >
            <Typography
              variant="omega"
              textColor="neutral800"
              fontWeight="bold"
              as="div"
              ellipsis
            >
              {`${comment.admin_user.firstname} ${comment.admin_user.lastname}`}
            </Typography>
            <Typography
              variant="pi"
              textColor="neutral500"
              fontWeight="bold"
              as="div"
              ellipsis
            >
              {format(new Date(comment.createdAt), "yyyy. LLL d, HH:mm")}
            </Typography>
          </Flex>
          <Typography textColor="neutral800" as="div">
            {comment.comment}
          </Typography>
        </Flex>
      </Flex>
    </Box>
  );
};
