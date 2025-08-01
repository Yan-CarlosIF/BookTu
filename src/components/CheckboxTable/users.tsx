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
import { User } from "@/shared/types/users";

import { ActionBar } from "../ActionBar/action-bar";
import { DeleteAlertDialog } from "../ActionBar/delete-alert-dialog";
import { Pagination } from "../Pagination/pagination";
import { CheckboxTableItem } from "./checkbox-table-item";
import { AddUserModal } from "./UserModal/add";
import { EditUserModal } from "./UserModal/edit";

interface CheckboxTableItemProps {
  data: {
    data: User[];
    total: number;
    page: number;
    lastPage: number;
  };
}

export function CheckboxTableUsers({ data }: CheckboxTableItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const { selectedUsers, setSelectedUsers, toggleSelectAllUsers } =
    useContext(TableCheckboxContext);

  return (
    <>
      <TableContainer h="575px" mt="40px">
        <Table borderWidth={1} borderColor="gray.200">
          <Thead bg="gray_300">
            <Tr>
              <Th w="120px">
                <Checkbox
                  colorScheme="teal"
                  isChecked={selectedUsers.length === data.data.length}
                  isIndeterminate={
                    selectedUsers.length > 0 &&
                    selectedUsers.length < data.data.length
                  }
                  onChange={() => toggleSelectAllUsers(data.data)}
                />
              </Th>
              <Th>Nome</Th>
              <Th>Matrícula</Th>
              <Th isNumeric>Permissão</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((user) => (
              <CheckboxTableItem type="user" key={user.id} data={user} />
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
      <ActionBar count={selectedUsers.length}>
        <Button
          color="gray_800"
          variant="outline"
          size="sm"
          onClick={() => setSelectedUsers([])}
        >
          Cancelar
        </Button>
        {selectedUsers.length === 1 && (
          <>
            <Button
              color="gray_800"
              variant="outline"
              size="sm"
              onClick={onOpenEdit}
            >
              Editar
            </Button>
            <EditUserModal isOpen={isEditOpen} onClose={onCloseEdit} />
          </>
        )}
        <Button colorScheme="red" size="sm" onClick={onOpenCancel}>
          Excluir
        </Button>
        <DeleteAlertDialog
          data={selectedUsers.map(({ id }) => id)}
          isOpen={isCancelOpen}
          onClose={onCloseCancel}
          type="user"
        />
      </ActionBar>
    </>
  );
}
