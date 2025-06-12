import { Box, TextField, Typography, Autocomplete, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import MovieGrid from "../components/filmList/MovieGrid.jsx";
import { getRandomMovies, getMoviesBySearch, searchMovie, searchMovies } from "../api/movie/movie.js";

export default function NewUserWatchedPage() {
  const [movies, setMovies] = useState([]); // Başlangıç 20 film
  const [selectedMovies, setSelectedMovies] = useState([]); // Seçilen filmler
  const [searchText, setSearchText] = useState(""); // Autocomplete input metni
  const [searchResults, setSearchResults] = useState([]); // Arama sonucu filmler
//todo:movie search edilirken var mı diye bakmıyor sanırım tekrardan dbye ekledi çünkü , entera basınca chip olarak ekşlyor search boş olunca hata atıyor
  useEffect(() => {
    fetch20Movies(); // ilk başta rastgele film listesi al
  }, []);

  const fetch20Movies = async () => {
    const response = await getRandomMovies(20);
    setMovies(response);
  };

  // Arama metni değiştikçe API’den yeni sonuçları getir
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim() === "") {
        setSearchResults([]);
      } else {
        fetchSearchResults(searchText);
      }
    }, 300); // debounce için

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const fetchSearchResults = async (title) => {
    try {
      const result = await searchMovies(title); 
      setSearchResults(result);
    } catch (err) {
      console.error("Arama hatası:", err);
    }
  };

  // Chip'lerin options içinden silinmemesi için options'a ekle
  const mergedOptions = [...searchResults, ...selectedMovies];
  const uniqueOptions = Array.from(
    new Map(mergedOptions.map((m) => [m.id, m])).values()
  );

  return (
    <Box
      sx={{
        marginTop: "60px",
        height: "91vh",
        background: "linear-gradient(to bottom right, #0e0e0e, #2d0f0f)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "95%",
          backgroundColor: "rgba(66, 62, 64, 0.4)",
          height: "87%",
          marginTop: "40px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: "20px 0px 10px 0px",
            color: "white",
            alignContent: "center",
          }}
        >
          Sevdiğiniz 5 filmi seçiniz...
        </Typography>

        <Autocomplete
          multiple
          freeSolo
          disablePortal
          open={false} // Açılır pencereyi kapattık
          options={uniqueOptions} // Seçilenler ve arama sonuçları birleşik
          value={selectedMovies}
          inputValue={searchText}
          onInputChange={(e, newValue) => setSearchText(newValue)} // input metnini güncelle
          onChange={(event, newValue) => setSelectedMovies(newValue)} // Chip'lerden seç/sil
          getOptionLabel={(movie) => movie.title}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                label={option.title}
                {...getTagProps({ index })}
                key={option.id}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  margin: "2px",
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Film Ara"
              placeholder="Film adı yazın..."
              InputProps={{
                ...params.InputProps,
                sx: { color: "white" },
              }}
              InputLabelProps={{ sx: { color: "white" } }}
            />
          )}
          sx={{
            width: "95%",
            padding: "0px 20px 20px 20px",
            color: "white",
          }}
        />

        <MovieGrid
          movies={searchText ? searchResults : movies}
          newSelectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
      </Box>
    </Box>
  );
}
