import { Book } from "@/shared/types/book";
import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { ActionBar } from "../ActionBar/action-bar";
import { CheckboxTableItem } from "./checkbox-table-item";
import { Pagination } from "../Pagination/pagination";
import { useCheckboxToggle } from "@/hooks/checkboxToggle";
import { AddBookModal } from "./AddBookModal/add-book-modal";

interface CheckBoxTableProps {
  data: {
    data: Book[];
    total: number;
    page: number;
    lastPage: number;
  };
}

export function CheckBoxTable({ data }: CheckBoxTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleDeleteSelected,
    selectedData,
    setSelectedData,
    toggleSelect,
    toggleSelectAll,
  } = useCheckboxToggle(data);

  return (
    <>
      <TableContainer h="575px" mt="40px">
        <Table borderWidth={1} borderColor="gray.200" colorScheme="gray">
          <Thead bg="gray_300">
            <Tr>
              <Th>
                <Checkbox
                  colorScheme="teal"
                  isChecked={selectedData.length === data.data.length}
                  isIndeterminate={
                    selectedData.length > 0 &&
                    selectedData.length < data.data.length
                  }
                  onChange={toggleSelectAll}
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
              <CheckboxTableItem
                book={book}
                key={book.id}
                isChecked={selectedData.includes(book.id)}
                toggleSelect={toggleSelect}
              />
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
      <ActionBar
        count={selectedData.length}
        onClear={() => setSelectedData([])}
        onDelete={handleDeleteSelected}
      />
    </>
  );
}
