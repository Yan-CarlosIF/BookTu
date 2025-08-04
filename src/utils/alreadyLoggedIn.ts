import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

export function alreadyLoggedIn<T>(
  handler: (
    ctx: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<T>>
): GetServerSideProps<T> {
  return async (ctx) => {
    const { req } = ctx;

    const token = req.cookies["auth.token"];

    if (token) {
      return {
        redirect: {
          destination: "/home/establishments",
          permanent: false,
        },
      };
    }

    return await handler(ctx);
  };
}
