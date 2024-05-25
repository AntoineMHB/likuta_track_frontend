import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createExpense } from '../actions/expenseAction';



const AddExpenseForm = ({ budgets }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const focusRef = useRef();
  const [selectedBudgetId, setSelectedBudgetId] = useState('');

  useEffect(() => {
    if (budgets.length > 0) {
      setSelectedBudgetId(budgets[0].id); // Set default selected budget
    }
  }, [budgets]);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const requestData = Object.fromEntries(formData);

    try {
       await createExpense({
        expensename: requestData.newExpense,
        amount: parseFloat(requestData.newExpenseAmount),
        budgetcategory: selectedBudgetId, // Send selected budget ID
      });

      setIsSubmitting(false);
      formRef.current.reset();
      focusRef.current.focus();
      toast.success('Expense created successfully!');
    } catch (error) {
      console.error('Error creating expense:', error);
      setIsSubmitting(false);
      toast.error('Failed to create expense');
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newExpense">Expense Name</label>
          <input
            type="text"
            name="newExpense"
            id="newExpense"
            placeholder="e.g., Coffee"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newExpenseAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newExpenseAmount"
            id="newExpenseAmount"
            placeholder="e.g., 3.50"
            required
            inputMode="decimal"
          />
        </div>
        {Array.isArray(budgets) && budgets.length > 0 && (
          <div className="grid-xs">
            <label htmlFor="budgetName">Budget Category</label>
            <select
              name="budgetName"
              id="budgetName"
              value={selectedBudgetId}
              onChange={(e) => setSelectedBudgetId(e.target.value)}
              required
            >
              {budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => (
                <option key={budget.id} value={budget.budgetname}>{budget.budgetname}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
