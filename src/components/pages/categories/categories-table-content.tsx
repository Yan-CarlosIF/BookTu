import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChartBarStacked, Plus } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/input";
import { Pagination } from "@/components/Pagination/pagination";
import { useCreateCategory } from "@/services/Categories/useCreateCategory";

interface CategoriesTableContentProps {
  page: number;
  lastPage: number;
}

export function CategoriesTableContent({
  lastPage,
  page,
}: CategoriesTableContentProps) {
  const { mutateAsync } = useCreateCategory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");

  async function handleCreateCategory() {
    await mutateAsync(name);
    setName("");
    onClose();
  }

  return (
    <Flex px="40px" mt="40px" align="center" justify="space-between">
      <Text color="gray_800" fontWeight="medium">
        Página {page} de {lastPage}
      </Text>

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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              icon={ChartBarStacked}
              label="Nome da categoria"
              placeholder="Insira o nome nova categoria"
            />
          </ModalBody>

          <ModalFooter>
            <Button color="gray_800" variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCategory} colorScheme="teal">
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Pagination w="fit-content" currentPage={page} lastPage={lastPage} />
    </Flex>
  );
}
