import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MovieGrid from "../components/filmList/MovieGrid";
import MovieModal from "../components/home/MovieModal";
import { getWatchedMovies } from "../api/movieType/movieType"; // doğru path'e göre kontrol et
import SearchInput from "../components/filmList/SearchInput"; // önceki tek bileşenli versiyon

export default function WatchedPage() {
  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  const fetchWatchedMovies = async () => {
    const response = await getWatchedMovies();
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
        background: 'linear-gradient(to bottom right, #0e0e0e, #1a2b2f)',
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
            WATCHED
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
        onClose={() => setOpenMovieModal(false)}
      />
    </Box>
  );
}
