export const triggerBudgetNotification = async (updatedCategory) => {
	if (updatedCategory.alert === false || updatedCategory.budget === 0) {
		return false;
	}
	if (updatedCategory.alert === true && updatedCategory.value >= updatedCategory.budget) {		
		alert(`Estás gastando de más!\n
			Has pasado tu presupuesto de ${updatedCategory.name.toUpperCase()}!`
		);
		return false;
	}
	return true;
};
