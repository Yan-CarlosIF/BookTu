import { Category } from "@/shared/types/category";
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { ChartBarStacked, Plus } from "lucide-react";
import { Input } from "../input";
import { Pagination } from "../Pagination/pagination";
import { SimpleTableItem } from "./simple-table-item";

interface SimpleTableProps {
  data: {
    categories: Category[];
    total: number;
    page: number;
    lastPage: number;
  };
}

export function SimpleTable({ data }: SimpleTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TableContainer mt="40px">
        <Table borderWidth={1} borderColor="gray.200">
          <Thead bg="gray_300">
            <Tr>
              <Th>Nome</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.categories.map((category) => (
              <SimpleTableItem key={category.id} category={category} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex px="40px" mt="40px" align="center" justify="space-between">
        <Text color="gray_800" fontWeight="medium">
          Página {data?.page} de {data?.lastPage}
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
                icon={ChartBarStacked}
                label="Nome da categoria"
                placeholder="Insira o nome nova categoria"
              />
            </ModalBody>

            <ModalFooter>
              <Button
                color="gray_800"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button colorScheme="teal">Adicionar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Pagination
          w="fit-content"
          currentPage={data.page}
          lastPage={data.lastPage}
        />
      </Flex>
    </>
  );
}
