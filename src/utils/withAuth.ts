import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function withAuthServerSideProps<T>(
  handler: (ctx: GetServerSidePropsContext) => Promise<{ props: T }>
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

    return await handler(ctx);
  };
}
