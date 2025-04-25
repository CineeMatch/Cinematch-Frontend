import React from "react";
import { Box, Divider } from "@mui/material";
import { Avatar, Button, Modal, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState,useRef,useEffect } from "react";

function CommentModal({ open, handleClose, post, comments, setComments }) {
  const [newComment, setNewComment] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newItem = {
        user: "Sena AKAT",
        text: newComment,
        liked: false, 
      };
      setComments((prev) => [...prev, newItem]);
      setNewComment(""); 
    }
  };

  const toggleLike = (index) => {
    setComments((prev) =>
      prev.map((comment, i) =>
        i === index ? { ...comment, liked: !comment.liked } : comment
      )
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "50%",
          bgcolor: "#111",
          color: "white",
          p: 3,
          borderRadius: 2,
          mx: "auto",
          my: "5%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Post üst kısmı */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "#555" }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6">{post.nickname}</Typography>
        </Box>
        <Typography>{post.text}</Typography>

        {/* Film bilgisi */}
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
            🎬 {post.selectedMovie || "Seçilmedi"}
          </Box>
        </Box>
        <Divider
          sx={{
            bgcolor: "rgba(236, 227, 227, 0.89)",
            my: 2,
            borderBottomWidth: 1,
          }}
        />
        {/* Yorumlar */}
        <Box
          mt={0}
          sx={{
            maxHeight: "250px",
            overflowY: "auto",
            pr: 1,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Yorumlar:
          </Typography>
          {comments.map((comment, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                mb: 1,
                p: 1,
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 1,
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{ width: 24, height: 24, bgcolor: "#555", mt: "2px" }}
              >
                <PersonIcon sx={{ fontSize: 16 }} />
              </Avatar>

              {/* Metin ve Beğeni ikonu */}
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: "bold", textAlign: "left" }}
                >
                  {comment.user}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "white", textAlign: "left", mb: 1 }}
                >
                  {comment.text}
                </Typography>

                {/* Beğeni ikonu - en altta, sola hizalı */}
                <IconButton
                  onClick={() => toggleLike(i)}
                  size="small"
                  sx={{ alignSelf: "flex-start", p: 0 }}
                >
                  {comment.liked ? (
                    <FavoriteIcon sx={{ color: "red", fontSize: 18 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "white", fontSize: 18 }} />
                  )}
                </IconButton>
              </Box>
            </Box>
          ))}
          <div ref={bottomRef} />
        </Box>

        {/* Yorum yazma alanı */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Gönder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CommentModal;
