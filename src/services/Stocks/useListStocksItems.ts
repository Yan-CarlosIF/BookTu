import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { StockItem } from "@/shared/types/stockItem";

interface IResponse {
  data: StockItem[];
  total: number;
  page: number;
  lastPage: number;
}

export function useListStocksItems(page: number, sort?: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["stocks", page, sort],
    queryFn: async () => {
      const { data } = await api.get<IResponse>("/stocks", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
          establishmentId: sort,
        },
      });

      return data;
    },
  });
}
