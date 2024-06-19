import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/prescription/';
const token = localStorage.getItem('token');

export const getAppointmentsByPatient = async (patientId) => {
    try {
        const response = await axios.get(`${BASE_URL}${patientId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};
