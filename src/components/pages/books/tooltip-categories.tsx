import { Divider, Text, Tooltip } from "@chakra-ui/react";
import { Fragment } from "react";

export function TooltipCategories({
  categories,
}: {
  categories: {
    id: string;
    name: string;
  }[];
}) {
  if (categories.length === 1) {
    return (
      <>
        <Text>{categories[0].name} </Text>
      </>
    );
  }

  if (categories.length > 1) {
    return (
      <Text cursor="context-menu" as="span">
        {categories[0].name}{" "}
        <Tooltip
          hasArrow
          bg="gray_800"
          placement="top-start"
          label={categories.map((c, index) => (
            <Fragment key={c.id}>
              <Text>{c.name}</Text>
              {index !== categories.length - 1 && <Divider />}
            </Fragment>
          ))}
        >
          <strong>...</strong>
        </Tooltip>
      </Text>
    );
  }
}
