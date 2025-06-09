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
    console.log(response.data.movies);
    return response.data.movies;
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
    console.log("response", response.data);
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error("Failed to get movie:", error);
    toast.error("Filmler bulunamadı.");
  }
}