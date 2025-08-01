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
import { useDeleteUser } from "@/services/Users/useDeleteUser";

interface DeleteAlertDialogProps {
  data: string[];
  type: "book" | "user";
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

  const cancelRef = useRef();

  const { setSelectedBooks, setSelectedUsers } =
    useContext(TableCheckboxContext);

  async function handleDelete(ids: string[]) {
    onClose();

    if (type === "user") {
      Promise.all(ids.map((id) => deleteUsersFn(id)));

      setSelectedUsers([]);
    } else {
      Promise.all(ids.map((id) => deleteBooksFn(id)));

      setSelectedBooks([]);
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
          {type === "book"
            ? `Deletar livro${data.length > 1 ? "s" : ""}`
            : `Deletar usuário${data.length > 1 ? "s" : ""}`}
        </AlertDialogHeader>

        <AlertDialogBody>
          Tem certeza que deseja excluir o{data.length > 1 && "s"}{" "}
          {type === "book" ? "livro" : "usuário"}
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
