import {Box,TextField,Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MovieGrid from "../components/filmList/MovieGrid.jsx";
import Autocomplete from '@mui/material/Autocomplete';
import { use, useEffect, useState } from "react";
import { getAllMovies, getRandomMovies } from "../api/movie/movie.js";
import Chip from '@mui/material/Chip';

//todo: searchbarı yana kayabilecek şekilde düzenle , useeffect ile selectedMovies düzelt, searchbar'ını etkin kullandır. x butonlarını etkin hale getir. 

export default function NewUserWatchedPage(){
const [value, setValue] = useState([]);
const [movies, setMovies] = useState([]);
const [selectedMovies, setSelectedMovies] = useState([]);
useEffect(() => {
  fetch20Movies();
}, []);

const fetch20Movies = async () => {
  try {
    const response = await getRandomMovies(20);
    setMovies(response);
    console.log("Fetched movies:", response);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

    return(
      <Box
      sx={{
        marginTop: "60px",
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
            height:"87%",
            marginTop:"40px",
            display:"column"

          }
        }
        >
        
      <Typography
        variant="h6"
        sx={{ padding:"20px 0px 10px 0px", color: 'white', alignContent: 'center' }}
      >
        Sevdiğiniz en az 5 film seçin ve izleme geçmişinizi oluşturun...
      </Typography>
     <Autocomplete
        multiple
        id="custom-grid-autocomplete"
        options={movies}
        getOptionLabel={(movie) => movie.title}
        value={selectedMovies}
        onChange={(event, newValue) => setValue(newValue)}
        open={false} 
        disablePortal
        sx={{ width: "95%", padding: "0px 20px 20px 20px", color: 'white' }}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              label={option.title}
              {...getTagProps({ index })}
              key={option.title}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                margin: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Filmler" placeholder="Film Arayın" InputProps={{
    ...params.InputProps,
    sx: {
      color: 'white', // input metni
    },
  }}
  InputLabelProps={{
    sx: {
      color: 'white', // label rengi
    },
  }} />
        )}
      />


        <MovieGrid movies={movies} selectedMovies={setSelectedMovies} />

      </Box>
      
      </Box>

    )
}