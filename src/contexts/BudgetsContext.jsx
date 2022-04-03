import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export function useBudgets() {
	return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage('budgets', []);
	const [expenses, setExpenses] = useLocalStorage('expenses', []);
	
	function getBudgetExpenses(budgetId) {
		return expenses.filter((expense) => expense.budgetId === budgetId);
	}

	function addExpense({ description, amount, budgetId }) {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
		});
	}

	function addBudget({ name, max }) {
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets;
			}
			return [...prevBudgets, { id: uuidV4(), name, max }];
		});
	}

	function deleteExpense({ id }) {
		// TODO: deal with expenses
		setExpenses((prevBudgets) => {
			return prevBudgets.filter((budget) => budget.id !== id);
		});
	}
	function deleteBudget({ id }) {
		setExpenses((prevExpenses) => {
			return prevExpenses.map(e => {
				if(e.budgetId !== id) return e;
				return {...e, budgetId: UNCATEGORIZED_BUDGET_ID}
			})
		})
		setBudgets((prevExpenses) => {
			return prevExpenses.filter((expense) => expense.id !== id);
		});
	}

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteBudget,
				deleteExpense
			}}
		>
			{children}
		</BudgetsContext.Provider>
	);
};