import React from "react";
import { useEffect } from "react";
import { getRandomMovie } from "../../api/movie/movie";
import { Box, Button, Typography, IconButton } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoIcon from "@mui/icons-material/Info";


export default function DummyMovie(props) {
  const [randomMovie, setRandomMovie] = React.useState(null);
 
  useEffect(() => {
    fetchRandomMovie();
  }, []);
  const fetchRandomMovie = async () => {
    try {
      const randomMovie = await getRandomMovie();
      setRandomMovie(randomMovie[0]);
      props.onRandomMovieChange?.(randomMovie);
    } catch (error) {
      setRandomMovie(null);
      props.onRandomMovieChange?.(null);
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: "95%",
        height: "500px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${randomMovie?.background_url})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "5%",
      }}
    >
      <Box sx={{ color: "white", maxWidth: "40%" }}>
        <Typography variant="h2" fontWeight="bold">
          {randomMovie?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="solid" sx={{ backgroundColor: "white" }}>
            <Typography variant="h6" sx={{ fontSize: "14px", color: "black" }}>
              You can watch on smthng
            </Typography>
          </Button>
          <IconButton >
            <AddCircleRoundedIcon sx={{ fontSize: "40px", color: "white" }} />
          </IconButton>
          <IconButton
          >
            <InfoIcon onClick={props.onClickInfoButton} sx={{ fontSize: "40px", color: "white" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          
          width: "300px",
          height: "300px",
          color:"white",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 400,
          left: 0,
          width: "100%",
          height: "100px", 
          background: "linear-gradient(to top, rgba(0,0,0), transparent)",
          backdropFilter: "blur(0.2px)",
        
        }}
      />
    </Box>
  );


}