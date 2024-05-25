import { CurrencyEuroIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useFetcher } from 'react-router-dom';
//import { useRef } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';

const AddIncomesForm = () => {
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
        Record an income
      </h2>
      <fetcher.Form
         method="post"
         className="grid-sm"
         ref={formRef}
      >
        <div className="grid-xs">
            <label htmlFor="newIncome">Income source</label>
            <input 
                type="text" 
                name="newIncome"
                id="newIncome"
                placeholder="e.g., Salary"
                required
                ref={focusRef}
            />
        </div>
        <div className="grid-xs">
          <label htmlFor="newIncomeAmount">Amount</label>
         <input
            type="number"
            step="0.01"
            name="newIncomeAmount"
            id="newIncomeAmount"
            placeholder="e.g., $359"
            required
            inputMode="decimal"
         />
        </div>
        <input type="hidden" name="_action" 
         value="createIncome" />
        <button type="submit" className="btn btn--dark"
          disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting...</span> : 
            <>
             <span>Record income</span>
             <CurrencyEuroIcon width={20} />
            </>
             
          }
       </button>   
      </fetcher.Form>
    </div>
  )
}

export default AddIncomesForm;