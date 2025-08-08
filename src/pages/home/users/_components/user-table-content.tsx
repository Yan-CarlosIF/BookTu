import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useContext } from "react";

import { ActionBar } from "@/components/ActionBar/action-bar";
import { DeleteAlertDialog } from "@/components/ActionBar/delete-alert-dialog";
import { Pagination } from "@/components/Pagination/pagination";
import { TableCheckboxContext } from "@/context/checkboxContext";

import { AddUserModal } from "./UserModal/add";
import { EditUserModal } from "./UserModal/edit";

interface UserTableContentProps {
  page: number;
  lastPage: number;
}

export function UserTableContent({ page, lastPage }: UserTableContentProps) {
  const { setSelectedData, selectedData } = useContext(TableCheckboxContext);

  const {
    isOpen: isOpenAdd,
    onOpen: onOpen,
    onClose: onClose,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

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
        <AddUserModal isOpen={isOpenAdd} onClose={onClose} />

        <Pagination currentPage={page} lastPage={lastPage} />
      </Flex>
      <ActionBar count={selectedData.length}>
        <Button
          color="gray_800"
          variant="outline"
          size="sm"
          onClick={() => setSelectedData([])}
        >
          Cancelar
        </Button>
        {selectedData.length === 1 && (
          <>
            <Button
              color="gray_800"
              variant="outline"
              size="sm"
              onClick={onOpenEdit}
            >
              Editar
            </Button>
            <EditUserModal isOpen={isOpenEdit} onClose={onCloseEdit} />
          </>
        )}
        <Button colorScheme="red" size="sm" onClick={onOpenCancel}>
          Excluir
        </Button>
        <DeleteAlertDialog
          data={selectedData.map(({ id }) => id)}
          isOpen={isOpenCancel}
          onClose={onCloseCancel}
          type="user"
        />
      </ActionBar>
    </>
  );
}
