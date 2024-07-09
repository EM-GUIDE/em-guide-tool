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
  name: string;
  link: string;
  newUrlWithMagazine: {
    url: string;
    sharerMagazine: string;
    originName: string;
  };
}

export const createArticleShareEmailTemplate = ({
  articleTitle,
  name,
  link,
  newUrlWithMagazine,
}: CreateTranslationRequestEmailTemplateProps) => {
  console.log(newUrlWithMagazine);

  const { html, errors } = renderReactToMjml(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>
          EM GUIDE | {newUrlWithMagazine.sharerMagazine} has just shared{" "}
          {newUrlWithMagazine.originName}'s article:{" "}
          {truncateText({ text: articleTitle })}
        </MjmlTitle>
        <MjmlPreview>
          New share on {truncateText({ text: articleTitle })}
        </MjmlPreview>
      </MjmlHead>
      <MjmlBody width={600}>
        <MjmlSection paddingBottom="16px">
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
            {newUrlWithMagazine.sharerMagazine} has just shared{" "}
            {newUrlWithMagazine.originName}'s article: <i>{articleTitle}</i>.
          </MjmlText>
          <MjmlSpacer height="16px" />
          {newUrlWithMagazine && newUrlWithMagazine.url && (
            <MjmlText
              line-height="1.5"
              font-size="16px"
              color="#4A4A6A"
              font-family="sans-serif"
              paddingBottom="8px"
            >
              {newUrlWithMagazine.url}
            </MjmlText>
          )}
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
