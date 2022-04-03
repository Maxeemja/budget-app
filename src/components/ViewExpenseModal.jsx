import { Form, Modal, Button, Stack } from 'react-bootstrap';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';
export default function ViewExpenseModal({ handleClose, budgetId }) {
	const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
	const expenses = getBudgetExpenses(budgetId);
	console.log(expenses);
	const budget =
		UNCATEGORIZED_BUDGET_ID === budgetId
			? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
			: budgets.find((b) => b.id === budgetId);
	return (
		<Modal show={budgetId != null} onHide={handleClose}>
			<Modal.Header closeButton>
				<Stack direction='horizontal' gap='2'>
					<div>Expenses - {budget?.name}</div>
					{budgetId !== UNCATEGORIZED_BUDGET_ID && (
						<Button
							variant='outline-danger'
							onClick={() => {
								deleteBudget(budget), handleClose();
							}}
						>
							Delete
						</Button>
					)}
				</Stack>
			</Modal.Header>
			<Modal.Body>
				<Stack direction='vertical' gap='3'>
					{expenses.map((e) => (
						<Stack key={e.id} direction='horizontal' gap='2'>
							<div className='me-auto fs-4'>{e.description}</div>
							<div className='fs-5'>{currencyFormatter.format(e.amount)}</div>
							<Button onClick={() => deleteExpense(e)} size='sm' variant='outline-danger'>
								&times;
							</Button>
						</Stack>
					))}
				</Stack>
			</Modal.Body>
		</Modal>
	);
}
