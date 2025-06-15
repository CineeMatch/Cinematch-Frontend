import React from "react";
import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";

export default function userCard({ user }) {
  // const ppUrl = process.env.PUBLIC_URL + "/images/image.png";
  // const name = "John Doe";
  // const nickname = "johndoe";
  // const level = "Level 5";

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 450,
        width: 350,
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={`/images/${user.profilePic}`}
          alt={user.name}
          sx={{
            width: 300,
            height: 300,
            borderRadius: 10,
            border: "4px solid rgb(205, 182, 182)",
            ml: 1, // Avatar ile kart arasına boşluk bırak
            mb: 2, // Altına boşluk bırak
          }}
        />
        <Box
          sx={{
            mt: 2, // Avatar ile arasına boşluk ekler
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Yatayda ortala
            gap: 0.5, // İsim ve nickname arasına boşluk ekle
            bottom: 10,
            left: 10,
            p: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="white">
          {user.name}
          </Typography>
          <Typography variant="body2" color="gray">
          {user.username}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center", 
              justifyContent: "flex-start", 
              gap: 7,
              width: "100%", 
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="white"
              sx={{
                borderRadius: 3,
                borderColor: "rgb(115, 193, 202)",
                border: "1px solid",
                width: 100,
                height: 40,
                backgroundColor: "rgb(166, 46, 48)",
                mt: 2,
                color: "rgb(115, 193, 202)",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
              }}
            >
              {user.level}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />} // Butona ikon ekleme
              sx={{
                mt: 2,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(74, 133, 140)", // Buton rengi
                color: "white",
                "&:hover": { backgroundColor: "rgb(23, 40, 43)" }, // Hover efekti
              }}
            >
              Add Friend
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
