import axios from "axios";
import { baseURL } from "../constants.js";

export const getCommentsByPostId = async (postId) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(
    `${baseURL}/comments/post/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );

  return response.data;
};

export const createComment = async (postId, commentText) => {
  try{
    const token = localStorage.getItem("authToken");
  const response = await axios.post(`${baseURL}/comment/create`,
    {
      post_id: postId,
      commentText: commentText,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
  }catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};
