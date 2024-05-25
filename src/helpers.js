export const waait = () => new Promise(res => setTimeout(
    res, Math.random() * 2000))

// Function to generate a random color
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 65; // Percentage
  const lightness = 50; // Percentage
  return `${hue} ${saturation}% ${lightness}%`;
};

//Local storage
export const fetchData = (key, dataType = 'json') => {
    const data = localStorage.getItem(key);
    if(data){
        switch (dataType) {
            case 'json':
                return JSON.parse(data);
             case 'string':
                return data;
             case 'number':
                return parseFloat(data);
            case 'boolean':
                return data === 'true';
            default:
                return data;           
        }
    }
    return null;
}; 

// Get all items from local storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
};

// delete item from local storage
export const deleteItem = ({ key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

//create budget
// export const createBudget = ({
//     name, amount
// }) =>{
//     const newItem = {
//         id: crypto.randomUUID(),
//         name: name,
//         createAt: Date.now(),
//         amount: +amount,
//         color: generateRandomColor()
//     }
//     const existingBudgets = fetchData("budgets") ?? [];
//     return localStorage.setItem("budgets",
//         JSON.stringify([...existingBudgets, newItem])
//     )
// };

export const createBudget = async ({ budgetname, amount }) => {
    try {
        const response = await fetch('/budgets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ budgetname, amount })
        });
        if (!response.ok) {
            throw new Error('Failed to create budget');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating budget:', error);
        throw error;
    }
};

// create expense
export const createExpense = ({
    name, amount, budgetId
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",
        JSON.stringify([...existingExpenses, newItem])
    )
}

//create income
export const createIncome = ({
    name, amount
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingIncomes = fetchData("incomes") ?? [];
    return localStorage.setItem("incomes",
        JSON.stringify([...existingIncomes, newItem])
    )
}

// create financial goal
export const createFinancialGoal = ({
    name, amount
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingFinancialGoal = fetchData("financialGoals") ?? [];
    return localStorage.setItem("financialGoals",
        JSON.stringify([...existingFinancialGoal, newItem])
    )
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // check if expense.id === budgetId I passed in
        if (expense.budgetId !== budgetId) return acc

        // add the current amount to my total
        return acc += expense.amount
    }, 0)
    return budgetSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// Formatting percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
};

// Format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
};