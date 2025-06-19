import { Grid } from "@mui/material"
import { Box } from "@mui/material"

export default function MovieGrid(props) {
  const movies = [
    { title: "Shrek", image: "/images/shrek.png" },
    { title: "Shrek", image: "/images/shrek.png" },
    { title: "Shrek", image: "/images/shrek.png" },
    { title: "Shrek", image: "/images/shrek.png" },
    { title: "Shrek", image: "/images/shrek.png" },
    { title: "Shrek", image: "/images/shrek.png" }
  ];
  return (
    <Grid
      container
      sx={{ padding: "0px 20px", rowGap: "10px", columnGap: "10px" }}
    >
      {movies.map((movie, index) => (
        <Grid key={index}>
          <Box
            component="img"
            src={movie.image}
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
            onClick={props.onClickOpenMovieModal}
          />
        </Grid>
      ))}
    </Grid>
  );
}