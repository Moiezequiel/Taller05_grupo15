import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/schedule';
const token = localStorage.getItem('token');

export const getScheduleByDoctorAndDate = async (doctorId, date) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                doctorId: doctorId,
                date: date
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        throw error;
    }
};
