import { Grid } from "@mui/joy"
import { Box } from "@mui/material"

export default function MovieGrid(props) {

  
     const movies =props.movies||[];
  return (
    <Grid
      container
      sx={{ margin:"20px 10px 20px 10px", rowGap: "10px", columnGap: "10px" }}
    >
      {movies.map((movie, index) => (
        <Grid key={index}>
          <Box
            component="img"
            src={movie.poster_url}
            alt={movie.title}
            sx={{
              borderRadius: '2px',
              width: "100px",
              height: "150px",
              boxShadow: '0 0 10px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
           onClick={() => {
  props.movie?.(movie);               // Seçilen filmi parent'a gönder
  props.onClickOpenMovieModal?.(true); // Modal'ı aç
}}
          />
        </Grid>
      ))}
    </Grid>
  );
}