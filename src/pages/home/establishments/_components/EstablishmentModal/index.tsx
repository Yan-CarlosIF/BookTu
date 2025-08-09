import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import {
  Building,
  Building2,
  MapPinHouse,
  MapPinned,
  RectangleEllipsis,
  Warehouse,
} from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/input";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { formatCEP, formatCNPJ } from "@/helpers/formatInputs";
import { ICreateEstablishment } from "@/services/Establishments/useCreateEstablishment";
import { IEditEstablishment } from "@/services/Establishments/useEditEstablishment";
import { Establishment } from "@/shared/types/establishment";

interface Props {
  type: "add" | "edit";
  establishment?: Establishment;
  isOpen: boolean;
  onClose: () => void;
  mutateAsync: UseMutateAsyncFunction<
    any,
    unknown,
    ICreateEstablishment | IEditEstablishment,
    unknown
  >;
}

const cnpjMaskedRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const cepRegex = /^\d{5}-?\d{3}$/;

const establishmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cnpj: z
    .string()
    .regex(cnpjMaskedRegex, "CNPJ deve estar no formato 00.000.000/0000-00")
    .min(1, "CNPJ é obrigatório")
    .max(18, "CNPJ inválido"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  district: z.string().min(1, "Bairro é obrigatório"),
  cep: z
    .string()
    .regex(cepRegex, "CEP deve estar no formato 00000-000")
    .min(1, "CEP é obrigatório")
    .max(9, "CEP inválido"),
  description: z.string().optional(),
});

type EstablishmentFormData = z.infer<typeof establishmentSchema>;

export function AddEstablishmentModal({
  isOpen,
  onClose,
  type,
  establishment,
  mutateAsync,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EstablishmentFormData>({
    resolver: zodResolver(establishmentSchema),
    defaultValues: {
      name: establishment ? establishment.name : "",
      cnpj: establishment ? establishment.cnpj : "",
      state: establishment ? establishment.state : "",
      city: establishment ? establishment.city : "",
      district: establishment ? establishment.district : "",
      cep: establishment ? establishment.cep : "",
      description: establishment ? establishment.description : "",
    },
  });

  const { clearSelectedData } = useContext(TableCheckboxContext);

  async function onSubmit(data: EstablishmentFormData) {
    if (type === "add") {
      await mutateAsync({
        name: data.name,
        cnpj: data.cnpj,
        state: data.state,
        city: data.city,
        district: data.district,
        cep: data.cep,
        description: data.description,
      });
    }

    if (type === "edit") {
      await mutateAsync({
        id: establishment.id,
        data: {
          name: data.name,
          cnpj: data.cnpj,
          state: data.state,
          city: data.city,
          district: data.district,
          cep: data.cep,
          description: data.description,
        },
      });
    }

    reset();
    onClose();
    clearSelectedData();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          {type === "add" ? "Adicionar" : "Editar"} Estabelecimento
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Grid gridTemplateColumns="1fr 1fr" gap="4">
            <Input
              icon={Warehouse}
              label="Nome"
              name="name"
              placeholder="Nome do estabelecimento"
              isInvalid={!!errors.name}
              error={errors.name}
              {...register("name")}
            />

            <Input
              icon={Building}
              label="CNPJ"
              name="cnpj"
              placeholder="00.000.000/0000-00"
              isInvalid={!!errors.cnpj}
              error={errors.cnpj}
              {...register("cnpj", {
                onChange: (e) => {
                  e.target.value = formatCNPJ(e.target.value);
                },
              })}
            />

            <Input
              icon={MapPinned}
              label="Estado"
              name="state"
              placeholder="Estado do estabelecimento"
              isInvalid={!!errors.state}
              error={errors.state}
              {...register("state")}
            />

            <Input
              icon={Building2}
              label="Cidade"
              name="city"
              placeholder="Cidade do estabelecimento"
              isInvalid={!!errors.city}
              error={errors.city}
              {...register("city")}
            />

            <Input
              icon={MapPinHouse}
              label="Bairro"
              name="district"
              placeholder="Bairro do estabelecimento"
              isInvalid={!!errors.district}
              error={errors.district}
              {...register("district")}
            />

            <Input
              icon={RectangleEllipsis}
              label="CEP"
              name="cep"
              placeholder="00000-000"
              isInvalid={!!errors.cep}
              error={errors.cep}
              {...register("cep", {
                onChange: (e) => {
                  e.target.value = formatCEP(e.target.value);
                },
              })}
            />

            <FormControl
              isInvalid={!!errors.description}
              display="flex"
              flexDirection="column"
              gridColumn="span 2"
            >
              <FormLabel color="gray_800" htmlFor="description">
                Descrição (opcional)
              </FormLabel>

              <Textarea
                name="description"
                placeholder="Descrição do estabelecimento"
                errorBorderColor="failed"
                focusBorderColor="highlight_blue"
                borderColor="gray_500"
                bg="gray_300"
                color="gray_600"
                _placeholder={{ color: "gray_600", fontWeight: "medium" }}
                {...register("description")}
              />

              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button type="submit" colorScheme="teal">
            {type === "add" ? "Adicionar" : "Editar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
