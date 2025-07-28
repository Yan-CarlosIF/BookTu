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
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ActionBar } from "../ActionBar/action-bar";
import { CheckboxTableItem } from "./checkbox-table-item";

interface CheckBoxTableProps {
  data: { data: Book[]; total: number; page: number; lastPage: number };
}

export function CheckBoxTable({ data }: CheckBoxTableProps) {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedData.length === data?.data.length) {
      setSelectedData([]);
    } else {
      setSelectedData(data?.data.map((book) => book.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedData.includes(id)) {
      setSelectedData(selectedData.filter((bookId) => bookId !== id));
    } else {
      setSelectedData([...selectedData, id]);
    }
  };

  const handleDeleteSelected = () => {
    console.log("Excluir livros com ID:", selectedData);
    setSelectedData([]);
  };

  return (
    <>
      <TableContainer mt="40px">
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
          _focus={{ bg: "teal.400" }}
          _hover={{ bg: "teal.400" }}
          fontWeight="medium"
          bg="highlight_blue"
          px="20px"
          py="24px"
        >
          Adicionar
        </Button>

        <Text>PAGINAÇÃO</Text>
      </Flex>
      <ActionBar
        count={selectedData.length}
        onClear={() => setSelectedData([])}
        onDelete={handleDeleteSelected}
      />
    </>
  );
}
