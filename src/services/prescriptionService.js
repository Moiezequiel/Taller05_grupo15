import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/prescription';
const token = localStorage.getItem('token');

export const getPrescriptionsByUser = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        throw error;
    }
};
