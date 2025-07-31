import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

import { Category } from "@/shared/types/category";

import { EditPopover } from "./edit-popover";

interface SimpleTableItemProps {
  category: Category;
}

export function SimpleTableItem({ category }: SimpleTableItemProps) {
  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const cancelRef = useRef(null);

  return (
    <Tr key={category.id}>
      <Th w="66%">{category.name}</Th>
      <Th>
        <EditPopover />
      </Th>
      <Th>
        <Button
          onClick={onOpenCancel}
          rightIcon={<Trash2 size={16} />}
          size="sm"
          colorScheme="red"
        >
          Deletar
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
              Deletar categoria
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir a categoria {category.name}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseCancel}>
                Cancelar
              </Button>
              <Button colorScheme="red" ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Th>
    </Tr>
  );
}
