import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Establishment } from "@/shared/types/establishment";

export function useListAllEstablishments() {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["establishments"],
    queryFn: async () => {
      const { data } = await api.get<Establishment[]>("/establishments/all", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return data;
    },
  });
}
