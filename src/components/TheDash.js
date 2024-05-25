// TheDash.js
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';
import AddBudgetForm from './AddBudgetForm';
import AddExpenseForm from './AddExpenseForm';
import AddFinancialGoalForm from './AddFinancialGoalForm';
import AddIncomesForm from './AddIncomesForm';
import BudgetItem from './Budgetitem';
import Table from './Table';


// loader

export function thedashLoader() {
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");

    return { budgets, expenses }
};

const TheDash = () => {
  const [userName, setUserName] = useState('');
  const { budgets: initialBudgets } = useLoaderData();
  const [budgets, setBudgets] = useState(initialBudgets);
  const { expenses } = useLoaderData();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username } = JSON.parse(userData);
      setUserName(username); //set the username state
    }
 }, []);

  const addBudget = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  return (
    <div className="grid-sm">
      <h2>Welcome, <span className="accent">{userName}</span></h2>
      <h3>My Dashboard</h3>
      <div className="grid-lg">
        <div className="flex-lg">
          <AddBudgetForm onAddBudget={addBudget}/>
          <AddExpenseForm budgets={budgets} />
          <AddIncomesForm />
          <AddFinancialGoalForm />        
        </div>

        <h2>Existing Budgets</h2>
        <div className="budgets">
          {
            budgets.map((budget) => (
              <BudgetItem key={budget.id} budget={budget}/>
                ))
          }
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-mid">
                    <h2>Recent Expenses</h2>
                    <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)} />
                    {expenses.length > 5 && (
                        <Link
                           to="expenses"
                           className="btn btn--dark"
                        >
                            View all expenses
                        </Link>
                    )}
                </div>
            )
        }
                
      </div>
    </div>
  );
}


export default TheDash;
