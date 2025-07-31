import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

import { useDeleteBooks } from "@/services/Books/useDeleteBook";

interface CancelAlertDialogProps {
  data: string[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export function CancelAlertDialog({
  data,
  isOpen,
  onClose,
  onClear,
}: CancelAlertDialogProps) {
  const { mutateAsync: deleteBooksFn } = useDeleteBooks();

  const cancelRef = useRef();

  async function handleDelete(ids: string[]) {
    onClose();

    ids.forEach(async (id) => {
      await deleteBooksFn(id);
    });

    onClear();
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Deletar livro
        </AlertDialogHeader>

        <AlertDialogBody>
          Tem certeza que deseja excluir o{data.length > 1 && "s"} livro
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
