import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { Book } from "@/shared/types/book";

export function useGetBook(id: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await api.get<Book>(`/books/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return data;
    },
  });
}
