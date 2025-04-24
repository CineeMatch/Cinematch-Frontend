import React from 'react'
import { Box, Card, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import BoltIcon from "@mui/icons-material/Bolt";


export default function ChallangeCard() {
    const dummyCards = [
        { id: 1, title: "Lucy", image: "/images/lucy.png", player1: "Me", player2: "Sena", time: "11:20:45" },
        { id: 2, title: "Inception", image: "/images/inception.png", player1: "Ali", player2: "Veli", time: "13:33:20" },
        { id: 3, title: "Interstellar", image: "/images/prestij.png", player1: "Ayşe", player2: "Ahmet", time: "14:00:00" },
        { id: 4, title: "The Matrix", image: "/images/ready.png", player1: "Elif", player2: "Mert", time: "15:12:30" },
        { id: 5, title: "Fight Club", image: "/images/happy.png", player1: "Zeynep", player2: "Bora", time: "10:10:10" },
        { id: 6, title: "Avatar", image: "/images/chronicle.jpg", player1: "Can", player2: "Gizem", time: "09:45:20" },
        { id: 7, title: "Joker", image: "/images/ready.png", player1: "Seda", player2: "Mehmet", time: "17:17:17" },
        { id: 8, title: "Tenet", image: "/images/lucy.png", player1: "Eren", player2: "Deniz", time: "08:08:08" },
        { id: 9, title: "Batman", image: "/images/lucy.png", player1: "Melis", player2: "Tunç", time: "20:20:20" },
        { id: 10, title: "Gladiator", image: "/images/lucy.png", player1: "Burak", player2: "Buse", time: "18:00:00" },]
        
  return (
    <Grid container spacing={4}>
    {dummyCards.map((card) => (
      <Grid item xs={12} sm={6} md={3} key={card.id}>
        <Card
          sx={{
            backgroundColor: "#222",
            color: "white",
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid #444",
            boxShadow: "0 0 5px white",
          }}
        >
          
          <img
            src={card.image}
            alt={card.title}
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
            }}
          />
          <Box sx={{ height: "auto", p: 1 }}>
            <Typography variant="h6"  sx={{ fontWeight: "bold", mb: 0.5 }}>{card.title}</Typography>
            <Typography variant="body2"
              sx={{  alignItems: "center", gap: 1 }}
            >
              {card.player1}
              <BoltIcon sx={{ color: "red" }} />
              {card.player2}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "#ffdf2b",
                textShadow: `
                0 0 6px rgba(255, 215, 0, 0.8),
                0 0 10px rgba(255, 215, 0, 0.6)
              `,
                fontWeight: "bold",
              }}
            >
              ⏱ {card.time}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "calc(100% + 2px)", // Kartın iç genişliğinden fazlası
              marginLeft: "-1px", // Sol kenarı taşır
              marginRight: "-1px",
              border: "2px",
              borderColor: "rgb(187, 170, 170)",
              borderStyle: "solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 1,
              gap: 10,
            }}
          >
            <IconButton
              sx={{
                borderRadius: "10px",
                backgroundColor: "#ff4444",
                color: "white",
                "&:hover": { backgroundColor: "#cc0000" },
              }}
            >
              <CancelIcon />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: "10px",
                backgroundColor: "#44ff44",
                color: "white",
                "&:hover": { backgroundColor: "#2ecc71" },
              }}
            >
              <CheckIcon />
            </IconButton>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}
