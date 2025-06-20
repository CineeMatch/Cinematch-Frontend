import React, { useState } from "react";
import { Box, Card, Avatar, Typography, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
import { createPost } from "../../api/post/post.js";
import { getActiveUser } from "../../api/profile/user.js";
import { getAllMovies } from "../../api/movie/movie.js";
import { toast } from "react-toastify";

function CreatePostCard({ onSend }) {
  const [movies, setMovies] = useState([]);
  const [nickname, setNickname] = useState("User");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [text, setText] = useState("");

  const handleSend = async () => {
  if (!text.trim() || !selectedMovie)
    return alert("Please fill in all fields.");

  try {
    const newPost = await createPost({
      movie_id: selectedMovie.id,
      contentText: text,
    });

    // movieName ve nickname'i manuel olarak ekliyoruz
    onSend?.({
      ...newPost,
      movieName: selectedMovie.title,
      nickname: nickname,
    });

    setText("");
    setSelectedMovie(null);
  } catch (err) {
    console.error("Posted Error:", err.message);
    toast.error("Post oluşturulamadı. Lütfen tekrar deneyiniz.");
  }
};

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getActiveUser();
        setNickname(user.nickname);
      } catch (error) {
        console.error("User information didn't get:", error);
        toast.error("Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyiniz.");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const allMovies = await getAllMovies();
      if (allMovies && Array.isArray(allMovies)) {
        setMovies(allMovies);
      }
    };

    fetchTopMovies();
  }, []);

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
        overflow: "visible",
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
          <Autocomplete
            options={movies}
            getOptionLabel={(option) => option.title || ""}
            value={selectedMovie}
            disablePortal
            onChange={(event, value) => setSelectedMovie(value)}
            filterOptions={(options, { inputValue }) =>
              options
                .filter((option) =>
                  option.title?.toLowerCase().startsWith(inputValue.toLowerCase())
                )
                .slice(0, 10)
            }
            PopperProps={{
              placement: "bottom-start", // ✅ Her zaman aşağı açılsın
            }}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
                title={option.title}
              >
                {option.title}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Film Seçiniz"
                variant="outlined"
                sx={{
                  minWidth: 200,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            )}
            sx={{
              width: 250,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              color: "white",
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          />
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
