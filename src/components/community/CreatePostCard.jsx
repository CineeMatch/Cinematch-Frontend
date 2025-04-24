import React, { useState } from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";

function CreatePostCard({ nickname = "Kullanıcı", movies = [], onSend }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || !selectedMovie)
      return alert("Lütfen film seçin ve metin yazın.");

    const newPost = {
      text,
      selectedMovie,
    };

    onSend?.(newPost); // Eğer onSend varsa çağır

    // Formu temizle
    setText("");
    setSelectedMovie("");
  };

  return (
    <Card
      sx={{
        width: "95%",
        p: 2,
        bgcolor: "rgba(252, 252, 252, 0.24)",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
      }}
    >
      {/* Üst kısım */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ bgcolor: "#555" }}>
          <PersonIcon />
        </Avatar>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          {nickname}
        </Typography>
      </Box>

      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Film için fikirlerinizi buraya yazabilirsiniz."
        multiline
        minRows={5}
        fullWidth
        variant="outlined"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 2,
          input: { color: "white" },
          textarea: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.3)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      {/* Film seçimi */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "white", fontSize: 18 }}>
            Film:
          </Typography>
          <Select
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            displayEmpty
            size="small"
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              fontSize: 18,
              border: "1px solid rgba(255,255,255,0.3)",
              minWidth: 200,
              ".MuiSvgIcon-root": { color: "white" },
            }}
          >
            <MenuItem value="" disabled>
              Film Seçiniz:
            </MenuItem>
            {movies.map((movie) => (
              <MenuItem key={movie.id} value={movie.name}>
                {movie.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Gönder butonu */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: "#1976d2" }}
          onClick={handleSend}
        >
          Gönder
        </Button>
      </Box>
    </Card>
  );
}

export default CreatePostCard;
