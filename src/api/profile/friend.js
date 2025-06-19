import axios from 'axios';
import { baseURL } from '../constants';
import toast from 'react-hot-toast';

export const getCurrentUserFriendsList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/friend/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            return response;
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching friends list:', error);
        throw error;
    }
}

export const addFriendByNickname = async (nickname) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/friend/createforNickname`, { nickname }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding friend:', error);
        throw error;
    }
}

export const deleteFriendById = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${baseURL}/friend/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
         toast.error("İstek reddedildi.")
    } catch (error) {
        console.log('Error deleting friend:', error);
    }
}
export const addFriendById=async(id)=>{
     try {
        console.log("friend:",id);
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${baseURL}/friend/accept`, {
            friendId:id
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
         toast.success("Arkadaşınız eklendi.")
      
    } catch (error) {
        console.log('Error adding friend:', error);
    }
}


