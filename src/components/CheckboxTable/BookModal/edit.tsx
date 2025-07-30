import { InputNumber } from "@/components/input-number";
import { useCheckboxToggle } from "@/hooks/checkboxToggle";
import { useAllCategories } from "@/services/Categories/useAllCategories";
import { Category } from "@/shared/types/category";
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
import {
  Book as BookIcon,
  Calendar,
  DollarSign,
  UserRound,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../input";
import { CategoriesCheckboxList } from "./categories-menu";
import { useGetBook } from "@/services/Books/useGetBook";
import { useEditBook } from "@/services/Books/useEditBook";
import { useEffect } from "react";

interface EditBookModalProps {
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
  setSelectedData: (data: string[]) => void;
}

const editBookSchema = z.object({
  title: z.string().nonempty("Informe o título"),
  author: z.string().nonempty("Informe o autor"),
  release_year: z.coerce
    .number()
    .min(1, "Informe o ano de publicação")
    .max(2026, "Ano inválido"),
  price: z.coerce.number().min(0.1, "Preço inválido"),
  description: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
});

type EditBookFormData = z.infer<typeof editBookSchema>;

export function EditBookModal({
  bookId,
  isOpen,
  onClose,
  setSelectedData: clearSelected,
}: EditBookModalProps) {
  const { data: book } = useGetBook(bookId);
  const { mutateAsync: editBookFn } = useEditBook();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditBookFormData>({
    // @ts-ignore
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      categoryIds: [],
      release_year: 0,
      price: 0,
    },
  });

  const { data } = useAllCategories();
  const categories = data || [];

  const title = watch("title");
  const author = watch("author");
  const release_year = watch("release_year");
  const price = watch("price");
  const description = watch("description");

  const { selectedData, setSelectedData } = useCheckboxToggle<Category>({
    data: categories,
  });

  async function handleEditBook(data: EditBookFormData) {
    reset();
    await editBookFn({ id: bookId, data });
    clearSelected([]);
  }

  useEffect(() => {
    if (book) {
      reset({
        categoryIds: book.categories.map((category) => category.id),
        release_year: book.release_year,
        price: book.price,
        description: book.description,
        title: book.title,
        author: book.author,
      });
      setSelectedData(book.categories.map((category) => category.id));
    }
  }, [book, reset]);

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray_800">Editar Livro</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(() =>
            handleEditBook({
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
            h="130px"
            maxH="130px"
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
            Editar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
