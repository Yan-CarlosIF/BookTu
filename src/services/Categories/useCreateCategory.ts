import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (name: string) => {
      const { data: response } = await api.post(
        "/categories",
        { name },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast({
        title: "Categoria cadastrada com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title:
          response.status === 500 ? "Erro ao cadastrar categoria" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
