import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { useContext, useRef } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";
import { useDeleteUser } from "@/services/Users/useDeleteUser";
import { User } from "@/shared/types/users";

import { ActionBar } from "../ActionBar/action-bar";
import { Pagination } from "../Pagination/pagination";
import { CheckboxTableItemUser } from "./checkbox-table-item-user";
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
  const { mutateAsync: deleteUserFn } = useDeleteUser();
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

  const cancelRef = useRef(null);

  const { selectedUsers, setSelectedUsers, toggleSelectAllUsers } =
    useContext(TableCheckboxContext);

  async function handleDeleteUsers() {
    onCloseCancel();

    selectedUsers.forEach(async ({ id }) => {
      await deleteUserFn(id);
    });

    setSelectedUsers([]);
  }

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
              <CheckboxTableItemUser key={user.id} user={user} />
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
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onCloseCancel}
          isOpen={isCancelOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Usuário{selectedUsers.length > 1 && "s"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o{selectedUsers.length > 1 && "s"}{" "}
              usuário
              {selectedUsers.length > 1 && "s"} selecionado
              {selectedUsers.length > 1 && "s"}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseCancel}>
                Cancelar
              </Button>
              <Button onClick={handleDeleteUsers} colorScheme="red" ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ActionBar>
    </>
  );
}
