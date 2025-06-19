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
    return response.data.notifications;
  } catch (error) {
    console.log("Failed to get notfications:", error);
 }
};

export const deleteNotification= async(id)=>{
   try {
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(`${baseURL}/notification/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.log("Failed to get notfications:", error);
 }
}
export const updatetoRead=async(id)=>{
   try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${baseURL}/notification/read/${id}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.log("Failed to update notfications:", error);
 }
}