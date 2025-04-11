import { Box } from "@mui/material";
import React from "react";
import UserCard from "../components/coMatch/userCard.jsx";
import MovieCarousel from "../components/coMatch/movieCarousel.jsx";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import "./coMatch.css";

export default function CoMatch() {
  const users = [
    {
      name: "John Doe",
      username: "@johndoe",
      level: "Level 5",
      profilePic: "image.png",
      movies: [
        { title: "Doğaüstü", poster: "chronicle.jpg" },
        { title: "Ready Player One", poster: "ready.png" },
        { title: "Now You See Me", poster: "nowyousee.png" },
        { title: "Lucy", poster: "lucy.png" },
        { title: "Başlangıç", poster: "inception.png" },
      ],
    },
    {
      name: "Jane Smith",
      username: "@janesmith",
      level: "Level 8",
      profilePic: "profile2.jpg",
      movies: [
        { title: "Happy Death Day", poster: "happy.png" },
        { title: "Now You See Me", poster: "nowyousee.png" },
        { title: "Ready Player One", poster: "ready.png" },
        { title: "Inception", poster: "inception.png" },
        { title: "Lucy", poster: "lucy.png" },
      ],
    },
    {
      name: "Michael Johnson",
      username: "@michaelj",
      level: "Level 10",
      profilePic: "profile3.jpg",
      movies: [
        { title: "Doğaüstü", poster: "chronicle.jpg" },
        { title: "Ready Player One", poster: "ready.png" },
        { title: "Now You See Me", poster: "nowyousee.png" },
        { title: "Lucy", poster: "lucy.png" },
        { title: "Başlangıç", poster: "inception.png" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Kullanıcı değiştir
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? users.length - 1 : prevIndex - 1
    );
  };

  const currentUser = users[currentIndex];

  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <Box className="coMatch-container">
      <IconButton
        onClick={handlePrev}
        sx={{
          color: "white",
          bgcolor: "rgba(0,0,0,0.5)",
          width: 50,
          height: 50,
          ml: -7,
          mr: 3,
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.8)",
            transform: "scale(1.2)", // Hover'da büyüt
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <ArrowBackIos sx={{ fontSize: "2rem" }} />
      </IconButton>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentUser.username}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <UserCard
            user={currentUser}
            sx={{ alignSelf: "flex-start", ml: 2 }}
          />
          <MovieCarousel movies={currentUser.movies} />
        </motion.div>
      </AnimatePresence>
      <IconButton
        onClick={handleNext}
        sx={{
          color: "white",
          bgcolor: "rgba(0,0,0,0.5)",
          width: 50,
          height: 50,
          ml: 2, // Sağ buton ile carousel arasına boşluk koy
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.8)",
            transform: "scale(1.2)", // Hover'da büyüt
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <ArrowForwardIos sx={{ fontSize: "2rem" }} />
      </IconButton>
    </Box>
  );
}
