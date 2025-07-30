import { api } from "@/lib/axios";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

export function useDeleteBooks() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      toast({
        title: "Livro excluído com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: () => {
      toast({
        title: "Erro ao excluir livro",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
