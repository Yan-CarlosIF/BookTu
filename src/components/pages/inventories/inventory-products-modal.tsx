import {
  Badge,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Pagination } from "@/components/Pagination/pagination";
import { useListInventoryBooks } from "@/services/Inventories/useListInventoryBooks";
import { Inventory } from "@/shared/types/inventory";
import { formatPriceIntoBRL } from "@/utils/format";

import { TooltipCategories } from "../books/tooltip-categories";

interface InventoryProductsModalProps {
  inventory: Inventory;
  disclosure: UseDisclosureReturn;
}

export function InventoryProductsModal({
  inventory,
  disclosure: { isOpen, onClose },
}: InventoryProductsModalProps) {
  const router = useRouter();

  const { data, isLoading } = useListInventoryBooks(
    Number(router.query.prodPage) || 1,
    inventory.id
  );

  const inventoryBooks = data?.books;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent maxW="70vw">
        <ModalHeader borderBottomWidth="1px">
          Livros do Inventário {inventory.identifier}
          {isLoading ? (
            <Text>
              <Skeleton h="20px" w="200px" noOfLines={1} />
            </Text>
          ) : (
            <Text fontSize="sm" color="gray.500">
              {data.total} livro
              {data.total === 1 ? "" : "s"} no total
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p={0}>
          <Box rounded={"md"} maxH="600px" overflowY="auto">
            <Table variant="striped" colorScheme="gray">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Identificador</Th>
                  <Th>Título</Th>
                  <Th>Categoria(s)</Th>
                  <Th isNumeric>Quantidade</Th>
                  <Th isNumeric>Ano de Lançamento</Th>
                  <Th isNumeric>Preço (R$)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  <Tr>
                    <Td colSpan={6}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  inventoryBooks.map((product) => (
                    <Tr key={product.id}>
                      <Td>
                        <Badge colorScheme="blackAlpha">
                          {product.book.identifier}
                        </Badge>
                      </Td>
                      <Td>{product.book.title}</Td>
                      <Td
                        color={
                          product.book.categories.length === 0
                            ? "gray.400"
                            : "gray_800"
                        }
                      >
                        {product?.book?.categories.length === 0 ? (
                          "Nenhuma categoria"
                        ) : (
                          <TooltipCategories
                            categories={product.book.categories}
                          />
                        )}
                      </Td>
                      <Td isNumeric>{product.quantity}</Td>
                      <Td isNumeric>{product.book.release_year || "-"}</Td>
                      <Td isNumeric>
                        {formatPriceIntoBRL(product.book.price)}
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
        <ModalFooter margin="auto">
          <Pagination
            withState
            w="fit-content"
            currentPage={Number(router.query.prodPage) || 1}
            lastPage={data?.lastPage}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
