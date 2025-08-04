import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Input } from "@/components/input";
import { useEditCategory } from "@/services/Categories/useEditCategory";
import { Category } from "@/shared/types/category";

interface EditPopoverProps {
  category: Category;
}

export function EditPopover({ category }: EditPopoverProps) {
  const [editText, setEditText] = useState(category.name);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef(null);

  const { mutateAsync: editCategoryFn } = useEditCategory();

  async function handleEditCategory() {
    await editCategoryFn({ id: category.id, name: editText });

    setEditText("");
    onClose();
  }

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button rightIcon={<EditIcon size={16} />} size="sm" colorScheme="teal">
          Editar
        </Button>
      </PopoverTrigger>
      <PopoverContent _focus={{ ringColor: "transparent" }} gap="10px" p={3}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Edite o nome da categoria</PopoverHeader>
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          fontSize="sm"
          placeholder="Nome da categoria"
        />
        <Button onClick={handleEditCategory} colorScheme="teal">
          Salvar
        </Button>
      </PopoverContent>
    </Popover>
  );
}
