import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

export function useDeleteInventory() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: response } = await api.delete(`/inventories/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });

      toast({
        title: "Inventário excluído com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title: response.status === 500 ? "Erro ao excluir inventário" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
