import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast({
        title: "Usuário excluído com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: () => {
      toast({
        title: "Erro ao excluir usuário",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
