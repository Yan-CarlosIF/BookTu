import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";
import { type } from "os";

import { api } from "@/lib/axios";
import { User } from "@/shared/types/users";

type IEditUser = { id: string; data: Omit<User, "id"> };

export function useEditUser() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async ({ id, data }: IEditUser) => {
      await api.patch(`/users/${id}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast({
        title: "Usuário editado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: () => {
      toast({
        title: "Erro ao editar usuário",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
