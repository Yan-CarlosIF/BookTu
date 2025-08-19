import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { InventoryBook } from "@/shared/types/inventory-book";

interface IResponse {
  books: InventoryBook[];
  total: number;
  page: number;
  lastPage: number;
}

export function useListInventoryBooks(page: number, id: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["inventories", id, page],
    queryFn: async () => {
      const { data } = await api.get<IResponse>(`/inventories/${id}/books`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
        },
      });

      return data;
    },
  });
}
