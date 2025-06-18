import axios from "axios";
import { baseURL } from "../constants";
import toast from "react-hot-toast";


export const getMovie = async (movieId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseURL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Film bulunamadı.");
  }
};


export const searchMovie = async (title) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/search`, { title }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Film bulunamadı.");
  }
};



export const getTop10Movies = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/top10`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("TTop 10 movies:", response.data);
    const data = response.data.movies.map(movie => {
      return {
        ...movie,
        categories: movie.categories.map(category => category.name).join(", "),
        platforms: movie.platforms?.map(platform => platform.name).join(", ") || []
      };
    });
    console.log("ttop 10 movies:", data);
    return data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Filmler bulunamadı.");
  }
};



export const getRandomMovie = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/random`, { limit: 1 }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.map(movie => {
      return {
        ...movie,
        categories: movie.categories.map(category => category.name).join(", "),
        platforms: movie.platforms?.map(platform => platform.name).join(", ") || []
      };
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Film bulunamadı.");
  }
}
export const get10RandomMovie = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/random`, { limit: 10 }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response.data);
    const data = response.data.map(movie => {
      return {
        ...movie,
        categories: movie.categories.map(category => category.name).join(", "),
        platforms: movie.platforms?.map(platform => platform.name).join(", ") || []
      };
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Filmler bulunamadı.");
  }
}
export const getAllMovies = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseURL}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from getAllMovies:", response.data);
    console.log("All movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get all movies:", error);
    toast.error("Filmler bulunamadı.");
  }
}
export const getRandomMovies = async (limit) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/random`, { limit: limit }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response.data);
    const data = response.data.map(movie => {
      return {
        ...movie,
        categories: movie.categories.map(category => category.name).join(", "),
        platforms: movie.platforms?.map(platform => platform.name).join(", ") || []
      };
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Filmler bulunamadı.");
  }
}

export const searchMovies = async (title) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/search`, { title: title }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response.data);
    return response.data
  }
  catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Filmler bulunamadı.");
  }
}
export const getFriendsWatched = async () => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(`${baseURL}/friend/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const friendsList = response.data;

    const allWatchedLists = await Promise.all(
      friendsList.map(async (f) => {
        const res = await axios.get(`${baseURL}/movieType/${f.id}/counts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const watchedList = res.data.watchedList || [];
        return watchedList.map(item => item.movie_id);
      })
    );

    const allMovieIds = allWatchedLists.flat();
    const uniqueMovieIds = [...new Set(allMovieIds)];
    const shuffled = uniqueMovieIds.sort(() => 0.5 - Math.random());
    const selectedMovieIds = shuffled.slice(0, 10);

    const allMovies = await Promise.all(
      selectedMovieIds.map(async (movieId) => {
        const res = await axios.get(`${baseURL}/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      })
    );

    const fAllMovies = allMovies.map(movie => {
      return {
        ...movie,
        categories: movie.categories.map(category => category.name).join(", "),
        platforms: movie.platforms?.map(platform => platform.name).join(", ") || []
      };
    });
    return fAllMovies;
  } catch (error) {
    console.error('Error in getFriendsWatched:', error);
    return [];
  }
};

export const getRecommendation = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const preResponse = await axios.get(`${baseURL}/recommendation/recommendForUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("recommendated Movies", preResponse.data);

    const response = await Promise.all(preResponse.data.map(async (r) => await getMovie(r.id)));
    console.log(response);
    const data = response.map(movie => {
      return {
        ...movie,
        categories: movie.categories.map(category => category.name).join(", "),
        platforms: movie.platforms?.map(platform => platform.name).join(", ") || []
      };
    });
    console.log("recommendation", data);
    return data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Filmler bulunamadı.");
  }
}