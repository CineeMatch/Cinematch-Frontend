/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getTop10Movies } from '../../api/movie/movie';

import { useEffect } from 'react';

export default function Top10Carousel(props) {
  const [topMovies, setTopMovies] = React.useState([]);
  const [selecetedMovie, setSelectedMovie] = React.useState(null);
  const [openMovieModal, setOpenMovieModal] = React.useState(false);

  useEffect(() => {
    fetchTopMovies();
  }, []);
  const fetchTopMovies = async () => {
    try {
      const movies = await getTop10Movies();
      console.log("Top 10 Movies:", movies);
      setTopMovies(movies);
      props.onTopMoviesChange?.(movies);
    } catch (error) {
      setTopMovies(null);
      props.onTopMoviesChange?.(null);
    }
  };
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setOpenMovieModal(true);
    props.openMovieModal?.(true);
    props.movie?.(movie);
  };

  const scrollRef = useRef(null);
    const scroll = (direction) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -300 : 300,
          behavior: "smooth",
        });
      }
    };
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        paddingX: 2,
        paddingY: 1,
      }}
    >
           <Typography sx={{ color: "white", marginLeft: "30px", fontSize: "20px", textAlign: "start" }}>
     Top 10</Typography>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        
        {topMovies.map((movie, index) => (
          <Box
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            sx={{
              position: 'relative',
              minWidth: 150,
              height: 225,
              mr: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                fontSize: '150px',
                fontWeight: 'bold',
                color: 'rgba(114, 114, 114, 0.48)',
                zIndex: 0,
                top: '0px',
                left: '0px',
              }}
            >
              {index + 1}
            </Typography>

            {/* Poster */}
            <Box
              component="img"
              src={movie.poster_url}
              alt={movie.title}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 2,
                position: 'relative',
                objectFit: 'cover',
                zIndex: 1,
                top: '0px',
                left: '55px',
              }}
            />
          </Box>
        ))}
      </Box>
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
      {/* Sağ Scroll Butonu */}
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
}
