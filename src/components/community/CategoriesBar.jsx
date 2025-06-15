import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categories/category.js";

export default function CategoriesCard({ isOpen, setIsOpen, onCategorySelect  }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Kategori alınamadı", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 4,
          height: "90%",
          transition: "width 0.3s ease",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
          position: "fixed",
          bottom: 0,
          right: 0,
          borderLeft: "5px solid #d4c295",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {isOpen && (
        <>
          {/* Sabit Başlık */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              p: 2,
              borderBottom: "1px solid gray",
              width: "100%",
              textAlign: "left",
              flexShrink: 0,
            }}
          >
            CATEGORİES
          </Typography>

          {/* Scrollable Liste */}
          <Box
            sx={{
              overflowY: "auto",
              flexGrow: 1,
              width: "100%",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE
              "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safari
              },
            }}
          >
            <List>
              {categories.map((cat) => (
                <ListItem
                  key={cat.id}
                  onClick={() => onCategorySelect(cat.id)} 
                  sx={{
                    borderBottom: "1px solid gray",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText primary={cat.name} sx={{ pl: 1 }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
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
