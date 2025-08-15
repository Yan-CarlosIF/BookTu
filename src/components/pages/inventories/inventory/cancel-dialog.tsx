import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useRef } from "react";

interface CancelDialogProps {
  reset: () => void;
  disclosure: UseDisclosureReturn;
}

export function CancelDialog({
  reset,
  disclosure: { isOpen, onClose },
}: CancelDialogProps) {
  const cancelRef = useRef(null);

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
          Confirmar exclusão
        </AlertDialogHeader>

        <AlertDialogBody>
          Tem certeza que deseja limpar os dados do inventário?
          <Text fontSize="sm" mt={2} color="red.400">
            Todos os dados serão perdidos
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            colorScheme="red"
            ml={3}
          >
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
