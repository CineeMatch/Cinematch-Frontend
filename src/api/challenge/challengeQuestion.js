import axios from "axios";
import { baseURL } from '../constants';

export const createChallengeQuestion = async ({ questionList, challenge_id, directed_to }) => {
    console.log("createChallengeQuestion called with:", { questionList, challenge_id, directed_to });
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/challenge-question/create`, {questionList, challenge_id, directed_to}, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response create challenge question:", response);
        return response.data;
    } catch (error) {
        console.error('Error create challenge question:', error);
        throw error;
    }
};


export const getChallengeQuestionsCurrentUserByChallengeId = async ( challangeId) => {
    try {
        console.log("getChallengeQuestionsCurrentUserByChallengeId called with challengeId:", challangeId);
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/challenge-questions/user`, { challenge_id: challangeId}, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response challenge questions:",response);
        return response.data;
    } catch (error) {
        console.error('Error get challenge questions:', error);
        throw error;
    }
};

export const  answerChallengeQuestion = async (challengeQuestionAnswerList) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${baseURL}/challenge-question/answers`, {challengeQuestionAnswerList}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response answer challenge question:",response);
        return response.data;
    } catch (error) {
        console.error('Error answer challenge question:', error);
        throw error;
    }
};