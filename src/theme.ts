import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "320px",
  sm: "400px",
  md: "1000px",
  lg: "1250px",
  xl: "1400px",
};

export const theme = extendTheme({
  colors: {
    beige: "#f5f5dc",
    darkerBeige: "#dcd5b9",
  },
  breakpoints,
});
