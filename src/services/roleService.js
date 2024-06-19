import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth/';

export const getRole = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Roles:', response.data.data.roles[0].name);
        return response.data.data.roles[0].name;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
}