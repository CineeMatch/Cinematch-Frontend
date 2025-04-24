import {Box,Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MovieGrid from "../components/filmList/MovieGrid.jsx";
import MovieModal from "../components/home/MovieModal.jsx";
import { useState } from "react";




export default function WatchedPage(){
const [openMovieModal, setOpenMovieModal] = useState(false);
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    color:"white",
    transition: theme.transitions.create(['background-color', 'width'], {
      duration: theme.transitions.duration.short,
    }),
    backgroundColor: 'transparent', 
    '&:focus-within': {
      backgroundColor: alpha(theme.palette.common.white, 0.15), 
    },
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      backgroundColor: 'transparent',
      [theme.breakpoints.up('sm')]: {
        width: '0ch',
        '&:focus': {
          width: '160vh',
        },
      },
    },
  }))
    return(
      <Box
      sx={{
        height: '91vh',
    background: 'linear-gradient(to bottom right, #0e0e0e, #2d0f0f)',
    display:"flex",
    justifyContent:"center",

      }}
      >
        <Box
        sx={
          {
            width:"95%",
            backgroundColor:"rgba(66, 62, 64, 0.4)",
            height:"85%",
            marginTop:"40px",
            display:"column"

          }
        }
        >
        
           <Box sx={{  display: 'flex', justifyContent: 'space-between', padding: 2, width: '98%',height:"35px",alignContent:"center" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', color: 'white',}}
      >
        WATCHED
      </Typography>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        
        <MovieGrid onClickOpenMovieModal={()=>{setOpenMovieModal(true)
        console.log("clicked");}}/>
        
      </Box>
      <MovieModal open={openMovieModal} onClose={()=>{setOpenMovieModal(false);
          console.log("close")
        }}/>
      
      </Box>

    )
}