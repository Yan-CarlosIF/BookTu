import { api } from "@/lib/axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import nookies from "nookies";

interface LoginSchema {
  login: string;
  password: string;
}

export function useLogin() {
  const toast = useToast();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const { token } = (
        await api.post<{ token: string }>("/auth/session", data)
      ).data;

      nookies.set(null, "auth.token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    },

    onSuccess: () => {
      toast({
        title: "Login realizado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },

    onError: () => {
      toast({
        title: "Login ou senha inválidos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
}
