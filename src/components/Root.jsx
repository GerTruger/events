import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "./Footer";

export const Root = () => {
  return (
    <Box backgroundColor={"skyblue"} minHeight={"100vh"}>
      <Navigation />
      <Outlet />
      <Footer />
    </Box>
  );
};
