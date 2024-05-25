import axios from 'axios';
import { toast } from 'react-toastify';

const REST_API_BASE_URL = 'http://localhost:8080/budgets';

export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post(REST_API_BASE_URL, budgetData);
    if (response.status === 200) {
      const newBudget = response.data;
      // Get current budgets from local storage
      const storedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
      // Add the new budget to the stored budgets
      storedBudgets.push(newBudget);
      // Save the updated budgets back to local storage
      localStorage.setItem('budgets', JSON.stringify(storedBudgets));
      toast.success('Budget created successfully!');
      return newBudget; // Return the newly created budget
    } else {
      throw new Error('Failed to create budget');
    }
  } catch (error) {
    console.error('Error creating budget:', error);
    toast.error('Failed to create budget');
    throw error; // Rethrow the error for the caller to handle
  }
};
