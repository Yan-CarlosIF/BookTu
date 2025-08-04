import nookies from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/lib/axios";
import { User } from "@/shared/types/users";

interface IUserContext {
  user: User | null;
  isLoading: boolean;
}

export const userContext = createContext({} as IUserContext);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const token = nookies.get(null)["auth.token"];

  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  return (
    <userContext.Provider value={{ user, isLoading: loading }}>
      {children}
    </userContext.Provider>
  );
}
