import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useContext } from "react";

import { ActionBar } from "@/components/ActionBar/action-bar";
import { DeleteAlertDialog } from "@/components/ActionBar/delete-alert-dialog";
import { Pagination } from "@/components/Pagination/pagination";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { useCreateEstablishments } from "@/services/Establishments/useCreateEstablishment";
import { useEditEstablishment } from "@/services/Establishments/useEditEstablishment";
import { Establishment } from "@/shared/types/establishment";

import { AddEstablishmentModal } from "./EstablishmentModal";

interface EstablishmentsTableContentProps {
  page: number;
  lastPage: number;
}

export function EstablishmentsTableContent({
  lastPage,
  page,
}: EstablishmentsTableContentProps) {
  const { user, isLoading } = useContext(userContext);
  const { selectedData, setSelectedData } = useContext(TableCheckboxContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const { mutateAsync: createEstablishmentFn } = useCreateEstablishments();
  const { mutateAsync: editEstablishmentFn } = useEditEstablishment();

  return (
    <Flex px="40px" mt="40px" align="center" justify="space-between">
      <Text color="gray_800" fontWeight="medium">
        Página {page} de {lastPage}
      </Text>

      {!isLoading && user.permission === "admin" && (
        <>
          <Button
            rightIcon={<Plus />}
            onClick={onOpen}
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
          <AddEstablishmentModal
            mutateAsync={createEstablishmentFn}
            type="add"
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      )}

      <Pagination w="fit-content" currentPage={page} lastPage={lastPage} />
      <ActionBar count={selectedData.length}>
        <Button
          color="gray_800"
          variant="outline"
          size="sm"
          onClick={() => setSelectedData([])}
        >
          Cancelar
        </Button>
        {selectedData?.length === 1 && (
          <>
            <Button
              color="gray_800"
              variant="outline"
              size="sm"
              onClick={onOpen}
            >
              Editar
            </Button>
            <AddEstablishmentModal
              type="edit"
              mutateAsync={editEstablishmentFn}
              establishment={selectedData[0] as Establishment}
              isOpen={isOpen}
              onClose={onClose}
            />
          </>
        )}
        <Button colorScheme="red" size="sm" onClick={onOpenCancel}>
          Excluir
        </Button>
        <DeleteAlertDialog
          type="book"
          data={selectedData.map((book) => book.id)}
          isOpen={isCancelOpen}
          onClose={onCloseCancel}
        />
      </ActionBar>
    </Flex>
  );
}
