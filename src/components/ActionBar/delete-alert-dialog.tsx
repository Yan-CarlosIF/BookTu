import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";
import { useDeleteBook } from "@/services/Books/useDeleteBook";
import { useDeleteEstablishments } from "@/services/Establishments/useDeleteEstablishments";
import { useDeleteInventory } from "@/services/Inventories/useDeleteInventory";
import { useDeleteUser } from "@/services/Users/useDeleteUser";

interface DeleteAlertDialogProps {
  data: string[];
  type: "user" | "book" | "establishment" | "inventory";
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAlertDialog({
  data,
  isOpen,
  onClose,
  type,
}: DeleteAlertDialogProps) {
  const { mutateAsync: deleteUsersFn } = useDeleteUser();
  const { mutateAsync: deleteBooksFn } = useDeleteBook();
  const { mutateAsync: deleteEstablishmentsFn } = useDeleteEstablishments();
  const { mutateAsync: deleteInventoriesFn } = useDeleteInventory();

  const cancelRef = useRef();

  const { setSelectedData } = useContext(TableCheckboxContext);

  async function handleDelete(ids: string[]) {
    onClose();

    if (type === "user") {
      Promise.all(ids.map((id) => deleteUsersFn(id)));
    }

    if (type === "book") {
      Promise.all(ids.map((id) => deleteBooksFn(id)));
    }

    if (type === "establishment") {
      Promise.all(ids.map((id) => deleteEstablishmentsFn(id)));
    }

    if (type === "inventory") {
      Promise.all(ids.map((id) => deleteInventoriesFn(id)));
    }

    setSelectedData([]);
  }

  function getDisplayName() {
    switch (type) {
      case "user":
        return "usuário";
      case "book":
        return "livro";
      case "establishment":
        return "estabelecimento";
      case "inventory":
        return "inventário";
      default:
        return "item";
    }
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      size="lg"
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Deletar {getDisplayName()}
          {data.length > 1 ? "s" : ""}
        </AlertDialogHeader>

        <AlertDialogBody>
          Tem certeza que deseja excluir o{data.length > 1 && "s"}{" "}
          {getDisplayName()}
          {data.length > 1 && "s"} selecionado{data.length > 1 && "s"}?
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => handleDelete(data)} colorScheme="red" ml={3}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
