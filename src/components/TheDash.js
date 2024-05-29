import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';

import Sidebar from '.Components/Sidebar';
import AddBudgetForm from './AddBudgetForm';
import BudgetItem from './Budgetitem';
import Table from './Table';


// loader
export function thedashLoader() {
    const budgets = fetchData("budgets") ?? [];
    const expenses = fetchData("expenses") ?? [];

    return { budgets, expenses };
}

const TheDash = () => {
    const [userName, setUserName] = useState('');
    const { budgets: initialBudgets, expenses } = useLoaderData();
    const [budgets, setBudgets] = useState(initialBudgets);

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleAddBudget = (newBudget) => {
        console.log('New budget added:', newBudget);
        addBudget(newBudget); // Add the new budget to the sate
        togglePopup(); // Close the popup after adding a new 
    };

    useEffect(() => {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (userData) {
            const { username } = JSON.parse(userData);
            setUserName(username); // Set the username state
        }
    }, []);

    const addBudget = (newBudget) => {
        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    };

    return (
        <div className="grid-sm">
            <Sidebar/>
            <h2>Welcome, <span className="accent">{userName}</span></h2>
            {/* <h3>Dashboard</h3> */}
            

            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close"  onClick={togglePopup}>&times;</span>
                            <AddBudgetForm onAddBudget={handleAddBudget} />
                        </div>
                    </div>
                )
            }
            <div className="grid-lg">
               

                <h2>Existing Budgets</h2>
                <div className="budgets">
                    {budgets && budgets.length > 0 ? (
                        budgets.map((budget) => (
                            <BudgetItem key={budget.id} budget={budget} />
                        ))
                    ) : (
                        <p>No budgets available.</p>
                    )}
                </div>
                <button className="btn btn--dark" style={{ width: '150px' }} onClick={togglePopup}>Add Budget</button>
                {expenses && expenses.length > 0 && (
                    <div className="grid-mid">
                        <h2>Recent Expenses</h2>
                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)} />
                        {expenses.length > 5 && (
                            <Link to="expenses" className="btn btn--dark">
                                View all expenses
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TheDash;
