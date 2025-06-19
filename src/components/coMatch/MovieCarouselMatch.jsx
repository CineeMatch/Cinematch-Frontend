import React from "react";
import { Card, CardMedia, Stack, Typography,Box } from "@mui/material";

export default function movieCarousel({ movies }) {

  return (
    <Box sx={{ textAlign: "center", mb: 2 }}>
    {/* Büyük Başlık */}
    <Typography
      variant="h5"
      sx={{
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      FAVORİ FİLMLERİ
    </Typography>

    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 250,
        width: 800,
        marginLeft: 12,
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
        bgcolor: "rgba(36, 31, 31, 0.6)",
        position: "relative",
      }}
    >
      <Stack direction="row" spacing={2}>
        {movies.map((movie, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 150,
              maxWidth: 150,
              height: 300,
              borderRadius: 2,
              textAlign: "center",
              bgcolor: "transparent",
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={movie.poster_url}
              alt={movie.title}
              sx={{
                width: "100%", // Kart genişliği kadar genişlet
                objectFit: "cover", // Resmi düzgün hizala
              }}
            />
            <Typography
              variant="body2"
              sx={{
                mt: 1, // Üst boşluğu azalt
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                whiteSpace: "nowrap", 
                overflow: "hidden", 
                flexGrow: 1,
                textOverflow: "ellipsis", 
                color: "white",
              }}
            >
              {movie.title}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Card>
    </Box>
  );
}
