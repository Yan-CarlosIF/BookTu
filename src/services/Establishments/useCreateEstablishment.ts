import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Establishment } from "@/shared/types/establishment";

export type ICreateEstablishment = Omit<Establishment, "id">;

export function useCreateEstablishments() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async (data: ICreateEstablishment) => {
      const { data: response } = await api.post("/establishments", data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });

      toast({
        title: "Estabelecimento cadastrado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title:
          response.status === 500
            ? "Erro ao cadastrar estabelecimento"
            : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
