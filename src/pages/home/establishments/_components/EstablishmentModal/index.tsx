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
import {
  Building,
  Building2,
  MapPinHouse,
  MapPinned,
  RectangleEllipsis,
  Warehouse,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const establishmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  district: z.string().min(1, "Bairro é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
  description: z.string().optional(),
});

type EstablishmentFormData = z.infer<typeof establishmentSchema>;

export function AddEstablishmentModal({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EstablishmentFormData>({
    resolver: zodResolver(establishmentSchema),
  });

  function onSubmit(data: EstablishmentFormData) {
    console.log("Estabelecimento criado:", data);
    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Adicionar Estabelecimento</ModalHeader>
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
              placeholder="CNPJ do estabelecimento"
              isInvalid={!!errors.cnpj}
              error={errors.cnpj}
              {...register("cnpj")}
            />

            <Input
              icon={MapPinHouse}
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
              icon={MapPinned}
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
              placeholder="CEP do estabelecimento"
              isInvalid={!!errors.cep}
              error={errors.cep}
              {...register("cep")}
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
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
