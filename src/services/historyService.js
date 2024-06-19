// src/services/historyService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/history';
const token = localStorage.getItem('token');

export const getHistoryByUser = async (userId, startDate, endDate) => {
    try {
        const params = { userId };
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await axios.get(`${BASE_URL}`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
};
