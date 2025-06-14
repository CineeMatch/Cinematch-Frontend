import { Box } from '@mui/material';
import MovieCarousel from '../components/home/MovieCarousel';
import MovieModal from '../components/home/MovieModal';
import DummyMovie from '../components/home/DummyMovie';
import Top10Carousel from '../components/home/Top10Carousel';

import { useState,useEffect } from 'react';
import { get10RandomMovie } from '../api/movie/movie';
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
      const movies = await get10RandomMovie();
      console.log("Random Movies:", movies);
      setRecommendedMovies(movies);
    } catch (error) {
      setRecommendedMovies(null);
    }
  };
  const fetchFriendsMovies = async () => {
    try {
      const movies = await get10RandomMovie();
      console.log("Random Movies:", movies);
      setFriendsMovies(movies);
    } catch (error) {
      setFriendsMovies(null);
    }
  };

    return(
         <Box sx={{ marginTop:"60px" ,height: '%100', backgroundColor: 'black' }}>
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