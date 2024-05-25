import React from 'react';

// helpers
import { deleteItem, fetchData } from '../helpers';

// rrd imports
import { useLoaderData } from 'react-router-dom';

// components imports
import Table from '../components/Table';

// library import
import { toast } from 'react-toastify';

// loader
export async function expensesLoader()
{
   const expenses = fetchData("expenses");
   return { expenses }
};

// action 
export async function expensesAction({ request }){
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense"){
    try{
      // create expense
      deleteItem({
        key: "expenses",
        id: values.expenseId
      })
      return toast.success("Expense deleted!")

    } catch(e){
      throw new Error("There was a problem deleting your expense.")

    }
  }
}

export const ExpensesPage = () => {
    const { expenses } = useLoaderData()
  return (
    <div className="grid-lg">
      <h1>All Your Expenses</h1>
      {
        expenses && expenses.length > 0 ? (
            <div className="grid-md">
                <h2>Recent Expenses<small>({expenses.length} total)</small></h2>
                <Table expenses={expenses} />
            </div>

        )
        : <p>No Expenses to show</p>
      }
    </div>
  )
}

export default ExpensesPage;