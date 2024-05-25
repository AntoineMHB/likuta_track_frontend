import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import React, { useRef, useState } from 'react';
import { createBudget } from '../actions/budgetAction';


const AddBudgetForm = ({ onAddBudget }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const focusRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const requestData = Object.fromEntries(formData);

    try {
      const newBudget = await createBudget({
        budgetname: requestData.newBudget,
        amount: parseFloat(requestData.newBudgetAmount),
       
      });

      onAddBudget(newBudget);
      setIsSubmitting(false);
      formRef.current.reset();
      focusRef.current.focus();
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <form onSubmit={handleSubmit} className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $359"
            required
            inputMode="decimal"
          />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
