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
      const { data } = await api.post(
        "/categories",
        { name },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return data;
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

    onError: ({ response: { data } }) => {
      if (data.message === "Category already exists") {
        return toast({
          title: "Categoria já cadastrada",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      toast({
        title: "Erro ao cadastrar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
