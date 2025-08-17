import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

export interface IEditBook {
  id: string;
  data: {
    title?: string;
    author?: string;
    release_year?: number;
    price?: number;
    description?: string;
    categoryIds?: string[];
  };
}

export function useEditBook() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async ({ id, data }: IEditBook) => {
      const { data: response } = await api.patch(`/books/${id}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      toast({
        title: "Livro editado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title: response.status === 500 ? "Erro ao editar livro" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
