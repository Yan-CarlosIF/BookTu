import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { User } from "@/shared/types/users";

interface ICreateUser extends Omit<User, "id"> {
  password: string;
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (data: ICreateUser) => {
      await api.post("/users", data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast({
        title: "Usuário cadastrado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: () => {
      toast({
        title: "Erro ao cadastrar usuário",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
