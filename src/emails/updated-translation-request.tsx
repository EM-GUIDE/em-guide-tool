import { renderReactToMjml } from "./render";
import { env } from "@strapi/utils";

import {
  MjmlButton,
  MjmlText,
  MjmlDivider,
  MjmlHead,
  MjmlPreview,
  MjmlTitle,
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlWrapper,
} from "@faire/mjml-react";

interface UpdatedTranslationRequestEmailTemplateProps {
  articleTitle: string;
  name: string;
  language: string;
  link: string;
}

export const updatedTranslationRequestEmailTemplate = ({
  articleTitle,
  name,
  language,
  link,
}: UpdatedTranslationRequestEmailTemplateProps) => {
  const { html, errors } = renderReactToMjml(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{ env("ENVIRONMENT") === "development"  &&  'TEST' } EM GUIDE | Translation request updated</MjmlTitle>
        <MjmlPreview>{name} has updated an translation request you have subscribed to...</MjmlPreview>
      </MjmlHead>
      <MjmlBody width={600}>
        <MjmlSection paddingBottom="16px">
          <MjmlText
            color="#212134"
            font-size="32px"
            font-weight="700"
            font-family="sans-serif"
            lineHeight="1.5"
            paddingBottom=" 16px"
          >
            { env("ENVIRONMENT") === "development"  &&  'TEST' } EM GUIDE | Translation request updated
          </MjmlText>
          <MjmlDivider padding="16px 0" border-width="1px" border-color="#F6F6F9" />
        </MjmlSection>
        <MjmlSection>
        <MjmlText
          line-height="1.5"
          font-size="16px"
          color="#4A4A6A"
          font-family="sans-serif"
        >
          {name} has updated the {language} language translation request for {articleTitle}. You can
          view it by clicking the link below.
        </MjmlText>
        <MjmlWrapper padding="16px 0" fullWidth textAlign="center">
          <MjmlButton
            href={link}
            background-color="#4945FF"
            font-weight="700"
            font-size="14px"
            padding="8px 16px"
            border-right="4px"
            height="40px"
            line-height="1.5"
            textAlign="center"
            align="center"
          >
            Open translation request
          </MjmlButton>
        </MjmlWrapper>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );

  return html;
};
