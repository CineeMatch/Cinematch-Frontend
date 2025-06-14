import React from "react";
import { Box, Card, Avatar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import CommentModal from "../../modals/community/CommentModal";

function PostCard({ nickname, text, selectedMovie }) {
  const [openModal, setOpenModal] = useState(false);

  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([
    { user: "Sena", text: "Bu filmi çok sevdim!" },
    { user: "Ali", text: "Oyunculuk harikaydı." },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: true },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: true },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: true },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.",liked: true },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: false},
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: true },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: true },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: false },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: false },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: false },
    { user: "Zeynep", text: "Müzikleri çok etkileyiciydi.", liked: true },
  ]);

  const firstComment = comments[0];

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: "95%",
        height: "40%",
        p: 2,
        bgcolor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
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

      {/* Mesaj */}
      <Typography
        variant="body1"
        sx={{ color: "white", display: "flex", justifyContent: "flex-start" }}
      >
        {text}
      </Typography>

      {/* Film seçimi */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: "auto",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "white", mr: 1, fontSize: 18 }}
        >
          Film:
        </Typography>
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.3)",
            fontSize: 18,
          }}
        >
          🎬 {selectedMovie || "Seçilmedi"}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          mt: 1,
        }}
      >
        <IconButton onClick={toggleLike} size="small">
          {liked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "white" }} />
          )}
        </IconButton>
        <IconButton
          sx={{ color: "rgba(24, 123, 221, 1)" }}
          size="small"
          onClick={() => setOpenModal(true)}
        >
          <CommentIcon />
        </IconButton>

        <CommentModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          post={{
            nickname,
            text,
            selectedMovie,
          }}
          comments={comments}
          setComments={setComments}
        />
      </Box>
      {/* Yorumların sadece ilki */}
      {firstComment && (
        <Box
          onClick={() => setOpenModal(true)}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            mt: 1,
            p: 1,
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Avatar sx={{ width: 24, height: 24, bgcolor: "#555", mt: "2px" }}>
            <PersonIcon sx={{ fontSize: 16 }} />
          </Avatar>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: "bold" , textAlign: "left"}}
            >
              {firstComment.user}
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              {firstComment.text}
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default PostCard;

