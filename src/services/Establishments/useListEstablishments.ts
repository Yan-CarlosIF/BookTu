import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Establishment } from "@/shared/types/establishment";

interface IResponse {
  establishments: Establishment[];
  total: number;
  page: number;
  lastPage: number;
}

export function useListEstablishments(page: number, search?: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["establishments", page, search],
    queryFn: async () => {
      const { data } = await api.get<IResponse>("/establishments", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
          search,
        },
      });

      return data;
    },
  });
}
