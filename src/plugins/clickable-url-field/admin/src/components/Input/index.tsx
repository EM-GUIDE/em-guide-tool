import * as React from "react";
import { Box, Flex, TextInput } from "@strapi/design-system";
import { LinkButton } from "@strapi/design-system/v2";
import { Link } from "@strapi/icons";

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props;

  const handleChange = (e) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const test = {
    flexGrow: 1,
  };

  return (
    <Flex gap={4} grow={1}>
      <Box style={{ flexGrow: 1 }}>
        <TextInput
          style={{ flexGrow: 1 }}
          placeholder="https://example.com"
          label="Clickable Url"
          name="clickable-url"
          hint="Description line"
          error={!isValidUrl(value) ? "Invalid url" : undefined}
          onChange={handleChange}
          value={value}
          required={required}
          disabled={disabled}
        />
      </Box>
      {isValidUrl(value) && (
        <LinkButton
          variant="secondary"
          endIcon={<Link />}
          href={value}
          target="_blank"
        >
          Open in new tab
        </LinkButton>
      )}
    </Flex>
  );
});

export default Input;
