import React, { useState } from "react";
import { Card } from "@mui/material";
import PostCard from "./PostCard.jsx";
import CreatePostCard from "./CreatePostCard.jsx";
import Divider from "@mui/material/Divider";

export default function MessageCard({ isSidebarOpen }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      nickname: "Sena AKAT",
      text: "Bu film gerçekten çok etkileyiciydi. Özellikle son sahnesi...",
      selectedMovie: "Inception",
    },
    {
      id: 2,
      nickname: "Ali KAYA",
      text: "Senaryosu biraz karışıktı ama oyunculuk harikaydı.",
      selectedMovie: "Lucy",
    },
    {
      id: 3,
      nickname: "Zeynep DEMİR",
      text: "Bu filmi izlerken çok duygulandım, herkese tavsiye ederim.",
      selectedMovie: "Gift",
    },
    {
      id: 4,
      nickname: "Burak YILMAZ",
      text: "Görsel efektler muazzamdı ama hikaye zayıftı bence.",
      selectedMovie: "Wonder",
    },
    {
      id: 5,
      nickname: "Ayşe KAPLAN",
      text: "Filmin başı sıkıcıydı ama sonlara doğru çok heyecanlıydı.",
      selectedMovie: "Wanted",
    },
  ]);

  const movieList = [
    { id: 1, name: "Inception" },
    { id: 2, name: "Interstellar" },
    { id: 3, name: "Lucy" },
    { id: 4, name: "Gift" },
    { id: 5, name: "Wonder" },
    { id: 6, name: "Wanted" },
  ];

  const handleNewPost = (newPost) => {
    setPosts((prev) => [
      { ...newPost, id: prev.length + 1, nickname: "Sena AKAT" },
      ...prev,
    ]);
  };

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
      <CreatePostCard nickname="Sena AKAT" movies={movieList} onSend={handleNewPost} />
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
          nickname={item.nickname}
          text={item.text}
          selectedMovie={item.selectedMovie}
        />
      ))}
    </Card>
  );
}
