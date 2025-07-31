import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Book } from "@/shared/types/book";

interface IResponse {
  books: Book[];
  total: number;
  page: number;
  lastPage: number;
}

export function UseListBooks(page: number, sort: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["books", page, sort],
    queryFn: async () => {
      const { data } = await api.get<IResponse>("/books", {
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
