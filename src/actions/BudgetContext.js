// BudgetContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const BudgetContext = createContext();

export const useBudgets = () => {
  return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const storedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(storedBudgets);
  }, []);

  const addBudget = (newBudget) => {
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  };

  return (
    <BudgetContext.Provider value={{ budgets, addBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
