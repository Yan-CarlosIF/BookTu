import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

interface IRequest {
  establishment_id: string;
  total_quantity: number;
  inventoryBooks: { book_id?: string; quantity?: number }[];
}

export function useCreateInventory() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (data: IRequest) => {
      const { data: response } = await api.post("/inventories", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });

      toast({
        title: "Inventário criado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title: response.status === 500 ? "Erro ao criar inventário" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
