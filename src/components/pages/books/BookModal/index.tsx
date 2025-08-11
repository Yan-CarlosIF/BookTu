import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import {
  Book as BookIcon,
  Calendar,
  DollarSign,
  UserRound,
} from "lucide-react";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { InputNumber } from "@/components/input-number";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { useSelectToggle } from "@/hooks/selectToggle";
import { ICreateBook } from "@/services/Books/useCreateBook";
import { IEditBook } from "@/services/Books/useEditBook";
import { useAllCategories } from "@/services/Categories/useAllCategories";
import { Book } from "@/shared/types/book";
import { Category } from "@/shared/types/category";

import { Input } from "../../../input";
import { CategoriesCheckboxList } from "./categories-menu";

interface BookModalProps {
  action: "edit" | "add";
  isOpen: boolean;
  onClose: () => void;
  mutateAsync: UseMutateAsyncFunction<
    void,
    unknown,
    IEditBook | ICreateBook,
    unknown
  >;
}

const bookSchema = z.object({
  title: z.string().min(1, "Informe o título"),
  author: z.string().min(1, "Informe o autor"),
  release_year: z.coerce
    .number()
    .min(1, "Informe o ano de publicação")
    .max(2026, "Ano inválido"),
  price: z.coerce.number().min(0.1, "Preço inválido"),
  description: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

export function BookModal({
  isOpen,
  onClose,
  action,
  mutateAsync,
}: BookModalProps) {
  const { data } = useAllCategories();
  const categories = data || [];

  const {
    selectedData: [book],
    setSelectedData: setSelectedBooks,
  } = useContext(TableCheckboxContext);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      categoryIds: [],
      release_year: 0,
      price: 0,
    },
  });

  const title = watch("title");
  const author = watch("author");
  const release_year = watch("release_year");
  const price = watch("price");
  const description = watch("description");

  const { selectedData, setSelectedData } = useSelectToggle<Category>({
    data: categories,
  });

  async function handleActionBook(data: BookFormData) {
    if (action === "add") {
      await mutateAsync(data as ICreateBook);
    } else {
      await mutateAsync({
        id: book.id,
        data,
      } as IEditBook);
    }

    reset();
    setSelectedBooks([]);
  }

  useEffect(() => {
    if (book && action === "edit") {
      const selectedBook = book as Book;

      reset({
        categoryIds: selectedBook.categories.map((category) => category.id),
        release_year: selectedBook.release_year,
        price: selectedBook.price,
        description: selectedBook.description,
        title: selectedBook.title,
        author: selectedBook.author,
      });
      setSelectedData(selectedBook.categories.map((category) => category.id));
    }
  }, [book, reset, setSelectedData, action]);

  return (
    <Modal isCentered isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray_800">
          {action === "add" ? "Adicionar" : "Editar"} Livro
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(() =>
            handleActionBook({
              categoryIds: selectedData,
              title,
              author,
              release_year: Number(release_year),
              price: Number(price),
              description,
            })
          )}
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap="28px"
          pb={6}
        >
          <Input
            icon={BookIcon}
            label="Título"
            name="title"
            placeholder="Título"
            isInvalid={!!errors.title}
            error={errors.title}
            {...register("title")}
          />
          <Input
            icon={UserRound}
            label="Autor"
            name="author"
            placeholder="Autor"
            isInvalid={!!errors.author}
            error={errors.author}
            {...register("author")}
          />
          <Controller
            control={control}
            name="release_year"
            render={({ field }) => (
              <InputNumber
                {...field}
                onChange={(value) => field.onChange(value)}
                label="Ano de publicação"
                name="release_year"
                icon={Calendar}
                error={errors.release_year}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <InputNumber
                {...field}
                onChange={(value) => field.onChange(value)}
                label="Preço"
                name="price"
                icon={DollarSign}
                error={errors.price}
              />
            )}
          />

          <Input
            minH="40px"
            h="140px"
            maxH="140px"
            as="textarea"
            p="8px"
            label="Descrição (opcional)"
            name="description"
            placeholder="Escreva uma descrição para livro"
            isInvalid={!!errors.description}
            error={errors.description}
            {...register("description")}
          />
          <CategoriesCheckboxList
            selectedData={selectedData}
            categories={categories}
            setSelectedData={setSelectedData}
          />
          <Button
            py={7}
            colorScheme="teal"
            type="submit"
            fontSize="lg"
            onClick={onClose}
            isLoading={isSubmitting}
            gridColumn="1 / -1"
          >
            {action === "edit" ? "Editar" : "Adicionar"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
