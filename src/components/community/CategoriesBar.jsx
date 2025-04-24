import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CategoriesCard({ isOpen, setIsOpen }) {
  const categories = [
    "Action",
    "Animation",
    "Comedy",
    "Drama",
    "Documentary",
    "Fantasy",
    "Horror",
    "Sci-Fi",
    "Thriller",
  ];

  return (
    <>
      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 4,
          height: "90%",
          transition: "width 0.3s ease",
          backgroundColor: "#000",
          color: "#fff",
          overflowX: "hidden",
          position: "fixed",
          bottom: 0,
          right: 0,
          borderLeft: "3px solid #d4c295",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {isOpen && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              p: 2,
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            Categories
          </Typography>
        )}

        {isOpen && (
          <List sx={{ width: "100%" }}>
            {categories.map((cat, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid gray",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemText primary={cat} sx={{ pl: 1 }} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Toggle Button - sidebar ile aynı hizada ve boyda */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: isOpen ? 240 : 4,
          height: "90vh",
          width: 32,
          transition: "width 0.3s ease",
          backgroundColor: "#000",
          border: "1px solid #d4c295",
          borderRight: "none",
          borderRadius: "6px 0 0 6px",
          zIndex: 1301,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          size="small"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            color: "#fff",
          }}
        >
          {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </>
  );
}
