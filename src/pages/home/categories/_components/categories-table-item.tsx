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
import { useContext, useRef } from "react";

import { userContext } from "@/context/userContext";
import { useDeleteCategory } from "@/services/Categories/useDeleteCategory";
import { Category } from "@/shared/types/category";

import { EditPopover } from "./edit-popover";

interface CategoriesTableItemProps {
  category: Category;
}

export function CategoriesTableItem({ category }: CategoriesTableItemProps) {
  const { user, isLoading } = useContext(userContext);

  const isAdmin = !isLoading && user?.permission === "admin";

  const { mutateAsync: deleteCategoryFn } = useDeleteCategory();

  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const cancelRef = useRef(null);

  async function handleDeleteCategory() {
    await deleteCategoryFn(category.id);

    onCloseCancel();
  }

  return (
    <Tr py="10px" key={category.id}>
      <Th py="10px" w="66%">
        {category.name}
      </Th>
      <Th py="10px">
        <EditPopover category={category} />
      </Th>
      {isAdmin && (
        <Th py="10px">
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
                <Button onClick={handleDeleteCategory} colorScheme="red" ml={3}>
                  Confirmar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Th>
      )}
    </Tr>
  );
}
