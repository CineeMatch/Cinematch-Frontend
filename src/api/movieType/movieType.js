import axios from "axios";
import { baseURL } from "../constants.js";

export const addMovieToFavoritesForNewUser = async (movieId) => {
  try {
    const token = localStorage.getItem("authToken");

    const response=await axios.post(
      `${baseURL}/movieType/create`,
      {
        movie_id: movieId,
        favoriteMovies: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response:",response);
    const response2 = await axios.put(
      `${baseURL}/movieType/create/isOnProfile`,
      {
        movie_ids: [movieId],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log("response2:",response2);

  } catch (error) {
    throw error;
  }
};

// Ortak movie detay dönüştürücü
const transformMovie = (movie) => ({
  ...movie,
  categories: movie.categories?.map(cat => cat.name).join(", ") || "",
  platforms: movie.platforms?.map(p => p.name).join(", ") || "",
});

// FAVORITE
export const getFavoriteMovies = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${baseURL}/movieTypes/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const movieIds = response.data.data.map(d => d.movie_id);
    const movieRequests = movieIds.map(id =>
      axios.get(`${baseURL}/movie/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const movieResponses = await Promise.all(movieRequests);
    const movies = movieResponses.map(res => transformMovie(res.data));

    return movies;
  } catch (error) {
    console.error("getFavoriteMovies error:", error);
    return [];
  }
};

// WATCHED
export const getWatchedMovies = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${baseURL}/movieTypes/watched`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const movieIds = response.data.data.map(d => d.movie_id);
    const movieRequests = movieIds.map(id =>
      axios.get(`${baseURL}/movie/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const movieResponses = await Promise.all(movieRequests);
    const movies = movieResponses.map(res => transformMovie(res.data));

    return movies;
  } catch (error) {
    console.error("getWatchedMovies error:", error);
    return [];
  }
};

// WISHLIST
export const getWishlistMovies = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${baseURL}/movieTypes/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const movieIds = response.data.data.map(d => d.movie_id);
    const movieRequests = movieIds.map(id =>
      axios.get(`${baseURL}/movie/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const movieResponses = await Promise.all(movieRequests);
    const movies = movieResponses.map(res => transformMovie(res.data));

    return movies;
  } catch (error) {
    console.error("getWishlistMovies error:", error);
    return [];
  }
};
