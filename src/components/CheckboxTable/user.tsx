import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { useCheckboxToggle } from "@/hooks/checkboxToggle";
import { User } from "@/shared/types/users";

import { ActionBar } from "../ActionBar/action-bar";
import { Pagination } from "../Pagination/pagination";
import { CheckboxTableItemUser } from "./checkbox-table-item-user";
import { AddUserModal } from "./UserModal/add";

interface CheckboxTableItemProps {
  data: {
    data: User[];
    total: number;
    page: number;
    lastPage: number;
  };
}

export function CheckboxUserTable({ data }: CheckboxTableItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedData, toggleSelectAll, toggleSelect, setSelectedData } =
    useCheckboxToggle({
      data: data.data,
    });

  return (
    <>
      <TableContainer h="575px" mt="40px">
        <Table borderWidth={1} borderColor="gray.200">
          <Thead bg="gray_300">
            <Tr>
              <Th w="120px">
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
              <Th>Nome</Th>
              <Th>Matrícula</Th>
              <Th isNumeric>Permissão</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((user) => (
              <CheckboxTableItemUser
                key={user.id}
                user={user}
                isChecked={selectedData.includes(user.id)}
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
        <AddUserModal isOpen={isOpen} onClose={onClose} />

        <Pagination currentPage={data.page} lastPage={data.lastPage} />
      </Flex>
      <ActionBar
        setSelectedData={setSelectedData}
        data={selectedData}
        count={selectedData.length}
        onClear={() => setSelectedData([])}
      />
    </>
  );
}
