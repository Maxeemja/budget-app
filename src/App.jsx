import { Container, Stack, Button } from 'react-bootstrap';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpenseModal from './components/ViewExpenseModal';
import BudgetCard from './components/BudgetCard';
import { useState } from 'react';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetsContext';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
	const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
	const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
	const { budgets, expenses, getBudgetExpenses } = useBudgets();

	function openAddExpenseModal(budgetId) {
		setShowAddExpenseModal(true);
		setAddExpenseModalBudgetId(budgetId);
	}
	return (
		<>
			<Container className='my-4'>
				<Stack direction='horizontal' gap='2' className='mb-4'>
					<h1 className='me-auto'>Budgets</h1>
					<Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
						Add budget
					</Button>
					<Button variant='outline-primary' onClick={openAddExpenseModal}>
						Add expense
					</Button>
				</Stack>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
						gap: '1rem',
						alignItems: 'flex-start'
					}}
				>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						);
						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={amount}
								max={budget.max}
								onAddExpenseClick={() => openAddExpenseModal(budget.id)}
								onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
							/>
						);
					})}
					<UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
					<TotalBudgetCard />
				</div>
			</Container>
			<AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={addExpenseModalBudgetId}
				handleClose={() => setShowAddExpenseModal(false)}
			/>
			<ViewExpenseModal
				budgetId={viewExpenseModalBudgetId}
				handleClose={() => setViewExpenseModalBudgetId()}
			/>
		</>
	);
}

export default App;
