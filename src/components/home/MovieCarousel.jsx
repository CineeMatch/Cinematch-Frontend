import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const MovieCarousel = (props) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [openMovieModal, setOpenMovieModal] = React.useState(false);
  const movies =props.movies||[];

  const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
      setOpenMovieModal(true);
      props.openMovieModal?.(true);
      props.movie?.(movie);
    };
  return (
    <Box sx={{ position: "relative", width: "100%", padding: "20px 0" }}>
      <Typography sx={{ color: "white", marginLeft: "30px", fontSize: "20px", textAlign: "start" }}>
        {props.title}
      </Typography>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          padding: "20px 0",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies.map((movie, index) => (
          <Box
            onClick={() => handleMovieClick(movie)}
            key={index}
            sx={{
              minWidth: "150px",
              maxWidth: "150px",
              marginRight: "20px",
              cursor: "pointer",
              /*transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.1)" }, //  efekt*/
            }}
          >
            <img
              src={movie.poster_url}
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Left Scroll Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          left: "5px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          zIndex: 2,
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
        }}
        onClick={() => scroll("left")}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right Scroll Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          right: "5px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          zIndex: 2,
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
        }}
        onClick={() => scroll("right")}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default MovieCarousel;