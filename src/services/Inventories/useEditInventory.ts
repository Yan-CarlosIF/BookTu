import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

interface IRequest {
  id: string;
  inventoryBooks: { book_id?: string; quantity?: number }[];
}

export function useEditInventory() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async ({ id, inventoryBooks }: IRequest) => {
      console.log(inventoryBooks);
      const { data: response } = await api.put(
        `/inventories/${id}`,
        {
          inventoryBooks: [...inventoryBooks],
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });

      toast({
        title: "Inventário editado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title: response.status === 500 ? "Erro ao editar inventário" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
