import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions 
import { logoutAction } from "./actions/logout";

// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { BudgetProvider } from "./actions/BudgetContext";
import Signup from "./components/Signup";
import TheDash, { thedashLoader } from "./components/TheDash";



const router = createBrowserRouter([
  {
    path: "/",
    element:  <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [  
      {
        index: true,
        element:  <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "theDash/expenses",
        element:  <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
      },
      {
        path: "signup",
        element:  <Signup />,
      },
      {
        path: "theDash",
        element:  <TheDash />,
        loader: thedashLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ]
  }
]);

function App() {
  return (
    <BudgetProvider> {/* Ensure the context provider is here */}
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </BudgetProvider>
  );
}

export default App;
