import { Box } from "@mui/material";
import UserCard from "../components/coMatch/UserCard.jsx";
import MovieCarousel from "../components/coMatch/MovieCarouselMatch.jsx";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { getMovieTypeOnProfileByUserId } from "../api/movieType/movieType.js";
import { createCoMatchSuggestion } from "../api/coMatch/coMatch.js";
import { useEffect } from "react";

export default function CoMatch() {
  const [userList, setUserList] = useState([]); // Önceki kullanıcılar
  const [currentIndex, setCurrentIndex] = useState(-1); // Başlangıçta hiç kullanıcı yok
  const [direction, setDirection] = useState(1);

  const handleNext = async () => {
    setDirection(1);
    try {
      const matchUser = await createCoMatchSuggestion();;
      const matchId = matchUser.match.id;
      console.log("Eşleşen kullanıcı:", matchId);
      const movieRes = await getMovieTypeOnProfileByUserId(matchId); 
      console.log("Eşleşen kullanıcının filmleri:", movieRes.data);
      const movies = movieRes.data?.map((m) => m.Movie) || [];

      const newEntry = {
        user: matchUser.match,
        movies: movies,
      };

      setUserList((prev) => [...prev, newEntry]);
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Eşleşme oluşturulurken hata:", error);
    }
  };

  useEffect(() => {
  handleNext();
}, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const currentEntry = userList[currentIndex];

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
    <Box
      sx={{
        display: "flex",
        justifyContent: " flex - start",
        paddingLeft: "100px",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(/images/main-Photoroom.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no - repeat",
        backgroundPosition: "center",
      }}
    >
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
        {currentEntry && (
          <motion.div
            key={currentIndex}
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
              user={currentEntry.user}
              sx={{ alignSelf: "flex-start", ml: 2 }}
            />
            <MovieCarousel movies={currentEntry.movies} />
          </motion.div>
        )}
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
