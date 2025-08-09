import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Establishment } from "@/shared/types/establishment";

export interface IEditEstablishment {
  id: string;
  data: Partial<Omit<Establishment, "id">>;
}

export function useEditEstablishment() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = nookies.get(null)["auth.token"];

  return useMutation({
    mutationFn: async ({ id, data }: IEditEstablishment) => {
      const { data: response } = await api.patch(
        `/establishments/${id}`,
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishments"] });

      toast({
        title: "Estabelecimento editado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },

    onError: ({ response }) => {
      const { message } = response.data;

      toast({
        title:
          response.status === 500 ? "Erro ao editar estabelecimento" : message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
