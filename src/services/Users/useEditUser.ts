import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { User } from "@/shared/types/users";

type IEditUser = { id: string; data: Omit<User, "id"> };

export function useEditUser() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async ({ id, data }: IEditUser) => {
      const { data: response } = await api.patch(`/users/${id}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response;
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

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title: response.status === 500 ? "Erro ao editar usuário" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
