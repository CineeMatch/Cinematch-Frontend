import axios from "axios";
import { baseURL } from "../constants.js";
// Ortak movie detay dönüştürücü
const transformMovie = (movie) => ({
  ...movie,
  categories: movie.categories?.map(cat => cat.name).join(", ") || "",
  platforms: movie.platforms?.map(p => p.name).join(", ") || "",
});

export const addMovieToFavoritesForNewUser = async (movieId) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${baseURL}/movieType/create`,
      {
        movie_id: movieId,
        favoriteMovies: true,
        watchedMovies: true
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response:", response);
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

    console.log("response2:", response2);

  } catch (error) {
    throw error;
  }
};

const addOrDeleteMovieList = async (favoriteMovies, wishlistMovies, watchedMovies, movieId) => {
  try {
    const token = localStorage.getItem("authToken");
    console.log("ı here");
    console.log({
      movie_id: movieId,
      favoriteMovies: favoriteMovies,
      wishlistMovies: wishlistMovies,
      watchedMovies: watchedMovies
    });
    const response = await axios.post(
      `${baseURL}/movieType/create`,
      {
        movie_id: movieId,
        favoriteMovies: favoriteMovies,
        wishlistMovies: wishlistMovies,
        watchedMovies: watchedMovies
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response:", response);

  } catch (error) {
    throw error;
  }
};
export const addtoFavoriteMovies = async (movieId) => { await addOrDeleteMovieList(true, false, true, movieId); }
export const addtoWishlistMovies = async (movieId) => { await addOrDeleteMovieList(false, true, false, movieId); }
export const addtoWatchedMovies = async (movieId) => { await addOrDeleteMovieList(false, false, true, movieId); }
export const removefromFavorites = async (movieId) => { await addOrDeleteMovieList(false, false, true, movieId); }
export const removefromMylist = async (movieId) => { await addOrDeleteMovieList(false, false, false, movieId); }


// FAVORITE
const getMyListMovies = async (type) => {
  try {
    const token = localStorage.getItem("authToken");
    console.log(`${baseURL}/movieType/user-by-type?type=${type}`);
    const response = await axios.get(`${baseURL}/movieType/user-by-type?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
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
export const getFavoriteMovies = async () => await getMyListMovies("favorite");
export const getWishlistMovies = async () => await getMyListMovies("wishlist");
export const getWatchedMovies = async () => await getMyListMovies("watched");


export const getMyListMovie = async (movie_id) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${baseURL}/movieTypes?type=watched`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    let movieType = response ? response.data.find(d => d.movie_id === movie_id) : null;
    if (!movieType) {
      const response = await axios.get(`${baseURL}/movieTypes?type=watched`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      movieType = response ? response.data.find(d => d.movie_id === movie_id) : null;
    }
    console.log(movieType);
    return movieType;
  } catch (error) {
    console.error("getFavoriteMovies error:", error);
    return [];
  }
};

export const getUserMovieTypesCounts = async (userId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${baseURL}/movieType/${userId}/counts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie types for user with ID ${userId}:`, error.message);
    throw error;
  }
}

export const getMovieTypeOnProfileByUserId = async (userId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${baseURL}/movieType/movies/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie types for user with ID ${userId}:`, error.message);
    throw error;
  }
}


