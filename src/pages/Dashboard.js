import React from 'react';

//react-route-dom imports
import { Link, useLoaderData } from 'react-router-dom';
//helper functions


// components
import Intro from '../components/Intro';
 
//library imports
import { toast } from 'react-toastify';

// components
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import AddFinancialGoalForm from '../components/AddFinancialGoalForm';
import AddIncomesForm from '../components/AddIncomesForm';
import BudgetItem from '../components/Budgetitem';
import Table from '../components/Table';
import Error from './Error';

// helper functions
import { createBudget, createExpense, createFinancialGoal, createIncome, deleteItem, fetchData, waait } from '../helpers';

// loader
export function dashboardLoader()
{
   const userName = fetchData("userName");
   const budgets = fetchData("budgets");
   const expenses = fetchData("expenses");

   return { userName, budgets, expenses }
}; 

// action
export async function dashboardAction({request}){
  await waait();
 
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)
 
  // new user submission
  if (_action === "newUser")
    {
      try {
    
    //console.log(" ~ dashboardAction ~ formData", formData)
    localStorage.setItem("userName", JSON.stringify(values.userName))
    
    return toast.success(`Welcome, ${values.userName}`)
    
  } catch(e){
    
    throw new Error("There was a problem creating your account")
  }

    }
  if (_action === "createBudget"){
    try{
      // create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,  
      })
      return toast.success("Budget created!")

    } catch(e){
      throw new Error("There was a problem creating your budget.")

    }
  }

  if (_action === "createExpense"){
    try{
      // create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget

      })
      return toast.success(`Expense ${values.newExpense} created!`)

    } catch(e){
      throw new Error("There was a problem creating your expense.")

    }
  }

  // delete expense
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

  if (_action === "createIncome"){
    try{
      // create income
      createIncome({
        name: values.newIncome,
        amount: values.newIncomeAmount,  
      })
      return toast.success(`Income ${values.newIncome} recorded!`)

    } catch(e){
      throw new Error("There was a problem recording your income.")

    }
  }

  if (_action === "createFinancialGoal"){
    try{
      // create financial goal
      createFinancialGoal({
        name: values.newFinancialGoal,
        currentAmount: values.currentFinancialGoalAmount, 
        targetAmount: values.targetAmount,
        notes: values.newNotes,

      })
      return toast.success(`FinancialGoal ${values.newFinancialGoal} recorded!`)

    } catch(e){
      throw new Error("There was a problem recording your financial goal.")

    }
  }
  }

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()
  
 return (
    <>
      
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">
            {userName}</span></h1>
              <div className="grid-sm">
              {
                budgets && budgets.length > 0
                ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm 
                    />
                    <AddExpenseForm budgets=
                      {budgets}
                    />
                    <AddIncomesForm 
                    />
                    <AddFinancialGoalForm 
                    />
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {
                      budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                      ))
                    }
                  </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}/>
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
                )
                : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the path to financial freedom.</p>
                    <p>Create a budget to get 
                    started!</p>
                    <AddBudgetForm />
                  </div>
                )
              }
            </div>
        
        </div>
      ) : <Intro />}
       
    </>
  )
}

export default Dashboard;