import {
  Box,
  Button,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface BookSelectorProps {
  books: { id: string; title: string }[];
  onSelectBook: (bookId: string) => void;
  selectedBooks?: string[];
}

export function BookSelector({
  books,
  onSelectBook,
  selectedBooks,
}: BookSelectorProps) {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef(null);

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectBook = (bookId) => {
    onSelectBook(bookId);
    setFilter("");
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      closeOnBlur={false}
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>
        <Button w="100%" variant="outline">
          Selecionar Livro
        </Button>
      </PopoverTrigger>
      <PopoverContent w="100%" maxW="none">
        <PopoverBody p={0}>
          <Box p={2} borderBottom="1px solid" borderColor="gray.200" bg="white">
            <Input
              ref={initialFocusRef}
              size="sm"
              placeholder="Filtrar livros..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Box>
          <Box maxH="250px" overflowY="auto">
            {filteredBooks?.length > 0 ? (
              <VStack spacing={0} align="stretch">
                {filteredBooks?.map((book) => (
                  <Box
                    key={book.id}
                    p={3}
                    cursor="pointer"
                    _hover={{ bg: "teal.50" }}
                    _focus={{ bg: "teal.100" }}
                    onClick={() => handleSelectBook(book.id)}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    bg={selectedBooks?.includes(book.id) ? "teal.50" : "white"}
                  >
                    <Text fontSize="sm">{book.title}</Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Box p={3} color="gray.500" fontSize="sm" textAlign="center">
                Nenhum livro encontrado
              </Box>
            )}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
