import axios from "axios";
import { baseURL } from "../constants";
import { toast } from "react-toastify";

export const getAllCategories = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseURL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get Category:", error);
    toast.error("Category is not found.");
  }
};