import {
  Button,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useContext } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";
import { Book } from "@/shared/types/book";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { ActionBar } from "../ActionBar/action-bar";
import { DeleteAlertDialog } from "../ActionBar/delete-alert";
import { Pagination } from "../Pagination/pagination";
import { AddBookModal } from "./BookModal/add";
import { EditBookModal } from "./BookModal/edit";
import { CheckboxTableItem } from "./checkbox-table-item";

interface CheckBoxTableProps {
  data: {
    data: Book[];
    total: number;
    page: number;
    lastPage: number;
  };
  isAdmin?: boolean;
}

export function CheckBoxTableBooks({
  data,
  isAdmin = false,
}: CheckBoxTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(isAdmin);

  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const { selectedBooks, toggleSelectAllBooks, setSelectedBooks } =
    useContext(TableCheckboxContext);

  return (
    <>
      <TableContainer h="575px" mt="40px">
        <Table borderWidth={1} borderColor="gray.200" colorScheme="gray">
          <Thead bg="gray_300">
            <Tr>
              <Th>
                <Checkbox
                  colorScheme="teal"
                  isChecked={selectedBooks.length === data.data.length}
                  isIndeterminate={
                    selectedBooks.length > 0 &&
                    selectedBooks.length < data.data.length
                  }
                  onChange={() => toggleSelectAllBooks(data.data)}
                />
              </Th>
              <Th>Título</Th>
              <Th>Categoria(s)</Th>
              <Th>Ano de Lançamento</Th>
              <Th isNumeric>Preço (R$)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((book) => (
              <CheckboxTableItem book={book} key={book.id} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex px="40px" mt="40px" align="center" justify="space-between">
        <Text color="gray_800" fontWeight="medium">
          Página {data?.page} de {data?.lastPage}
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
        <AddBookModal isOpen={isOpen} onClose={onClose} />

        <Pagination currentPage={data.page} lastPage={data.lastPage} />
      </Flex>
      <ActionBar count={selectedBooks.length}>
        <Button
          color="gray_800"
          variant="outline"
          size="sm"
          onClick={() => setSelectedBooks([])}
        >
          Cancelar
        </Button>
        {selectedBooks.length === 1 && (
          <>
            <Button
              color="gray_800"
              variant="outline"
              size="sm"
              onClick={onOpen}
            >
              Editar
            </Button>
            <EditBookModal isOpen={isOpen} onClose={onClose} />
          </>
        )}
        {isAdmin && (
          <>
            <Button colorScheme="red" size="sm" onClick={onOpenCancel}>
              Excluir
            </Button>
            <DeleteAlertDialog
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
