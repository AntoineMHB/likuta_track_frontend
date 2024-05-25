import axios from 'axios';
import { toast } from 'react-toastify';

const REST_API_BASE_URL = 'http://localhost:8080/expenses';

export const createExpense = async (expenseData) => {
  try {
    const response = await axios.post(REST_API_BASE_URL, expenseData);
    if (response.status === 200) {
      const newExpense = response.data;
      // Get current expenses from local storage
      const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      // Add the new expense to the stored expenses
      storedExpenses.push(newExpense);
      // Save the updated expenses back to local storage
      localStorage.setItem('expenses', JSON.stringify(storedExpenses));
      toast.success('Expense created successfully!');
      return newExpense; // Return the newly created expense
    } else {
      throw new Error('Failed to create expense');
    }
  } catch (error) {
    console.error('Error creating expense:', error);
    toast.error('Failed to create expense');
    throw error; // Rethrow the error for the caller to handle
  }
};
