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
    const response = await axios.post(`${baseURL}/movie/search`,{ title }, {
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
    const response = await axios.post(`${baseURL}/movie/random`,{limit: 1}, {
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
    const response = await axios.post(`${baseURL}/movie/random`,{limit: 10}, {
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
    const response = await axios.post(`${baseURL}/movie/random`,{limit: limit}, {
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

export const  searchMovies = async(title)=>{
  try {
     const token = localStorage.getItem("authToken");
    const response = await axios.post(`${baseURL}/movie/search`,{title:title}, {
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