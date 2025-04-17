import { Box } from '@mui/material';
import DummyMovie from "../main/DummyMovie";
import MovieModal from "../main/MovieModal";
import MovieCarousel from "../main/MovieCarousel";
import { useState } from 'react';
import Top10Carousel from '../main/Top10Carousel';
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