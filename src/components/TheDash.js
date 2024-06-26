import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../helpers';

import AddBudgetForm from './AddBudgetForm';
import BudgetItem from './Budgetitem';
import { SidebarData } from './SidebarData';
import Table from './Table';
import TheSidebar from './TheSidebar';


// loader
export function thedashLoader() {
    const budgets = fetchData("budgets") ?? [];
    const expenses = fetchData("expenses") ?? [];

    return { budgets, expenses };
}


const TheDash = () => {
    const [userName, setUserName] = useState('');
    const { budgets: initialBudgets, expenses } = thedashLoader()
    const [budgets, setBudgets] = useState(initialBudgets);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleAddBudget = (newBudget) => {
        console.log('New budget added:', newBudget);
        addBudget(newBudget);
        togglePopup();
    };

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const { username } = JSON.parse(userData);
            setUserName(username);
        }
    }, []);

    const addBudget = (newBudget) => {
        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    };

    return (
        <div className="container">
            <TheSidebar data={SidebarData} />
            <div className="main-content">
                <div className="grid-sm">
                    <h2>Welcome, <span className="accent">{userName}</span></h2>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={togglePopup}>&times;</span>
                                <AddBudgetForm onAddBudget={handleAddBudget} />
                            </div>
                        </div>
                    )}
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
            </div>
        </div>
    );
}

export default TheDash;
