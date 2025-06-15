import axios from "axios";
import { baseURL } from "../constants.js";


export const createPost = async ({ movie_id, contentText }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User  token not found.');
  }

  const response = await axios.post(
    `${baseURL}/post/create`,
    { movie_id, contentText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getPostByCategoryId = async (categoryId) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(`${baseURL}/posts/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const deletePost = async (postId) => {
  try{
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(`${baseURL}/post/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("While Post is deleted, create error ", error);
    throw new Error("While Post is deleted, create error ");
  }
};
