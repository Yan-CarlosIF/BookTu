import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

import { api } from "@/lib/axios";
import { User } from "@/shared/types/users";

interface IResponse {
  users: User[];
  total: number;
  page: number;
  lastPage: number;
}

export function useListUsers(page: number, sort?: string, search?: string) {
  const token = nookies.get(null)["auth.token"];

  return useQuery({
    queryKey: ["users", page, sort, search],
    queryFn: async () => {
      const { data } = await api.get<IResponse>("/users", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
          sort,
          search,
        },
      });

      return data;
    },
  });
}
