import { Box, Checkbox, Td, Text, Tr } from "@chakra-ui/react";
import { useContext } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";
import { TooltipCategories } from "@/pages/home/books/_components/tooltip-categories";
import { Book } from "@/shared/types/book";
import { formatPriceIntoBRL } from "@/utils/format";

interface BooksTableItemProps {
  book: Book;
}

export function BooksTableItem({ book }: BooksTableItemProps) {
  const { selectedData, toggleSelectData } = useContext(TableCheckboxContext);

  return (
    <Tr>
      <Td>
        <Checkbox
          colorScheme="teal"
          isChecked={selectedData?.some((b) => b.id === book.id)}
          onChange={() => toggleSelectData(book)}
        />
      </Td>
      <Td maxH="40px" p="0px" borderRight="1px" borderRightColor="gray.200">
        <Box maxH="40px">
          <Text>{book.title}</Text>
          {book.author && (
            <Text fontSize="xs" fontWeight="medium" color="gray_600">
              {book.author}
            </Text>
          )}
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
