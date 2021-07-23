import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { selectConceptsList, selectExpenseClass, selectCategory } from '../shared/Utils';
import { AppContext } from '../../../utilities/context/AppProvider';
import ExpensesList from './ExpensesList';
import AddExpense from '../shared/components/AddExpense';
import ResumeProfile from './ResumeProfile';
import ExpensesFilter from './ExpensesFilter';
// import HeaderProfile from './HeaderProfile';
import HeaderBar from './HeaderBar';



const ExpenseDetailScreen = ({ navigation, route }) => {

	// console.log('render:  E X P E N S E   P R O F I L E');
	const { expensesGroup } = useContext(AppContext);

	const refFirstRender = useRef(true);
	const refConceptsList = useRef([]);
	const refExpense = useRef({}); // object or null

	// const initialState = {
	// 	category: route.params.category,
	// 	expenses: route.params.expenses,
	// 	filteredExpenses: route.params.expenses
	// };
	const initialState = {
		category: route.params.category, // decided to bring this with the params because its needed to render UI info the first time		
		expenses: [],
		filteredExpenses: []
	};
	const [expenseData, setExpenseData] = useState(initialState);

	const [addExpenseVisible, setAddExpenseVisible] = useState(false);
	const showAddExpense = (expense) => {
		refExpense.current = expense;
		setAddExpenseVisible(true);
	};
	const hideAddExpense = () => {
		refExpense.current = null;
		setAddExpenseVisible(false);
	};

	const [filterVisible, setFilterVisible] = useState(false);
	const showExpensesFilter = () => { return setFilterVisible(true); };
	const hideExpensesFilter = () => { return setFilterVisible(false); };


	const searchDescriptionFilter = (filteredArray) => {
		setExpenseData({ ...expenseData, filteredExpenses: filteredArray });
	};

	const applyFilterOptions = (filteredArray) => {
		setExpenseData({ ...expenseData, filteredExpenses: filteredArray });
		hideExpensesFilter();
	};

	const eraseFilterOptions = () => {
		setExpenseData({ ...expenseData, filteredExpenses: expenseData.expenses });
		hideExpensesFilter();
	};

	useEffect(() => {
		if (route.params?.category) {
			refConceptsList.current = selectConceptsList(route.params.category.id);
			const currentExpenseClass = selectExpenseClass(route.params.category.id, expensesGroup);
			//const currentCategory = selectCategory(route.params.category.id, expensesGroup.categoryExpenses);
			setExpenseData({
				...expenseData,
				//category: currentCategory, 
				expenses: currentExpenseClass,
				filteredExpenses: currentExpenseClass
			});
		}
	}, [route.params?.category]);

	useEffect(() => {
		if (refFirstRender.current === true) {
			refFirstRender.current = false;
			return;
		}
		const currentCategory = selectCategory(route.params.category.id, expensesGroup.categoryExpenses);
		const currentExpenseClass = selectExpenseClass(route.params.category.id, expensesGroup);
		setExpenseData({
			...expenseData,
			category: currentCategory,
			expenses: currentExpenseClass,
			filteredExpenses: currentExpenseClass
		});
	}, [expensesGroup]);

	return (
		<SafeAreaView style={localStyles.container}>

			<StatusBar barStyle='light-content' backgroundColor={expenseData.category.color} animated={true} />

			{/* <HeaderProfile
				color={expenseData.category.color}
				navigation={navigation}
				masterDataSource={expenseData.expenses}
				filterFunction={searchDescriptionFilter}
				showFilter={showExpensesFilter}
			/> */}

			<HeaderBar 
				color={expenseData.category.color}
				navigation={navigation}
				masterDataSource={expenseData.expenses}
				filterFunction={searchDescriptionFilter}
				showFilter={showExpensesFilter}
			/>

			<ResumeProfile
				totalExpense={expensesGroup.totalExpense}
				currentPeriod={expensesGroup.currentPeriod}
				category={expenseData.category}
				expenses={expenseData.expenses}
			/>

			<ExpensesList
				list={expenseData.filteredExpenses}
				onClickItem={showAddExpense}
				color={expenseData.category.color}
			/>

			{/* THIS WAY THE STATE IS CLEANED WHEN THE MODAL IS CLOSED - NO NEED TO CLEAN THE STATE (rendered conditionally) */}

			<AddExpense
				visible={addExpenseVisible}
				expenseInfo={refExpense.current}
				selectedCategory={expenseData.category}
				selectedClass={expenseData.expenses}
				onHideModal={hideAddExpense}
			/>


			{/* THIS WAY THE STATE IS NOT CLEANED WHEN THE MODAL IS CLOSED */}
			<ExpensesFilter
				visible={filterVisible}
				onFilter={applyFilterOptions}
				onClean={eraseFilterOptions}
				onHideModal={hideExpensesFilter}
				masterDataSource={expenseData.expenses}
				conceptsList={refConceptsList.current}
			/>

		</SafeAreaView>
	);
};

export default ExpenseDetailScreen;

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
});

