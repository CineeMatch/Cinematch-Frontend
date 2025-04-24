import React from "react";
import { Card } from "@mui/material";

export default function MessageCard({ isSidebarOpen }) {
  console.log("SideBar:" ,isSidebarOpen);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 570,
        flexGrow: 1,
        marginRight: isSidebarOpen ? '300px' : '35px',
        transition: "margin 0.3s ease",
        p: 4,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        position: "relative",
        ml: 2,
      }}
    >
    </Card>
  );
}


