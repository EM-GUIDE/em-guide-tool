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
  Tooltip,
  Typography,
} from "@strapi/design-system";
import styled from "styled-components";
import { useComment } from "../../hooks/useComment";
import { CommentItem } from "../CommentItem";
import { format } from "date-fns";

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

const ModalWrapper = styled.div`
& > div:first-child {
  z-index: 1000;
}`

export const CommentList = () => {
  const { isCreatingEntry, modifiedData, slug } = useCMEditViewDataManager();
  const { getComments, createComment } = useComment();
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [activeComment, setActiveComment] = useState({});
  const [comments, setComments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const user = auth.get("userInfo");

  if (isCreatingEntry || slug !== "api::article.article") {
    return null;
  }

  const id = modifiedData.id || false;
  if (!id) {
    return null;
  }

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
    if (!isLoading && !isRefetching) {
      if (data.length) {
        setComments([...data]);
      } else {
        setComments([]);
      }
    }
  }, [isLoading, isRefetching]);

  const handleCommentCreate = async () => {
    if(content === "") return;
    setIsCreating(true);
    
    const response = await createComment({
      comment: content,
      entityId: entity.id,
      entitySlug: entity.slug,
      admin_user: {
        connect: [user.id],
      },
    });


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
        style={{color: "red"}}
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
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    setActiveComment={setActiveComment}
                    toggleModal={setIsCommentsModalVisible}
                  />
                ))}
              </Flex>
              <Box marginTop={6}>
                <Textarea
                  placeholder="This is a content placeholder"
                  label="New comment"
                  name="content"
                  hint=""
                  onChange={(e) => setContent(e.target.value)}
                  labelAction={
                    <Tooltip
                      description="Content of the tooltip"
                      position="right"
                    >
                      <button
                        aria-label="Information about the email"
                        style={{
                          border: "none",
                          padding: 0,
                          background: "transparent",
                        }}
                      ></button>
                    </Tooltip>
                  }
                >
                  {content}
                </Textarea>
                <Button marginTop={2} onClick={() => handleCommentCreate()} disabled={ isCreating }>
                { isCreating ? <Loader small >Creating comment...</Loader> : 'Add comment' }  
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalLayout>
      )}
    </Container>
  );
};
