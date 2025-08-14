import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  NumberInputField,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { HomeLayout } from "@/components/Home/layout";
import { BookSelector } from "@/components/pages/inventories/inventory/book-selector";
import { NextPageWithLayout } from "@/pages/_app";
import { useListAllBooks } from "@/services/Books/useListAllBooks";
import { useListAllEstablishments } from "@/services/Establishments/useListAllEstablishments";
import { withAuthServerSideProps } from "@/utils/withAuth";

const createInventorySchema = z.object({
  establishment_id: z
    .string()
    .uuid("Selecione um estabelecimento")
    .min(1, "Selecione um estabelecimento"),
  total_quantity: z.number().int(),
  inventoryBooks: z.array(
    z.object({
      book_id: z.string().uuid(),
      quantity: z.number().int().min(1, "Quantidade mínima é 1"),
    })
  ),
});

type CreateInventoryData = z.infer<typeof createInventorySchema>;

interface CreateInventoryPageProps {
  id?: string | null;
}

const CreateInventoryPage: NextPageWithLayout<CreateInventoryPageProps> = ({
  id,
}) => {
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateInventoryData>({
    resolver: zodResolver(createInventorySchema),
    defaultValues: {
      establishment_id: "",
      total_quantity: 0,
      inventoryBooks: [],
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: establishments } = useListAllEstablishments();

  const { data: booksList } = useListAllBooks();

  const inventoryBooks = watch("inventoryBooks");

  const totalQuantity = inventoryBooks.reduce(
    (acc, book) => acc + book.quantity,
    0
  );

  function handleAddBook(book_id: string) {
    if (!book_id) return;

    const alreadyExists = inventoryBooks.some((b) => b.book_id === book_id);
    if (alreadyExists) return;

    setValue("inventoryBooks", [...inventoryBooks, { book_id, quantity: 1 }]);
  }

  function handleUpdateQuantity(book_id: string, quantity: number) {
    const updated = inventoryBooks.map((b) =>
      b.book_id === book_id ? { ...b, quantity } : b
    );

    setValue("inventoryBooks", updated);
  }

  function handleRemoveBook(book_id: string) {
    const updated = inventoryBooks.filter((b) => b.book_id !== book_id);
    setValue("inventoryBooks", updated);
  }

  async function onSubmit(data: CreateInventoryData) {
    console.log("Enviando para o backend:", {
      ...data,
      total_quantity: totalQuantity,
    });
  }

  const cancelRef = useRef();

  return (
    <Box mx="100px" px="100px" pb="100px" mt="100px">
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={4} mb={4}>
          <FormControl
            isInvalid={!!errors.establishment_id}
            isRequired={!!errors.establishment_id}
          >
            <FormLabel>Estabelecimento</FormLabel>
            <Menu>
              <MenuButton as={Button} w="100%" variant="outline">
                {watch("establishment_id")
                  ? establishments?.find(
                      (e) => e.id === watch("establishment_id")
                    )?.name
                  : "Selecionar Estabelecimento"}
              </MenuButton>
              <MenuList maxH="150px" overflowY="auto">
                {establishments?.map((est) => (
                  <MenuItem
                    key={est.id}
                    onClick={() => setValue("establishment_id", est.id)}
                  >
                    {est.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {!!errors.establishment_id?.message && (
              <FormErrorMessage color="red.500" fontSize="sm">
                {errors.establishment_id.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Adicionar Livro</FormLabel>
            <BookSelector
              books={booksList}
              selectedBooks={inventoryBooks.map((b) => b.book_id)}
              onSelectBook={handleAddBook}
            />
          </FormControl>
        </Flex>
        <Box borderWidth="1px" borderRadius="md" overflow="hidden">
          {/* Header fixo da tabela */}
          <Box bg="gray.50" borderBottom="1px" borderColor="gray.200">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Título</Th>
                  <Th>Quantidade</Th>
                  <Th w="100px"></Th>
                </Tr>
              </Thead>
            </Table>
          </Box>

          {/* Container com scroll para o body da tabela */}
          <Box maxH="500px" overflowY="auto">
            <Table size="sm">
              <Tbody>
                {inventoryBooks.length === 0 ? (
                  <Tr>
                    <Td colSpan={3} textAlign="center" py={8}>
                      Nenhum livro adicionado
                    </Td>
                  </Tr>
                ) : (
                  inventoryBooks.map((book) => {
                    const bookInfo = booksList.find(
                      (b) => b.id === book.book_id
                    );
                    return (
                      <Tr key={book.book_id}>
                        <Td>{bookInfo?.title}</Td>
                        <Td>
                          <NumberInput
                            size="sm"
                            w="fit-content"
                            min={1}
                            value={book.quantity}
                            onChange={(val) =>
                              handleUpdateQuantity(book.book_id, Number(val))
                            }
                          >
                            <NumberInputField />
                          </NumberInput>
                        </Td>
                        <Td w="100px">
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => handleRemoveBook(book.book_id)}
                          >
                            Remover
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>

        <Flex justify="space-between" mt={4}>
          <Text fontWeight="bold">Total de Produtos: {totalQuantity}</Text>
          <Flex gap={2}>
            <Button
              variant="outline"
              onClick={() => onOpen()}
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
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
            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
              {id ? "Editar" : "Criar"} Inventário
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

CreateInventoryPage.getLayout = (page, { id }) => {
  return (
    <HomeLayout slug={`${id ? "Editar" : "Criar"} inventário`}>
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthServerSideProps(async (ctx) => {
  const { id = null } = ctx.query;

  return {
    props: {
      id,
    },
  };
});

export default CreateInventoryPage;
