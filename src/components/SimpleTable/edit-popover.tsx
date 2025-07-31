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

import { Input } from "../input";

export function EditPopover() {
  const [editText, setEditText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef(null);

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
        <Button colorScheme="teal">Salvar</Button>
      </PopoverContent>
    </Popover>
  );
}
