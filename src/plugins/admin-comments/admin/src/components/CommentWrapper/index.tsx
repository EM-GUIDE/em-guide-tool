import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { CommentList } from "../CommentList";

export const CommentWrapper = () => {
  const { isCreatingEntry, modifiedData, slug } = useCMEditViewDataManager();

  if (isCreatingEntry || slug !== "api::article.article") {
    return null;
  }

  const id = modifiedData.id || false;
  if (!id) {
    return null;
  }

  return <CommentList id={id} slug={slug} />;
};
