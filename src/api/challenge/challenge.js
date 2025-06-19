import axios from "axios";
import { baseURL } from '../constants';

export const createNewChallenge = async (movieId,duration,opponentId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/challenge/create`, { movie_id:movieId,
            duration:duration,
            opponent_id:opponentId
         }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response challenge:",response);
    } catch (error) {
        console.error('Error create challenge :', error);
        throw error;
    }
}
