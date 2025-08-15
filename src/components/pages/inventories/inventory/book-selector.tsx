import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { Input } from "@/components/input";

interface BookSelectorProps {
  books: { id: string; title: string }[];
  selectedBooks: string[];
  onSelectBook: (id: string) => void;
}

export function BookSelector({
  books,
  selectedBooks,
  onSelectBook,
}: BookSelectorProps) {
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    return (books ?? []).filter(
      (book) =>
        !selectedBooks.includes(book.id) &&
        book.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [books, selectedBooks, query]);

  return (
    <Box position="relative">
      <Input
        type="text"
        bg="transparent"
        placeholder="Busque por título e número do livro..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() !== "" && filteredBooks.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderWidth="1px"
          borderRadius="md"
          mt={1}
          maxH="200px"
          overflowY="auto"
          zIndex={10}
          boxShadow="md"
        >
          <List spacing={0}>
            {filteredBooks.map((book) => (
              <ListItem
                key={book.id}
                px={3}
                py={2}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => {
                  onSelectBook(book.id);
                  setQuery("");
                }}
              >
                <Text fontSize="sm">{book.title}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {query.trim() !== "" && filteredBooks.length === 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderWidth="1px"
          borderRadius="md"
          mt={1}
          p={3}
          zIndex={10}
          boxShadow="md"
          color="gray.500"
          fontSize="sm"
        >
          Nenhum livro encontrado
        </Box>
      )}
    </Box>
  );
}
