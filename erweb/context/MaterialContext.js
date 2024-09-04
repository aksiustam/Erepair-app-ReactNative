"use client";

import { ThemeProvider } from "@material-tailwind/react";

const MaterialContext = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default MaterialContext;
