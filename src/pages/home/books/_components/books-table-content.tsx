import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useContext } from "react";

import { ActionBar } from "@/components/ActionBar/action-bar";
import { DeleteAlertDialog } from "@/components/ActionBar/delete-alert-dialog";
import { Pagination } from "@/components/Pagination/pagination";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { BookModal } from "@/pages/home/books/_components/BookModal";
import { useCreateBook } from "@/services/Books/useCreateBook";
import { useEditBook } from "@/services/Books/useEditBook";

interface BooksTableContentProps {
  page: number;
  lastPage: number;
}

export function BooksTableContent({ page, lastPage }: BooksTableContentProps) {
  const { user, isLoading: isUserLoading } = useContext(userContext);
  const { mutateAsync: createBookFn } = useCreateBook();
  const { mutateAsync: editBookFn } = useEditBook();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const { selectedBooks, setSelectedBooks } = useContext(TableCheckboxContext);

  return (
    <>
      <Flex px="40px" mt="40px" align="center" justify="space-between">
        <Text color="gray_800" fontWeight="medium">
          Página {page} de {lastPage}
        </Text>

        <Button
          rightIcon={<Plus />}
          color="background"
          onClick={onOpen}
          _focus={{ bg: "teal.400" }}
          _hover={{ bg: "teal.400" }}
          fontWeight="medium"
          bg="highlight_blue"
          px="20px"
          py="24px"
        >
          Adicionar
        </Button>
        <BookModal
          action="add"
          isOpen={isOpen}
          onClose={onClose}
          mutateAsync={createBookFn}
        />

        <Pagination currentPage={page} lastPage={lastPage} />
      </Flex>
      <ActionBar count={selectedBooks?.length}>
        <Button
          color="gray_800"
          variant="outline"
          size="sm"
          onClick={() => setSelectedBooks([])}
        >
          Cancelar
        </Button>
        {selectedBooks?.length === 1 && (
          <>
            <Button
              color="gray_800"
              variant="outline"
              size="sm"
              onClick={onOpen}
            >
              Editar
            </Button>
            <BookModal
              action="edit"
              isOpen={isOpen}
              onClose={onClose}
              mutateAsync={editBookFn}
            />
          </>
        )}
        {!isUserLoading && user?.permission === "admin" && (
          <>
            <Button colorScheme="red" size="sm" onClick={onOpenCancel}>
              Excluir
            </Button>
            <DeleteAlertDialog
              type="book"
              data={selectedBooks.map((book) => book.id)}
              isOpen={isCancelOpen}
              onClose={onCloseCancel}
            />
          </>
        )}
      </ActionBar>
    </>
  );
}
