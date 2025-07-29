import {
  FormControl,
  FormLabel,
  Icon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import {
  Book,
  Calendar,
  DollarSign,
  ScrollText,
  UserRound,
} from "lucide-react";
import { Input } from "../../input";
import { CategoriesCheckboxList } from "./categories-menu";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="1000px">
        <ModalHeader color="gray_800">Adicionar Livro</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="grid" gridTemplateColumns="2fr" gap="20px" pb={6}>
          <Input icon={Book} label="Título" name="title" placeholder="Título" />
          <Input
            icon={UserRound}
            label="Autor"
            name="author"
            placeholder="Autor"
          />
          <Input
            icon={Calendar}
            label="Ano de Lançamento"
            name="release_year"
            placeholder="Ano"
          />
          <FormControl display="flex" flexDirection="column">
            <FormLabel htmlFor="price">Preço</FormLabel>
            <NumberInput name="price" placeholder="Preço" min={0.1}>
              <InputLeftElement>
                <Icon as={DollarSign} color="gray_600" fontSize={20} />
              </InputLeftElement>
              <NumberInputField
                borderColor="gray_500"
                bg="gray_300"
                _focus={{ borderColor: "highlight_blue", borderWidth: "2px" }}
                color="gray_600"
                placeholder="Preço"
                _placeholder={{ color: "gray_600", fontWeight: "medium" }}
                pl="40px"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Input
            icon={ScrollText}
            label="Descrição"
            name="description"
            placeholder="Descrição"
          />
          <CategoriesCheckboxList />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
