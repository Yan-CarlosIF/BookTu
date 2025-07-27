import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { api } from "@/lib/axios";

type WithAuthResult = {
  name: string;
};

export function withAuthServerSideProps<T>(
  handler: (
    ctx: GetServerSidePropsContext,
    user: WithAuthResult
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
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = { name: response.data.name };

      return await handler(ctx, {
        name: user.name,
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
