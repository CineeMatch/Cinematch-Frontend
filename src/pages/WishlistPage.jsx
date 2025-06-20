import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MovieGrid from "../components/filmList/MovieGrid";
import MovieModal from "../components/home/MovieModal";
import { getWishlistMovies } from "../api/movieType/movieType";
import SearchInput from "../components/filmList/SearchInput";

export default function WishlistPage() {
  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWishlistMovies();
  }, []);

  const fetchWishlistMovies = async () => {
    const response = await getWishlistMovies();
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.79), rgba(0, 0, 0, 0.5)),
    url(/images/main-Photoroom.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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
            sx={{ fontWeight: 'bold', color: 'white',whiteSpace: 'nowrap' }}
          >
            İSTEK LİSTESİ
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
