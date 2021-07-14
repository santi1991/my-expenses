
import { triggerBudgetNotification } from '../notifications/Notifications';

export const authState = (state, action) => {
	const logInUser = () => {
		return { ...state, isLoading: false };
	};
	const logOutUser = () => {
		return { ...state, isLoading: false };
	};
	const offlineMode = () => {
		return { ...state, isLoading: false, isOffline: true };
	};
	switch (action.type) {
		case 'LOG_IN':
			return logInUser();
		case 'LOG_OUT':
			return logOutUser();
		case 'OFFLINE':
			return offlineMode();			
		default:
			return state;
	}
};

export const expensesGroup = (state, action) => {
	//-----   common helpers   -------------------------------------------------------
	const createPieData =  (categoryArray) => {
		return categoryArray.map((item, index) => ({ 
			value: item.value,
			svg: {
				name: item.name,
				fill: item.color,
				onPress: () => console.log('press', item.id),
			},
			key: `pie-${item.id}`,
		}));
	};		
	const updateCategoryExpenses = (updatedCategory) => {		
		const idx = state.categoryExpenses.findIndex(idx => idx.id === updatedCategory.id);
		const newCategoryExpenses = [...state.categoryExpenses];
		newCategoryExpenses.splice(idx, 1, updatedCategory);
		return newCategoryExpenses;
	};
	const updateExpenseClass = (operation, selectedClass, itemExpense) => {
		const itemIdx = selectedClass.findIndex(itemIdx => itemIdx.id === itemExpense.id);
		const updatedClass = [...selectedClass];
		if (operation === 'update') {
			updatedClass.splice(itemIdx, 1, itemExpense);
		}
		else if (operation === 'delete') {
			updatedClass.splice(itemIdx, 1);
		}
		return updatedClass;
	};
	//---------------------------------------------------------------------------------
	const putExpense = () => {
		const newExpense = action.payload;
		const newCtryExpenses = [...state.categoryExpenses];
		const ctryIdx = newCtryExpenses.findIndex(ctryIdx => ctryIdx.id === newExpense.category_id);
		const updatedCategory = { ...newCtryExpenses[ctryIdx], value: newCtryExpenses[ctryIdx].value + newExpense.value };				
		const isAlert = triggerBudgetNotification(updatedCategory);		
		if (isAlert === true) {
			updatedCategory.alert = true;
		}
		else {
			updatedCategory.alert = false;
		}		 
		newCtryExpenses.splice(ctryIdx, 1, updatedCategory);
		const commonUpdate = {
			...state,
			totalExpense: state.totalExpense + newExpense.value,
			categoryExpenses: newCtryExpenses,
			pieData: createPieData(newCtryExpenses)		
		};		
		const array = [newExpense];	
		switch (newExpense.category_id) {
			case 1:
				return { ...commonUpdate, housingExpenses: [...array, ...state.housingExpenses] };
			case 2:
				return { ...commonUpdate, transportExpenses: [...array, ...state.transportExpenses] };
			case 3:
				return { ...commonUpdate, billsExpenses: [...array, ...state.billsExpenses] };
			case 4:
				return { ...commonUpdate, personalExpenses: [...array, ...state.personalExpenses] };
			case 5:
				return { ...commonUpdate, foodExpenses: [...array, ...state.foodExpenses] };
			case 6:
				return { ...commonUpdate, creditExpenses: [...array, ...state.creditExpenses] };
			default:
				throw new Error('No hubo match en switch --> putExpense/Expenses reducer');
		}
	};
	const updateExpense = () => {
		const { oldExpenseValue, updatedExpense, selectedCategory, selectedClass } = action.payload;
		
		let newTotalExpense = state.totalExpense;
		let newTotalCategoryValue = selectedCategory.value;
		let difference = 0;				

		if (updatedExpense.value > oldExpenseValue) {
			difference = updatedExpense.value - oldExpenseValue;
			newTotalExpense = state.totalExpense + difference;
			newTotalCategoryValue = selectedCategory.value + difference;			
		}
		else if (updatedExpense.value < oldExpenseValue) {
			difference = oldExpenseValue - updatedExpense.value;
			newTotalExpense = state.totalExpense - difference;
			newTotalCategoryValue = selectedCategory.value - difference;
		}

		const updatedCategory = { ...selectedCategory, value: newTotalCategoryValue };
		const isAlert = triggerBudgetNotification(updatedCategory);
		if (isAlert === true) {
			updatedCategory.alert = true;
		}
		else {
			updatedCategory.alert = false;
		}
		const newCategoryExpenses = updateCategoryExpenses(updatedCategory);
		const updatedClass = updateExpenseClass('update', selectedClass, updatedExpense);

		const commonUpdate = {
			...state,
			totalExpense: newTotalExpense,
			categoryExpenses: newCategoryExpenses,
			pieData: createPieData(newCategoryExpenses)
		};
		switch (updatedExpense.category_id) {
			case 1:
				return { ...commonUpdate, housingExpenses: updatedClass };
			case 2:
				return { ...commonUpdate, transportExpenses: updatedClass };
			case 3:
				return { ...commonUpdate, billsExpenses: updatedClass };
			case 4:
				return { ...commonUpdate, personalExpenses: updatedClass };
			case 5:
				return { ...commonUpdate, foodExpenses: updatedClass };
			case 6:
				return { ...commonUpdate, creditExpenses: updatedClass };
			default:
				throw new Error('No hubo match en switch --> updateExpense /-ExpenseGroup reducer');
		}
	};	
	const deleteExpense = () => {
		const { deletedExpense, selectedCategory, selectedClass } = action.payload;

		const updatedCategory = { ...selectedCategory, value: selectedCategory.value - deletedExpense.value };

		const newCategoryExpenses = updateCategoryExpenses(updatedCategory);

		const updatedClass = updateExpenseClass('delete', selectedClass, deletedExpense);

		const commonUpdate = {
			...state,
			totalExpense: state.totalExpense - deletedExpense.value,
			categoryExpenses: newCategoryExpenses,
			pieData: createPieData(newCategoryExpenses)
		};
		switch (deletedExpense.category_id) {
			case 1:
				return { ...commonUpdate, housingExpenses: updatedClass };
			case 2:
				return { ...commonUpdate, transportExpenses: updatedClass };
			case 3:
				return { ...commonUpdate, billsExpenses: updatedClass };
			case 4:
				return { ...commonUpdate, personalExpenses: updatedClass };
			case 5:
				return { ...commonUpdate, foodExpenses: updatedClass };
			case 6:
				return { ...commonUpdate, creditExpenses: updatedClass };
			default:
				throw new Error('No hubo match en switch --> deleteExpense /-ExpenseGroup reducer');
		}
	};	
	const onInitialize = () => {		
		return { 
			...state, 
			...action.payload, 
			pieData: createPieData(action.payload.categoryExpenses) 
		};
	};
	switch (action.type) {
		case 'INITIALIZE':
			return onInitialize();		
		case 'PUT_EXPENSE':			
			return putExpense();
		case 'UPDATE_EXPENSE':
			return updateExpense();
		case 'DELETE_EXPENSE':
			return deleteExpense();
		case 'UPDATE_CATEGORY':
			return { ...state, categoryExpenses: updateCategoryExpenses(action.payload) };
		default:
			throw new Error('No match de Action en switch -> expensesGroupReducer');
	}
};