import { Box, Card, Avatar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import CommentModal from "../../modals/community/CommentModal";
import { getCommentsByPostId } from "../../api/comment.js/comment";
import { getLikesByPost, createLike, removeLike } from "../../api/like/like.js";
import { useEffect } from "react";

function Post({ id, nickname, text, selectedMovie }) {
  const [openModal, setOpenModal] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  const firstComment = comments[0];

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await removeLike(id);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await createLike(id);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(
        "Like operation failed",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPostId(id);
        setComments(data);
      } catch (error) {
        console.error("Comment didn't fetch:", error.message);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikesByPost(id);
        setLikeCount(data.likeCount);
      } catch (error) {
        console.error("Like information is not get", error);
      }
    };

    fetchLikes();
  }, [id]);

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
        <IconButton onClick={handleLikeClick} size="small">
          {liked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "white" }} />
          )}
        </IconButton>
        <Typography sx={{ color: "white", mt: 0.5 }}>{likeCount}</Typography>
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
            id,
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
              sx={{ color: "white", fontWeight: "bold", textAlign: "left" }}
            >
              {firstComment.User?.nickname || "Anonim"}
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              {firstComment.commentText}
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default Post;
