import { Box, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import MovieGrid from "../../components/filmList/MovieGrid";
import MovieModal from "../../components/home/MovieModal";
import { getRandomMovies } from "../../api/movie/movie";
import SearchInput from "../../components/filmList/SearchInput";
import { searchMovies } from "../../api/movie/movie";
import { toast } from "react-toastify";

export default function SearchModal({ open, close,searchInput }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openMovieModal, setOpenMovieModal] = useState(false);

  useEffect(() => {
    if (open) {
      fetch20Movies();
      setSearchTerm(searchInput);
    }
  }, [open]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
      } else {
        fetchSearchResults(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

const fetch20Movies = async () => {
    const response = await getRandomMovies(24);
    setMovies(response);
  };
  const fetchSearchResults = async (title) => {
    try {
      const result = await searchMovies(title); 
    setSearchResults(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Arama hatası:", err);
      toast.error("Film arama sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };



  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          margin: "60px auto",
          width: "95%",
          maxHeight: "90vh",
          overflow: "auto",
          backgroundColor: "#1a1a1a",
          padding: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.6)',textAlign:"center",fontWeight:"bold" }}>
          FILM ARA
          </Typography>
          <SearchInput
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          expandWidth="250vh"
        />

        <MovieGrid
          movies={searchTerm.trim() !== "" ? searchResults : movies}

          onClickOpenMovieModal={setOpenMovieModal}
          movie={setMovie}
        />

        <MovieModal
          open={openMovieModal}
          movie={movie}
          onClose={() => setOpenMovieModal(false)}
        />
      </Box>
    </Modal>
  );
}