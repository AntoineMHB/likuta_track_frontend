import React from 'react';

// helper functions
import { calculateSpentByBudget, formatCurrency, formatPercentage } from '../helpers';

const thebudgetItem = ({ budget }) => {
    const {id, budgetname, amount, color} = budget;
    const spent = calculateSpentByBudget(id);


  return (
    <div 
      className="budget"
      style={{
        "--accent": color
      }}
    >
      <div className="progress-text">
        <h3>{budgetname}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
    </div>
  )
}

export default thebudgetItem;