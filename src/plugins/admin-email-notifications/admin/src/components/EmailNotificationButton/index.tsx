import React, { useEffect, useState } from "react";
import { Button, Divider } from "@strapi/design-system";
import styled from "styled-components";
import {
  useCMEditViewDataManager,
  useFetchClient,
  useNotification,
  auth,
} from "@strapi/helper-plugin";

interface Subscriber {
  id: number;
  mainField?: unknown;
  publicationState: boolean;
  __temp_key__: string;
}

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

const EmailNotificationButton = () => {
  const { initialData, modifiedData, slug } = useCMEditViewDataManager();
  const { post } = useFetchClient();
  const toggleNotification = useNotification();
  const user = auth.get("userInfo");
  const [isSubscribed, setIsSubscribed] = useState(false);

  console.log(initialData)

  if(slug !== "api::article.article") return null

  const { id, subscribers } = initialData as {
    id: number;
    subscribers: Subscriber[];
  };

  useEffect(() => {
    const isUserSubscribed = subscribers.some(
      (subscriber) => subscriber.id === user.id
    );
    setIsSubscribed(isUserSubscribed);
  }, [subscribers, modifiedData, initialData]);

  const handleClick = async () => {
    setIsSubscribed(!isSubscribed);

    const res = await post("/admin-email-notifications", {
      adminId: user.id,
      articleId: id,
    });

    toggleNotification({
      type: "success",
      message: {
        id: "notification.plugin.subscribe.update.message",
        defaultMessage:
          res.data === "subscribed"
            ? "Subscribed for email updates for this article"
            : "Unsubscribed from email updates for this article",
      },
    });
  };

  return (
    <Container>
      <Label>Email Notification</Label>
      <Divider unsetMargin={false} />
      <Button variant="default" onClick={handleClick}>
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </Button>
    </Container>
  );
};

export default EmailNotificationButton;
