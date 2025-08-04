import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  IdCard,
  Lock,
  RectangleEllipsis,
  UserRound,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/input";
import { useCreateUser } from "@/services/Users/useCreateUser";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const addUserSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  login: z.string().min(1, "Informe o login"),
  password: z.string().min(3, "Informe uma senha segura"),
  registration: z.string().min(1, "Informe a matrícula"),
  permission: z.enum(["admin", "operator"]),
  role: z.string().optional(),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const { mutateAsync: createUserFn } = useCreateUser();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
  });

  async function handleAddUser(data: AddUserFormData) {
    await createUserFn({
      name: data.name,
      login: data.login,
      password: data.password,
      registration: data.registration,
      permission: data.permission,
      role: data.role,
    });

    reset();
    onClose();
  }

  return (
    <Modal isCentered isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(handleAddUser)}
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap="28px"
          pb={6}
        >
          <Input
            icon={UserRound}
            label="Nome"
            name="name"
            placeholder="Nome do usuário"
            isInvalid={!!errors.name}
            error={errors.name}
            {...register("name")}
          />
          <Input
            icon={AtSign}
            label="Login"
            name="login"
            placeholder="Login do usuário"
            isInvalid={!!errors.login}
            error={errors.login}
            {...register("login")}
          />
          <Input
            icon={Lock}
            label="Senha"
            name="password"
            type="password"
            placeholder="Senha do usuário"
            isInvalid={!!errors.password}
            error={errors.password}
            {...register("password")}
          />
          <Input
            icon={RectangleEllipsis}
            label="Matrícula"
            name="registration"
            placeholder="Matrícula do usuário"
            isInvalid={!!errors.registration}
            error={errors.registration}
            {...register("registration")}
          />
          <Input
            icon={IdCard}
            label="Cargo (opcional)"
            name="role"
            placeholder="Cargo do usuário"
            isInvalid={!!errors.role}
            error={errors.role}
            {...register("role")}
          />

          <Flex direction="column" gap="8px">
            <Text fontWeight="medium" color="gray_800" textAlign="left">
              Permissão
            </Text>
            <Controller
              name="permission"
              control={control}
              render={({ field }) => (
                <Select
                  _focus={{
                    ring: `${!!errors.permission ? "1px" : "2px"}`,
                    ringColor: !!errors.permission ? "red" : "highlight_blue",
                  }}
                  borderColor="gray_500"
                  bg="gray_300"
                  fontWeight="medium"
                  color="gray_600"
                  isInvalid={!!errors.permission}
                  {...field}
                  placeholder="Selecione uma permissão"
                >
                  <option value="operator">Operador</option>
                  <option value="admin">Administrador</option>
                </Select>
              )}
            />
          </Flex>

          <Button
            py={7}
            colorScheme="teal"
            type="submit"
            fontSize="lg"
            isLoading={isSubmitting}
            gridColumn="1 / -1"
          >
            Adicionar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
