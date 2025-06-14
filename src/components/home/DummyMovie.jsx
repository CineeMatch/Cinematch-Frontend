import React from "react";
import { useEffect } from "react";
import { getRandomMovie } from "../../api/movie/movie";
import { Box, Button, Typography, IconButton } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoIcon from "@mui/icons-material/Info";


export default function DummyMovie(props) {
  const [randomMovie, setRandomMovie] = React.useState(null);
  const platforms=[
    {name:"Netflix",url:"https://www.netflix.com/tr/"},
    {name:"Disney Plus",url:"https://www.disneyplus.com/tr"},
    {name:"Amazon Prime Video",url:"https://www.primevideo.com/tr"},
    {name:"blutv",url:"https://www.max.com/tr"},
    {name:"TV+",url:"https://tvplus.com.tr"},
    {name:'TOD TV',url:"https://www.todtv.com.tr"},
    {name:"MUBI",url:"https://tvplus.com.tr"},
    {name:"Sun Nxt",url:"https://www.sunnxt.com"},
    {name:"DocAlliance Films",url:"https://dafilms.com"},
    {name:"Cultpix",url:"https://www.cultpix.com"}
  ]
const moviePlatforms = typeof randomMovie?.platforms === 'string'
  ? randomMovie.platforms.split(',').map(p => p.trim())
  : [];const platformURL = platforms.find(p => p.name === moviePlatforms[0])?.url;

 
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
  const handleClickOnInfo = () => {
    props.openMovieModal?.(true);
    props.movie?.(randomMovie);
  }
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
          {randomMovie?.platforms?.[0] && <Button variant="solid" sx={{ backgroundColor: "white" }}
           onClick={()=>{window.open(platformURL, "_blank");console.log("platforlmurl:",platformURL)}}>
            <Typography variant="h6" sx={{ fontSize: "14px", color: "black" }}>
              You can watch on {moviePlatforms[0]}
            </Typography>
          </Button>}
          <IconButton >
            <AddCircleRoundedIcon sx={{ fontSize: "40px", color: "white" }} />
          </IconButton>
          <IconButton
          >
            <InfoIcon onClick={handleClickOnInfo} sx={{ fontSize: "40px", color: "white" }} />
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