import { useEffect,useState } from "react";
import { getRandomMovie } from "../../api/movie/movie";
import { Box, Button, Typography, IconButton } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoIcon from "@mui/icons-material/Info";
import ListMenu from "./ListMenu";
import { getMyListMovie } from "../../api/movieType/movieType";

export default function DummyMovie(props) {
  const [randomMovie, setRandomMovie] = useState(null);
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
  const [statusOfMovie, setStatusOfMovie] = useState({
    favoriteMovies:false,
    watchedMovies:false,
    wishlistMovies:false
  });
  const [clicked,setClicked]=useState(false);

 
  useEffect(() => {
    fetchRandomMovie();
  }, []);
   useEffect(() => {
  if (randomMovie?.id) {
    fetchMovieTypes();
  }
}, [randomMovie?.id, clicked]);
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
  
    const fetchMovieTypes = async () => {
      try {
        const movieType=await getMyListMovie(randomMovie.id);
        setStatusOfMovie(movieType);
        const color=statusOfMovie.favoriteMovies?"red":"white";
        props.movieType=statusOfMovie;
        console.log(movieType);
      } catch (error) {
        console.log(randomMovie);
        console.log("Problem in fetching movieType");
      }
    };
  return (
    <Box
      sx={{
        position: "relative",
        width: "95%",
        height: "550px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${randomMovie?.background_url})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "5%",
      }}
    >
      <Box sx={{ color: "white", maxWidth: "100%" ,textAlign:"left"}}>
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
                  <ListMenu movie={randomMovie} statusOfMovie={statusOfMovie} setClicked={setClicked} fontSize={40}/>
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
          top: 450,
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