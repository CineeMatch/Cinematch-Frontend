import { BorderColor } from "@mui/icons-material";
import React from "react";

export default function PostCard({ isSidebarOpen }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 570,
        flexGrow: 1,
        marginRight: isSidebarOpen ? "300px" : "35px",
        transition: "margin 0.3s ease",
        p: 4,
        borderRadius: 3,
        BorderColor: "0px 4px 10px rgba(255, 255, 255, 0.5)",
        bgcolor: "rgba(99, 63, 63, 0.8)",
        color: "white",
        position: "relative",
        ml: 2,
      }}
    >
      {/* <Typography variant="body1">{data.content}</Typography> */}
    </Card>
  );
}
