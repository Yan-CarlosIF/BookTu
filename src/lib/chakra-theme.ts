import { extendTheme } from "@chakra-ui/react";

const colors = {
  // Base Colors
  background: "#FFFFFF",
  gray_300: "#F6F6F6",
  gray_500: "#D9D9D9",
  gray_600: "#666666",
  gray_800: "#2E2E2E",

  // Primary Colors
  highlight_blue: "#319795",
  success: "#83C5BE",
  failed: "#E29578",
};

export const chakraTheme = extendTheme({
  colors,
  fonts: {
    body: "Inter, sans-serif",
    heading: "Poppins, sans-serif",
  },
});
