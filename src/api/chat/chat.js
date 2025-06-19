import axios from "axios";
import { baseURL } from "../constants.js";


export const getChatMessages = async (chatId, limit = 20, offset = 0) => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseURL}/conversation/messages/${chatId}?limit=${limit}&offset=${offset}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}