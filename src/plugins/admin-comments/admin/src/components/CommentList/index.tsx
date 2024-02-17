import React, { useState, useEffect } from "react";
import { useCMEditViewDataManager, auth } from "@strapi/helper-plugin";
import {
  Box,
  Button,
  Divider,
  Flex,
  Loader,
  ModalLayout,
  ModalBody,
  ModalHeader,
  Textarea,
  Typography,
} from "@strapi/design-system";
import styled from "styled-components";
import { useComment } from "../../hooks/useComment";
import { CommentItem } from "../CommentItem";
import { format } from "date-fns";
import { type Comment } from "../../hooks/useComment";

const Container = styled.div`
  padding-top: 24px;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 0.6875rem;
  line-height: 1.45;
  text-transform: uppercase;
  color: rgb(165, 165, 186);
`;

export const CommentList = ({ id, slug }: { id: string; slug: string }) => {
  const { getComments, createComment } = useComment();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const user = auth.get("userInfo");

  const entity = { id, slug };

  const { isLoading, data, isRefetching } = getComments({
    filters: {
      entityId: entity.id,
      entitySlug: entity.slug,
    },
    populate: {
      admin_user: {
        fields: ["firstname", "lastname"],
      },
    },
    sort: { createdAt: "ASC" },
  });

  // set initial data to state so its reactive
  useEffect(() => {
    if (!isLoading && !isRefetching && data.length) {
      setComments([...data]);
    } else {
      setComments([]);
    }
  }, [isLoading, isRefetching, data]);

  const handleCommentCreate = async () => {
    if (content === "") return;
    setIsCreating(true);

    const params = {
      comment: content,
      entityId: entity.id,
      entitySlug: entity.slug,
      admin_user: {
        connect: [user.id],
      },
    };

    const response = await createComment(params);

    if (response.status && response.status === 200) {
      setIsCreating(false);
      setContent("");
    } else {
      setIsCreating(false);
    }
  };

  const lastComment = comments[comments.length - 1];

  return (
    <Container>
      <Label>Comments</Label>
      <Divider unsetMargin={false} />
      {lastComment && (
        <Box paddingTop={2} paddingBottom={4}>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Typography fontWeight="bold" as="span">
              Total comments: {comments.length}
            </Typography>
            <Flex gap={1}>
              <Typography fontWeight="bold" variant="pi" as="span">
                Last posted at:
              </Typography>
              <Typography variant="pi" as="span">
                {format(new Date(lastComment.updatedAt), "LLL d, yyyy HH:mm")}
              </Typography>
            </Flex>
            <Flex gap={1}>
              <Typography fontWeight="bold" variant="pi" as="span">
                Posted by:
              </Typography>
              <Typography variant="pi" as="span">
                {`${lastComment.admin_user.firstname} ${lastComment.admin_user.lastname}`}
              </Typography>
            </Flex>
          </Flex>
        </Box>
      )}
      <Button onClick={() => setIsModalVisible(true)}>Open Comments</Button>
      {isModalVisible && (
        <ModalLayout
          style={{ color: "red" }}
          onClose={() => setIsModalVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Comments
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box padding={[4, 2]} background="neutral100">
              <Flex gap={4} direction="column">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </Flex>
              <Box marginTop={6}>
                <Textarea
                  placeholder="This is a content placeholder"
                  label="New comment"
                  name="content"
                  hint=""
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setContent(e.target.value)
                  }
                >
                  {content}
                </Textarea>
                <Button
                  marginTop={2}
                  onClick={() => handleCommentCreate()}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <Loader small>Creating comment...</Loader>
                  ) : (
                    "Add comment"
                  )}
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalLayout>
      )}
    </Container>
  );
};
