import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { api } from "@/lib/axios";

type UserAdmin = {
  name: string;
  isAdmin: boolean;
};

type IUserResponse = {
  id: string;
  name: string;
  registration: string;
  login: string;
  role: string;
  permission: "admin" | "operator";
};

export function ensureUserAdmin<T>(
  handler: (
    ctx: GetServerSidePropsContext,
    user: UserAdmin
  ) => Promise<{ props: T }>
): GetServerSideProps {
  return async (ctx) => {
    const { req } = ctx;

    const token = req.cookies["auth.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      const response = await api.get<IUserResponse>("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;

      if (user?.permission !== "admin") {
        return {
          redirect: {
            destination: "/home/establishments",
            permanent: false,
          },
        };
      }

      return await handler(ctx, {
        name: user?.name,
        isAdmin: user?.permission === "admin",
      });
    } catch (err) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
