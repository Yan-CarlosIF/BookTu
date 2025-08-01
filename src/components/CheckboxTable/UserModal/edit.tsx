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
import { AtSign, IdCard, RectangleEllipsis, UserRound } from "lucide-react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/input";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { useEditUser } from "@/services/Users/useEditUser";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const editUserSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  login: z.string().min(1, "Informe o login"),
  registration: z.string().min(1, "Informe a matrícula"),
  permission: z.enum(["admin", "operator"]),
  role: z.string().optional(),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

export function EditUserModal({ isOpen, onClose }: EditUserModalProps) {
  const { mutateAsync: editUserFn } = useEditUser();
  const {
    selectedUsers: [user],
    setSelectedUsers,
  } = useContext(TableCheckboxContext);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name,
      login: user?.login,
      registration: user?.registration,
      permission: user?.permission,
      role: user?.role,
    },
  });

  async function handleEditUser(data: EditUserFormData) {
    reset();
    await editUserFn({
      id: user.id,
      data: {
        name: data.name,
        login: data.login,
        registration: data.registration,
        permission: data.permission,
        role: data.role,
      },
    });

    setSelectedUsers([]);
    onClose();
  }

  return (
    <Modal isCentered isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(handleEditUser)}
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
            Salvar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
