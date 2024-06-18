import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/expenses';

export const getAllExpenses = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    if (response.status === 200) {
      return response.data; // Return the array of expenses
    } else {
      throw new Error('Failed to fetch expenses');
    }
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};
