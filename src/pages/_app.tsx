import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { chakraTheme } from "@/lib/chakra-theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import Head from "next/head";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={chakraTheme}>
        <Head>
          <title>BookTu</title>
        </Head>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
