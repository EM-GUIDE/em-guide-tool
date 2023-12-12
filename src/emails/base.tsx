import { Mjml, MjmlBody, MjmlSection } from "@faire/mjml-react";

interface EmailBaseTemplateProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

export const EmailBaseTemplate = ({
  header,
  body,
  footer,
}: EmailBaseTemplateProps) => {
  return (
    <Mjml>
      <MjmlBody width={500}>
        {header}
        <MjmlSection>{body}</MjmlSection>
        <MjmlSection>{footer}</MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};
