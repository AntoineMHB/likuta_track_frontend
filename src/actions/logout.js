//import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

// library



export async function logoutAction (redirect) {
    
    await deleteItem({ key: "userName"});  
          deleteItem({key: "budgets"})   
          deleteItem({key: "expenses"})  

    toast.success("You've deleted your account!");
    // Delay the redirect to give time for the toast to display
    await new Promise((resolve) => setTimeout(resolve, 2000));
    redirect ("/");
       
    
}