import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/styles/themes/default";
import { GlobalStyle } from "@/styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
