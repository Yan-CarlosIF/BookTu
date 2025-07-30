import { Category } from "@/shared/types/category";
import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "../lib/axios";

export function useAllCategories() {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<Category[]>("/categories/all", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return data;
    },

    staleTime: 1000 * 60,
  });
}
