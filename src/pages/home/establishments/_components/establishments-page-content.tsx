import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { Pagination } from "@/components/Pagination/pagination";

import { AddEstablishmentModal } from "./EstablishmentModal";

interface EstablishmentsTableContentProps {
  page: number;
  lastPage: number;
}

export function EstablishmentsPageContent({
  lastPage,
  page,
}: EstablishmentsTableContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <AddEstablishmentModal isOpen={isOpen} onClose={onClose} />

      <Pagination w="fit-content" currentPage={page} lastPage={lastPage} />
    </Flex>
  );
}
