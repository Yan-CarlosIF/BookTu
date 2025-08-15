import {
  Button,
  NumberInput,
  NumberInputField,
  Td,
  Tr,
} from "@chakra-ui/react";

import { Book } from "@/shared/types/book";

interface SelectedBooksTableItemProps {
  book: Book & { quantity: number };
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveBook: (bookId: string) => void;
}

export function SelectedBooksTableItem({
  book,
  onRemoveBook,
  onUpdateQuantity,
}: SelectedBooksTableItemProps) {
  return (
    <Tr key={book.id}>
      <Td>{book.title}</Td>
      <Td>
        <NumberInput
          size="sm"
          w="fit-content"
          min={1}
          value={book.quantity}
          onChange={(value) => onUpdateQuantity(book.id, Number(value))}
        >
          <NumberInputField />
        </NumberInput>
      </Td>
      <Td w="100px">
        <Button
          size="xs"
          colorScheme="red"
          onClick={() => onRemoveBook(book.id)}
        >
          Remover
        </Button>
      </Td>
    </Tr>
  );
}
