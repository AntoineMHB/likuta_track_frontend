
import { CurrencyEuroIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom';


const AddFinancialGoalForm = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if(!isSubmitting){
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Set a financial goal
      </h2>
      <fetcher.Form
         method="post"
         className="grid-sm"
         ref={formRef}
      >
        <div className="grid-xs">
            <label htmlFor="newFinancialGoal">Name of the goal</label>
            <input 
                type="text" 
                name="newFinancialGoal"
                id="newFinancialGoal"
                placeholder="e.g., Saving for vacation trip"
                required
                ref={focusRef}
            />
        </div>
        <div className="grid-xs">
          <label htmlFor="currentFinancialGoalAmount">Current Amount</label>
         <input
            type="number"
            step="0.01"
            name="currentFinancialGoalAmount"
            id="currentFinancialGoalAmount"
            placeholder="e.g., $359"
            required
            inputMode="decimal"
         />
        </div>
        <div className="grid-xs">
          <label htmlFor="targetAmount">Target Amount</label>
         <input
            type="number"
            step="0.01"
            name="targetAmount"
            id="targetAmount"
            placeholder="e.g., $359"
            required
            inputMode="decimal"
         />
        </div>
        <div className="grid-xs">
            <label htmlFor="newNotes">Notes</label>
            <input 
                type="text" 
                name="newNotes"
                id="newNotes"
                placeholder="Optional"
            />
        </div>
        <input type="hidden" name="_action" 
         value="createFinancialGoal" />
        <button type="submit" className="btn btn--dark"
          disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting...</span> : 
            <>
             <span>Set goal</span>
             <CurrencyEuroIcon width={20} />
            </>
             
          }
       </button>   
      </fetcher.Form>
    </div>
  )
}

export default AddFinancialGoalForm;