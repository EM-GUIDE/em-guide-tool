import { MjmlHead, MjmlPreview, MjmlTitle } from "@faire/mjml-react";

interface EmailHeaderTemplateProps {
  title: string;
  preview: string;
}

export const EmailHeaderTemplate = ({ title, preview, }) => {
  return (
    <MjmlHead>
      <MjmlTitle>{ title }</MjmlTitle>
      <MjmlPreview>{ preview }</MjmlPreview>
    </MjmlHead>
  );
};
