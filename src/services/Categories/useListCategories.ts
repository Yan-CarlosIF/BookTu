import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { Category } from "@/shared/types/category";

import { api } from "../../lib/axios";

interface IResponse {
  categories: Category[];
  total: number;
  page: number;
  lastPage: number;
}

export function UseListCategories(page: number, sort: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["categories", page, sort],
    queryFn: async () => {
      const { data } = await api.get<IResponse>("/categories", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
          sort,
        },
      });

      return data;
    },

    staleTime: 1000 * 60,
  });
}
