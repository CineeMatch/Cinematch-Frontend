import { Box } from '@mui/material';
import DummyMovie from '../components/main/DummyMovie';
import MovieModal from '../components/main/MovieModal';
import MovieCarousel from "../components/main/MovieCarousel";
import Top10Carousel from '../components/main/Top10Carousel';

import { useState } from 'react';
export default function MainPage()
{  const [openMovieModal, setOpenMovieModal] = useState(false);
    return(
         <Box sx={{ height: '%100', backgroundColor: 'black' }}>
        <DummyMovie onClickInfoButton={()=>setOpenMovieModal(true)}/>
        <MovieCarousel onClick={()=>{setOpenMovieModal(true)
        console.log("clicked");}
        } title={"Sizin İçin Seçtiklerimiz"}/>
        <Top10Carousel onClick={()=>{setOpenMovieModal(true)
        console.log("clicked");}
        }/>
        <MovieCarousel onClick={()=>{setOpenMovieModal(true)
        console.log("clicked");}
        } title={"Arkadaşlarınız Bunları İzledi"}/>
        <MovieModal open={openMovieModal} onClose={()=>{setOpenMovieModal(false);
          console.log("close")
        }}/>
        </Box>
    )
}