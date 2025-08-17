import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

export function useProcessInventory() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: response } = await api.post(`/inventories/process/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });

      toast({
        title: "Inventário processado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title:
          response.status === 500 ? "Erro ao processar inventário" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
