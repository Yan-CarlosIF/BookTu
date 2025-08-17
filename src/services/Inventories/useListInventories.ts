import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Inventory } from "@/shared/types/inventory";

interface IResponse {
  data: Inventory[];
  total: number;
  page: number;
  lastPage: number;
}

export function useListInventories(
  page: number,
  sort?: string,
  search?: string
) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["inventories", page, sort, search],
    queryFn: async () => {
      const response = await api.get<IResponse>("/inventories", {
        params: {
          page,
          establishmentId: sort,
          search,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response.data;
    },

    enabled: !!token,
  });
}
