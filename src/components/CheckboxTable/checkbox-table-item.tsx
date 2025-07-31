import { Box, Checkbox, Td, Text,Tr } from "@chakra-ui/react";

import { Book } from "@/shared/types/book";
import { formatPriceIntoBRL } from "@/utils/format";

import { TooltipCategories } from "./tooltip-categories";

type CheckboxTableItemProps = {
  book: Book;
  isChecked: boolean;
  toggleSelect: (id: string) => void;
};

export function CheckboxTableItem({
  book,
  isChecked,
  toggleSelect,
}: CheckboxTableItemProps) {
  return (
    <Tr>
      <Td>
        <Checkbox
          colorScheme="teal"
          isChecked={isChecked}
          onChange={() => toggleSelect(book.id)}
        />
      </Td>
      <Td maxH="40px" p="0px" borderRight="1px" borderRightColor="gray.200">
        <Box maxH="40px">
          <Text>{book.title}</Text>
          <Text fontSize="xs" fontWeight="medium" color="gray_600">
            {book.author || "Sem subtexto"}
          </Text>
        </Box>
      </Td>
      <Td
        borderRight="1px"
        color={book.categories.length === 0 ? "gray.400" : "gray_800"}
        borderRightColor="gray.200"
      >
        {book?.categories.length === 0 ? (
          "Nenhuma categoria"
        ) : (
          <TooltipCategories categories={book.categories} />
        )}
      </Td>
      <Td borderRight="1px" borderRightColor="gray.200">
        {book.release_year}
      </Td>
      <Td isNumeric>{formatPriceIntoBRL(book.price)}</Td>
    </Tr>
  );
}
