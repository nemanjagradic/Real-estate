import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "300px",
  sm: "570px",
  md: "800px",
  lg: "1000px",
  xl: "1290px",
  xxl: "1400px",
};

export const theme = extendTheme({
  colors: {
    beige: "#f5f5dc",
    darkerBeige: "#dcd5b9",
  },
  breakpoints,
});
