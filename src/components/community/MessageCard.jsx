import React, { useState } from "react";
import { Card } from "@mui/material";
import PostCard from "./PostCard.jsx";
import CreatePostCard from "./CreatePostCard.jsx";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { getAllPosts } from "../../api/post/post.js";
import { getPostByCategoryId } from "../../api/post/post.js";
import { toast } from "react-toastify";

export default function MessageCard({ isSidebarOpen,selectedCategoryId }) {
  const [posts, setPosts] = useState([]);

  const handleDeletePost = (postId) => {
  setPosts((prev) => prev.filter((post) => post.id !== postId));
};

   const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };


useEffect(() => {
  const fetchPosts = async () => {
    try {
      if (selectedCategoryId) {
        const data = await getPostByCategoryId(selectedCategoryId);
        setPosts(data);
      } else {
        const data = await getAllPosts();
        setPosts(data);
      }
    } catch (err) {
      console.error("Postlar alınamadı:", err.message);
      toast.error("Post verileri alınamadı. Lütfen tekrar deneyiniz.");
    }
  };
  fetchPosts();
}, [selectedCategoryId]);


  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflowY: "auto",
        flexGrow: 1,
        marginRight: isSidebarOpen ? "300px" : "35px",
        transition: "margin 0.3s ease",
        p: 4,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        position: "relative",
        ml: 2,
        marginBottom: 2,
        gap: 2,
        marginTop: 10,
      }}
    >
      <CreatePostCard onSend={handleNewPost} />
      <Divider
        sx={{
          bgcolor: "rgba(236, 227, 227, 0.89)",
          my: 2,
          borderBottomWidth: 1,
        }}
      />
      {posts.map((item) => (
        <PostCard
          key={item.id}
          id={item.id}
          nickname={item.nickname}
          text={item.contentText}
          selectedMovie={item.movieName}
          onDelete={handleDeletePost}
        />
      ))}
    </Card>
  );
}

