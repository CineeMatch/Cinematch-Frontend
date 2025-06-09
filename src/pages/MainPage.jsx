import { Box } from '@mui/material';
import MovieCarousel from '../components/home/MovieCarousel';
import MovieModal from '../components/home/MovieModal';
import DummyMovie from '../components/home/DummyMovie';
import Top10Carousel from '../components/home/Top10Carousel';

import { useState } from 'react';
export default function MainPage()
{  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
  const [topMovies, setTopMovies] = useState(null);

    return(
         <Box sx={{ marginTop:"60px" ,height: '%100', backgroundColor: 'black' }}>
        <DummyMovie onClickInfoButton={()=>setOpenMovieModal(true,randomMovie)} onRandomMovieChange={setRandomMovie}/>
        <MovieCarousel onClick={()=>{setOpenMovieModal(true)
        console.log("clicked");}
        } title={"Sizin İçin Seçtiklerimiz"}/>
        <Top10Carousel onClick={()=>{setOpenMovieModal(true) 
        console.log("clicked");}}
        onTopMoviesChange={setTopMovies}
        />
        <MovieCarousel onClick={()=>{setOpenMovieModal(true)
        console.log("clicked");}
        } title={"Arkadaşlarınız Bunları İzledi"}/>
        <MovieModal open={openMovieModal} onClose={()=>{setOpenMovieModal(false);
          console.log("close")
        }}/>
        </Box>
    )
}