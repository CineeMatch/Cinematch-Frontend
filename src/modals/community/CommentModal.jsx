import React from "react";
import { Box, Divider } from "@mui/material";
import { Avatar, Button, Modal, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useRef, useEffect } from "react";
import {
  getCommentLikesByCommentId,
  createCommentLike,
  deleteCommentLike,
  getUserCommentLikeOnComment,
} from "../../api/like/commentLike.js";
import { createComment } from "../../api/comment.js/comment.js";

function CommentModal({ open, handleClose, post, comments, setComments }) {
  const [newComment, setNewComment] = useState("");
  const bottomRef = useRef(null);
  const [likeInfo, setLikeInfo] = useState({});

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

const handleAddComment = async () => {
  if (newComment.trim()) {
    try {
      const addedComment = await createComment(
        post.id,newComment
      );

      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (err) {
      console.error("Comment uplod failed:", err);
    }
  }
};
  useEffect(() => {
    const fetchLikes = async () => {
      const updatedLikes = {};

      for (const comment of comments) {
        try {
          const [likeData, userLike] = await Promise.all([
            getCommentLikesByCommentId(comment.id),
            getUserCommentLikeOnComment(comment.id),
          ]);

          const res = await getCommentLikesByCommentId(comment.id);
        console.log("Gelen like verisi:", res);
        
          updatedLikes[comment.id] = {
            count: likeData.likeCount,
            liked: userLike.liked, // örn: { liked: true }
          };
        } catch (err) {
          console.error("Beğeni verisi alınamadı", err);
        }
      }

      setLikeInfo(updatedLikes);
    };

    if (open) fetchLikes();
  }, [comments, open]);

  const toggleLike = async (commentId) => {
    const isLiked = likeInfo[commentId]?.liked;

    try {
      if (isLiked) {
        await deleteCommentLike(commentId);
      } else {
        await createCommentLike(commentId);
      }

      setLikeInfo((prev) => ({
        ...prev,
        [commentId]: {
          count: prev[commentId].count + (isLiked ? -1 : 1),
          liked: !isLiked,
        },
      }));
    } catch (err) {
      console.error("Beğeni işlemi başarısız", err);
    }
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
          <Typography variant="h6"> {post.nickname || "Anonim"}</Typography>
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
              key={comment.id}
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
                  {comment.User?.nickname || "Anonim"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "white", textAlign: "left", mb: 1 }}
                >
                  {comment.commentText}
                </Typography>

                {/* Beğeni ikonu - en altta, sola hizalı */}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => toggleLike(comment.id)}
                    size="small"
                    sx={{ p: 0 }}
                  >
                    {likeInfo[comment.id]?.liked ? (
                      <FavoriteIcon sx={{ color: "red", fontSize: 18 }} />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ color: "white", fontSize: 18 }}
                      />
                    )}
                  </IconButton>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    {likeInfo[comment.id]?.count || 0}
                  </Typography>
                </Box>
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
