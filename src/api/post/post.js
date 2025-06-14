import axios from "axios";
import { baseURL } from "../constants.js";


export const createPost = async ({ movie_id, contentText }) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${baseURL}/post/create`,
    {
      movie_id,
      contentText,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


export const getAllPosts = async () => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(`${baseURL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
