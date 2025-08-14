import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Book } from "@/shared/types/book";

export function useListAllBooks() {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await api.get<Book[]>("/books/all", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return data;
    },
  });
}
