import {
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
import { useForm } from "react-hook-form";
import { z } from "zod";

import { HomeLayout } from "@/components/Home/layout";
import { BookSelector } from "@/components/pages/inventories/inventory/book-selector";
import { CancelDialog } from "@/components/pages/inventories/inventory/cancel-dialog";
import { SelectedBooksTableItem } from "@/components/pages/inventories/inventory/selected-books-table-item";
import { api } from "@/lib/axios";
import { NextPageWithLayout } from "@/pages/_app";
import { useListAllBooks } from "@/services/Books/useListAllBooks";
import { useListAllEstablishments } from "@/services/Establishments/useListAllEstablishments";
import { useCreateInventory } from "@/services/Inventories/useCreateInventory";
import { useEditInventory } from "@/services/Inventories/useEditInventory";
import { Inventory } from "@/shared/types/inventory";
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
  inventory: Inventory | null;
}

const CreateInventoryPage: NextPageWithLayout<CreateInventoryPageProps> = ({
  id,
  inventory,
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
      establishment_id: inventory ? inventory.establishment_id : "",
      total_quantity: inventory ? inventory.total_quantity : 0,
      inventoryBooks: inventory
        ? inventory.books.map((b) => ({
            book_id: b.book_id,
            quantity: b.quantity,
          }))
        : [],
    },
  });

  const disclosure = useDisclosure();

  const { mutateAsync: createInventoryFn } = useCreateInventory();
  const { mutateAsync: editInventoryFn } = useEditInventory();

  const { data: establishments } = useListAllEstablishments();

  const { data: booksList } = useListAllBooks();

  const inventoryBooks = watch("inventoryBooks");
  const establishmentId = watch("establishment_id");

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

    if (!id) {
      await createInventoryFn({
        establishment_id: data.establishment_id,
        inventoryBooks: data.inventoryBooks,
        total_quantity: totalQuantity,
      });

      reset();
    }

    if (id) {
      await editInventoryFn({
        id,
        inventoryBooks: data.inventoryBooks,
      });
    }
  }

  function getSelectedEstablishment() {
    return (
      establishments?.find((e) => e.id === establishmentId)?.name ??
      "Selecionar Estabelecimento"
    );
  }

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
              <MenuButton
                as={Button}
                w="100%"
                borderColor="gray_500"
                variant="outline"
              >
                {getSelectedEstablishment()}
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
          <Box bg="gray.50" borderBottom="1px" borderColor="gray.200">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th w="10%">Identificador</Th>
                  <Th w="35%" textAlign="center">
                    Título
                  </Th>
                  <Th>Quantidade</Th>
                  <Th w="10%"></Th>
                </Tr>
              </Thead>
            </Table>
          </Box>

          <Box maxH="500px" overflowY="auto">
            <Table size="sm">
              <Tbody>
                {inventoryBooks.length === 0 ? (
                  <Tr>
                    <Td fontSize="md" colSpan={3} textAlign="center" py={8}>
                      Nenhum livro adicionado
                    </Td>
                  </Tr>
                ) : (
                  inventoryBooks.map((book) => {
                    const bookInfo = booksList?.find(
                      (b) => b.id === book.book_id
                    );
                    return (
                      <SelectedBooksTableItem
                        key={book.book_id}
                        book={{
                          ...bookInfo,
                          quantity: book.quantity,
                        }}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveBook={handleRemoveBook}
                      />
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
              onClick={() => disclosure.onOpen()}
              isDisabled={isSubmitting}
            >
              Limpar
            </Button>
            <CancelDialog disclosure={disclosure} reset={reset} />
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
  const token = ctx.req.cookies["auth.token"];
  const { id = null } = ctx.query;

  if (!id) {
    return {
      props: {
        id: null,
        inventory: null,
      },
    };
  }

  try {
    const { data: inventory } = await api.get<Inventory>(`/inventories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: {
        id: id as string,
        inventory: inventory || null,
      },
    };
  } catch {
    return {
      props: {
        id: null,
        inventory: null,
      },
      redirect: {
        destination: "/home/inventories",
        permanent: false,
      },
    };
  }
});

export default CreateInventoryPage;
