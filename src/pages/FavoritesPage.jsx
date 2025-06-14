import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MovieGrid from "../components/filmList/MovieGrid.jsx";
import MovieModal from "../components/home/MovieModal";
import { getFavoriteMovies } from "../api/movieType/movieType.js";
import SearchInput from "../components/filmList/SearchInput.jsx"; // import path'ini dosya yapına göre düzenle

export default function FavoritesPage() {
  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchFavoriteMovies = async () => {
    const response = await getFavoriteMovies();
    console.log("response:", response);
    setMovies(response);
  };

  const filteredMovies = movies.filter((m) =>
    m.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        marginTop: "60px",
        height: '91vh',
        background: 'linear-gradient(to bottom right, #0e0e0e, #2d0f0f)',
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "95%",
          backgroundColor: "rgba(66, 62, 64, 0.4)",
          height: "85%",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2,
            width: '98%',
            height: "35px",
            alignItems: "center"
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            FAVORITES
          </Typography>
          <SearchInput
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <MovieGrid
          movies={filteredMovies}
          onClickOpenMovieModal={setOpenMovieModal}
          movie={setMovie}
        />
      </Box>

      <MovieModal
        open={openMovieModal}
        movie={movie}
        onClose={() => {
          setOpenMovieModal(false);
          console.log("close");
        }}
      />
    </Box>
  );
}
