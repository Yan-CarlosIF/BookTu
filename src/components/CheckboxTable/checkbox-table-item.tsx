import { Box, Checkbox, Td, Text, Tr } from "@chakra-ui/react";
import { useContext } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";
import { Book } from "@/shared/types/book";
import { User } from "@/shared/types/users";
import { formatPriceIntoBRL } from "@/utils/format";

import { TooltipCategories } from "./tooltip-categories";

type CheckboxTableItemProps = {
  data: Book | User;
  type: "book" | "user";
};

export function CheckboxTableItem({ data, type }: CheckboxTableItemProps) {
  const { selectedBooks, toggleSelectBook, selectedUsers, toggleSelectUser } =
    useContext(TableCheckboxContext);

  if (type === "user") {
    const user = data as User;

    return (
      <Tr>
        <Td>
          <Checkbox
            colorScheme="teal"
            isChecked={selectedUsers.some((b) => b.id === user.id)}
            onChange={() => toggleSelectUser(user)}
          />
        </Td>
        <Td maxH="40px" p="0px" borderRight="1px" borderRightColor="gray.200">
          <Box maxH="40px">
            <Text>{user.name}</Text>
            <Text fontSize="xs" fontWeight="medium" color="gray_600">
              {user?.role}
            </Text>
          </Box>
        </Td>
        <Td borderRight="1px" borderRightColor="gray.200">
          {user.registration}
        </Td>
        <Td isNumeric borderRight="1px" borderRightColor="gray.200">
          {user.permission}
        </Td>
      </Tr>
    );
  }

  if (type === "book") {
    const book = data as Book;

    return (
      <Tr>
        <Td>
          <Checkbox
            colorScheme="teal"
            isChecked={selectedBooks.some((b) => b.id === book.id)}
            onChange={() => toggleSelectBook(book)}
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
}
