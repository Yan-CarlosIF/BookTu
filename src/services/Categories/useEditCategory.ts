import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";

interface IEditCategory {
  id: string;
  name: string;
}

export function useEditCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async ({ id, name }: IEditCategory) => {
      const { data } = await api.patch(
        `/categories/${id}`,
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
        title: "Categoria editada com sucesso",
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
        title: "Erro ao editar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
