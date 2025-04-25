import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Box } from "@mui/material";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <Box >
        {children}
      </Box>
      <Footer/>
    </>
  );
};

export default Layout;