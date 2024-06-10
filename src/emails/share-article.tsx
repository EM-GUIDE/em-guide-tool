import { renderReactToMjml } from "./render";

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
  MjmlSpacer,
} from "@faire/mjml-react";
import { truncateText } from "./utils";

interface CreateTranslationRequestEmailTemplateProps {
  articleTitle: string;
  link: string;
  shareUrls?: string[];
}

export const createArticleShareEmailTemplate = ({
  articleTitle,
  link,
  shareUrls,
}: CreateTranslationRequestEmailTemplateProps) => {
  console.log(shareUrls);

  const { html, errors } = renderReactToMjml(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>
          EM GUIDE | New share on {truncateText({ text: articleTitle })}
        </MjmlTitle>
        <MjmlPreview>
          New share on {truncateText({ text: articleTitle })}
        </MjmlPreview>
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
            New shared URLs
          </MjmlText>
          <MjmlDivider
            padding="16px 0"
            border-width="1px"
            border-color="#F6F6F9"
          />
        </MjmlSection>
        <MjmlSection>
          <MjmlText
            line-height="1.5"
            font-size="16px"
            color="#4A4A6A"
            font-family="sans-serif"
          >
            New shared URLs on <i>{articleTitle}</i>.
          </MjmlText>
          <MjmlSpacer height="16px" />
          {shareUrls &&
            shareUrls.map((url) => (
              <MjmlText
                line-height="1.5"
                font-size="16px"
                color="#4A4A6A"
                font-family="sans-serif"
                paddingBottom="8px"
              >
                {url}
              </MjmlText>
            ))}
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
              Open article
            </MjmlButton>
          </MjmlWrapper>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );

  return html;
};
