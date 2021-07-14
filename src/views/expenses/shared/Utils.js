import * as c from './Data';

export const structureExpenseConcepts = (expenseCategories, expenseConcepts) => {
	// const expenseConcepts = data.expenseConcepts;
	// const expenseCategories = data.expenseCategories;
	const housingConcepts = []; const transportConcepts = []; const billsConcepts = [];
	const personalConcepts = []; const foodConcepts = []; const creditConcepts = [];
	for (let i = 0; i < expenseConcepts.length; i++) {
		switch (expenseConcepts[i].category_id) {
			case 1:
				housingConcepts.push(expenseConcepts[i]); break;
			case 2:
				transportConcepts.push(expenseConcepts[i]); break;
			case 3:
				billsConcepts.push(expenseConcepts[i]); break;
			case 4:
				personalConcepts.push(expenseConcepts[i]); break;
			case 5:
				foodConcepts.push(expenseConcepts[i]); break;
			case 6:
				creditConcepts.push(expenseConcepts[i]); break;
			default:
				throw new Error('No match en switch -> structure Expense Concepts');
		}
	}
	return {
		expenseCategories: expenseCategories,
		housingConcepts: housingConcepts,
		transportConcepts: transportConcepts,
		billsConcepts: billsConcepts,
		personalConcepts: personalConcepts,
		foodConcepts: foodConcepts,
		creditConcepts: creditConcepts
	};
};

export const structureUserExpenses = (expenseCategories, userExpenses, userBudgets) => {

	const newExpCategories = [...expenseCategories];

	let housingValue = 0; let transportValue = 0; let billsValue = 0;
	let personalValue = 0; let foodValue = 0; let creditValue = 0;

	const housingExpenses = []; const transportExpenses = []; const billsExpenses = [];
	const personalExpenses = []; const foodExpenses = []; const creditExpenses = [];
	let totalExpense = 0;

	for (let i = 0; i < userExpenses.length; i++) {
		totalExpense += userExpenses[i].value;
		switch (userExpenses[i].category_id) {
			case 1:
				housingExpenses.push(userExpenses[i]);
				housingValue = housingValue += userExpenses[i].value;
				break;
			case 2:
				transportExpenses.push(userExpenses[i]);
				transportValue = transportValue += userExpenses[i].value;
				break;
			case 3:
				billsExpenses.push(userExpenses[i]);
				billsValue = billsValue += userExpenses[i].value;
				break;
			case 4:
				personalExpenses.push(userExpenses[i]);
				personalValue = personalValue += userExpenses[i].value;
				break;
			case 5:
				foodExpenses.push(userExpenses[i]);
				foodValue = foodValue += userExpenses[i].value;
				break;
			case 6:
				creditExpenses.push(userExpenses[i]);
				creditValue = creditValue += userExpenses[i].value;
				break;
			default:
				throw new Error('ERROR: No hubo coincidendia armando  -> switch userExpenses: structureUserExpenses');
		}
	}

	for (let k = 0; k < newExpCategories.length; k++) {
		switch (newExpCategories[k].id) {
			case 1:
				newExpCategories[k].value = housingValue; break;
			case 2:
				newExpCategories[k].value = transportValue; break;
			case 3:
				newExpCategories[k].value = billsValue; break;
			case 4:
				newExpCategories[k].value = personalValue; break;
			case 5:
				newExpCategories[k].value = foodValue; break;
			case 6:
				newExpCategories[k].value = creditValue; break;
			default:
				throw new Error('No match for each category Value');
		}
		newExpCategories[k].budget = 0;
		newExpCategories[k].budget_id = null;
		newExpCategories[k].alert = false;
		const budgetFound = userBudgets.find(budgetFound => budgetFound.category_id === newExpCategories[k].id);
		if (budgetFound) {
			newExpCategories[k].budget = budgetFound.budget;
			newExpCategories[k].budget_id = budgetFound.id;
			newExpCategories[k].alert = Boolean(newExpCategories[k].budget > newExpCategories[k].value) || false;
		}
	}

	return {
		totalExpense: totalExpense,
		categoryExpenses: newExpCategories,
		housingExpenses: housingExpenses,
		transportExpenses: transportExpenses,
		billsExpenses: billsExpenses,
		personalExpenses: personalExpenses,
		foodExpenses: foodExpenses,
		creditExpenses: creditExpenses,
	};
};

// const convertArrayToObject = (array) => {
// 	const obj = array.reduce((accumulator, currentValue, index) => {
// 		accumulator[index+1] = currentValue;
// 		return accumulator;
// 	}, {});
// 	return obj;
// 	// console.log(obj);
// 	// console.log(obj[1]);
// };

export const selectConceptsList = (categoryId) => {
	let conceptsList;
	switch (categoryId) {
		case 1:
			conceptsList = c.housingConcepts; break;
		case 2:
			conceptsList = c.transportConcepts; break;
		case 3:
			conceptsList = c.billsConcepts; break;
		case 4:
			conceptsList = c.personalConcepts; break;
		case 5:
			conceptsList = c.foodConcepts; break;
		case 6:
			conceptsList = c.creditConcepts; break;
		default:
			conceptsList = [];
			console.log('ERROR: no match en switch para definir conceptsList / Utils');
		//throw new Error('ERROR: no match en switch para definir conceptsList / Utils');
	}
	return conceptsList;
};

export const selectExpenseClass = (categoryId, expensesGroup) => {
	let expenseClass;
	switch (categoryId) {
		case 1:
			expenseClass = expensesGroup.housingExpenses; break;
		case 2:
			expenseClass = expensesGroup.transportExpenses; break;
		case 3:
			expenseClass = expensesGroup.billsExpenses; break;
		case 4:
			expenseClass = expensesGroup.personalExpenses; break;
		case 5:
			expenseClass = expensesGroup.foodExpenses; break;
		case 6:
			expenseClass = expensesGroup.creditExpenses; break;
		default:
			throw new Error('Error: no hubo match: Utils / selectExpenseClass');
	}
	return expenseClass;
};

export const selectCategory = (categoryId, categoryExpenses) => {
	const currentCategory = categoryExpenses.find(currentCategory => currentCategory.id === categoryId);
	if (currentCategory) {
		return currentCategory;
	}
	else {
		throw new Error('currentCategory not found! -> no match with categoryId: Utils / selectCategory');
	}
};

export const filterExpenses = (masterDataExpenses, filtersArray) => {
	if (filtersArray.length === 0) {
		return masterDataExpenses;
	}

	const byConcepts = (filterObject, currentData) => {
		// console.log('--- running byConcepts');
		return currentData.filter((item) => {
			const itemData = item.concept_id;
			const filterData = filterObject.filter;
			return itemData === filterData;
		});
	};
	const byDateRange = (filterObject, currentData) => {
		// console.log('--- running byDateRange');
		return currentData.filter((item) => {
			const itemData = item.date;
			const firstDateFilter = filterObject.filter[0];
			const lastDateFilter = filterObject.filter[1];
			return itemData > firstDateFilter && itemData < lastDateFilter;
		});
	};
	const byDateOrder = (filterObject, currentData) => {
		// console.log('--- running byDateOrder');
		if (filterObject.filter === 'newest') {
			return currentData.sort((a, b) => {
				return b.date - a.date;
			});
		}
		return currentData.sort((a, b) => {
			return a.date - b.date;
		});
	};
	const byValueRange = (filterObject, currentData) => {
		const firstValue = filterObject.filter[0];
		const lastValue = filterObject.filter[1];
		// console.log('--- running byValueRange');
		if (firstValue >= lastValue) {
			console.log('rango de valores no valido, retornando data sin este filtro');
			// return currentData;
			return [];
		}
		return currentData.filter((item) => {
			const itemData = item.value;
			return itemData >= firstValue && itemData <= lastValue;
		});
	};
	const byValueOrder = (filterObject, currentData) => {
		// console.log('--- running byValueOrder');
		if (filterObject.filter === 'highest') {
			return currentData.sort((a, b) => {
				return b.value - a.value;
			});
		}
		return currentData.sort((a, b) => {
			return a.value - b.value;
		});
	};

	const blankArray = [];
	const copyMasterData = [...masterDataExpenses];

	let filteredData = blankArray.concat(copyMasterData);

	for (let i = 0; i < filtersArray.length; i++) {
		const optionFilter = filtersArray.find(optionFilter => optionFilter.id === filtersArray[i].id);
		switch (optionFilter.id) {
			case 1:
				filteredData = byConcepts(filtersArray[i], filteredData);
				break;
			case 2:
				filteredData = byDateRange(filtersArray[i], filteredData);
				break;
			case 3:
				filteredData = byDateOrder(filtersArray[i], filteredData);
				break;
			case 4:
				filteredData = byValueRange(filtersArray[i], filteredData);
				break;
			case 5:
				filteredData = byValueOrder(filtersArray[i], filteredData);
				break;
			default:
				filteredData = masterDataExpenses;
		}
	}
	return filteredData;
};