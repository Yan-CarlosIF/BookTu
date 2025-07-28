import { Tooltip, Text, Divider } from "@chakra-ui/react";

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
          placement="top-start"
          label={categories.map((c, index) => (
            <>
              <Text key={c.id}>{c.name}</Text>
              {index !== categories.length - 1 && <Divider />}
            </>
          ))}
        >
          <strong>...</strong>
        </Tooltip>
      </Text>
    );
  }
}
