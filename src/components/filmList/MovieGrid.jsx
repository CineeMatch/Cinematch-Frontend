import { Grid, Box } from "@mui/material";
import { useState } from "react";

export default function MovieGrid(props) {
  const defaultMovieSx = {
    borderRadius: "4px",
    width: "100%",
    height: "auto",
    aspectRatio: "2/3",
    objectFit: "cover",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  const selectedMovieSx = {
    ...defaultMovieSx,
    border: "4px solid rgba(255, 255, 255, 0.87)",
  };

  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleClick = (movie) => {
    if (selectedMovies.some(m => m.id === movie.id)) {
      setSelectedMovies(selectedMovies.filter(m => m.id !== movie.id));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
    props.selectedMovies?.(selectedMovies);
  };

  return (
    <Grid container spacing={2} sx={{ padding: "10px" }}>
      {props.movies?.map((movie, index) => (
        <Grid
          item
          key={index}
          xs={2.5}
          sm={2}
          md={1.75}
          lg={1.2}
          xl={1}
        >
          <Box
            component="img"
            src={movie.poster_url}
            alt={movie.title}
            sx={selectedMovies.some(m => m.id === movie.id) ? selectedMovieSx : defaultMovieSx}
            onClick={() => handleClick(movie)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
