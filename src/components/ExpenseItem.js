import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helpers';

const ExpenseItem = ({ expense }) => {
    const fetcher = useFetcher();

    // Check if expense.budgetId is truthy before attempting to fetch the budget
    const budget = expense.budgetId ?
        getAllMatchingItems({
            category: "budgets",
            key: "id",
            value: expense.budgetId
        })[0] : null;

    return (
        <>
            <td>{expense.expensename}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocaleString(expense.createAt)}</td>
            <td>
                {budget ? (
                    <Link
                        to={`/budget/${budget.id}`}
                        style={{
                            "--accent": budget.color,
                        }}
                    >
                        {budget.name}
                    </Link>
                ) : (
                    "Unknown Budget"
                )}
            </td>
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button
                        type="submit"
                        className="btn btn--warning"
                        aria-label={`Delete ${expense.name} expense`}
                    >
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    );
};

export default ExpenseItem;
