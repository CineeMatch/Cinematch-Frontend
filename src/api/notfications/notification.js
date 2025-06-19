import axios from "axios";
import { baseURL } from "../constants";
import toast from "react-hot-toast";


export const getNotfications = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseURL}/notifications/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.notification;
  } catch (error) {
    console.log("Failed to get notfications:", error);
 }
};