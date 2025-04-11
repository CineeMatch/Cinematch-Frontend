import React from "react";
import { Box, Modal, Card, IconButton } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ChallangeCard from "./ChallangeCard";

export default function ActiveChallangeModal() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <Modal open={visible} onClose={handleClose}>
      <Box
        sx={{
            backgroundImage:  `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),
    url(/images/main-Photoroom.png)`,
              display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card
          sx={{
            position: "relative",
            height: "80vh",
            width: "70vw",
            p: 3,
            borderRadius: 4,
            boxShadow: "0 0 20px white",
            bgcolor: "rgba(0, 0, 0, 0.85)",
            color: "white",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
                display: "none",
              }
          }}
        >
          {/* Kapatma Butonu */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Cinzel', serif", // 📜 Serif yazı stili
              color: "#d4caa5", // 🔸 Altın/bej tonu
              textTransform: "uppercase",
              textShadow: `
                0 0 10px rgba(255, 220, 100, 0.7),
                0 0 15px rgba(255, 200, 50, 0.6)
              `,
              mb: 2,
            }}
            align="center"
            gutterBottom
          >
            Aktif Film Kapışmaları
          </Typography>

          <ChallangeCard/>
          
        </Card>
      </Box>
    </Modal>
  );
}
