import { Box } from '@mui/material';
import MovieCarousel from '../components/home/MovieCarousel';
import MovieModal from '../components/home/MovieModal';
import DummyMovie from '../components/home/DummyMovie';
import Top10Carousel from '../components/home/Top10Carousel';

import { useState,useEffect } from 'react';
import { get10RandomMovie ,getFriendsWatched, getRandomMovies, getRecommendation } from '../api/movie/movie';
export default function MainPage()
{  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
  const [topMovies, setTopMovies] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState(null);
  const [friendsMovies, setFriendsMovies] = useState(null);
  const [movie, setMovie] = useState({});
  
 useEffect(() => {
    fetchRandom10Movies();
    fetchFriendsMovies();
  }, []);
  const fetchRandom10Movies = async () => {
    try {
       const movies=await getRecommendation();
      setRecommendedMovies(movies);
    } catch (error) {
      setRecommendedMovies(null);
    }
  };
  const fetchFriendsMovies = async () => {
    try {
      const friendsMovies = await getFriendsWatched();
      const movies=[...friendsMovies];
      console.log("Friends Movies:", movies);
      if(friendsMovies.length<=10){
        const randomMovies=await getRandomMovies(10-friendsMovies.length);
          randomMovies.map(m=>movies.push(m));
      }
            console.log("Friends Movies:", movies);

      setFriendsMovies(movies);
    } catch (error) {
      setFriendsMovies(null);
    }
  };

    return(
         <Box sx={{   mt: '69px',
    height: '100vh', // ✅ ekranın tamamını kapla
    backgroundColor: 'black',
    overflowY: 'auto', // ✅ sadece dikey scroll kontrolü
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome/Safari
    }, }}>
        <DummyMovie openMovieModal={setOpenMovieModal} onRandomMovieChange={setRandomMovie} movie={setMovie} />
        <MovieCarousel movies={recommendedMovies} openMovieModal={setOpenMovieModal} title={"Sizin İçin Seçtiklerimiz"} movie={setMovie}/>
        <Top10Carousel openMovieModal={setOpenMovieModal}
        movie={setMovie}
        onTopMoviesChange={setTopMovies}
        />
        <MovieCarousel movies={friendsMovies} openMovieModal={setOpenMovieModal} title={"Arkadaşlarınız Bunları İzledi"} movie={setMovie}/>
        <MovieModal open={openMovieModal} movie={movie} onClose={() => { setOpenMovieModal(false);
          console.log("close")
        }}/>
        </Box>
    )
}