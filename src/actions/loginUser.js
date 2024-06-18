import axios from 'axios';
import { toast } from 'react-toastify';

const REST_API_BASE_URL = 'http://localhost:8080/users/login';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(REST_API_BASE_URL, credentials);
        toast.success(response.data);
        return response.data;
    } catch (error) {
        console.error('There was an error logging in the user!', error);
        toast.error('Failed to login the user. Please try again later.');
        throw error;
    }
};