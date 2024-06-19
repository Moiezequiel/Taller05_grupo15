// services/appointmentService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/appointment';
const token = localStorage.getItem('token');

export const getRequests = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/requests`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error;
    }
};

export const getDoctors = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/doctors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

export const approveAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/approve`, appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error approving appointment:', error);
        throw error;
    }
};

export const getSpecialties = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/specialties`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching specialties:', error);
        throw error;
    }
}


