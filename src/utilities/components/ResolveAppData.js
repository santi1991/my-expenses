import React, { useContext, useEffect } from 'react'; 
import { Modal, Portal, Text, Provider, ActivityIndicator } from 'react-native-paper';
import { AppContext } from '../context/AppProvider';
import { expense_categories, expense_concepts } from '../../views/expenses/shared/Data';

import { structureExpenseConcepts, structureUserExpenses } from '../../views/expenses/shared/Utils';
import { firstAndLastDayCurrentMonth } from '../../utilities/commons/Utils';


const userExpenses = [
    {
        id: 1,
        category_id: 1,
        concept_id: 1,
        value: 1100000,
        description: 'pago alquiler apto',
        date: 1626215119,
        category_name: 'Alojamiento', // join made in the query
        concept_name: 'Arriendo' // join made in the query
    },
    {
        id: 2,
        category_id: 1,
        concept_id: 1,
        value: 500000,
        description: 'pago alquiler airbnb',
        date: 1626215119,
        category_name: 'Alojamiento', // join made in the query
        concept_name: 'Arriendo' // join made in the query
    },
];
const userBudgets = []; //id category_id  budgets

// visible, splashScreen, loadScreen, onHide
const ResolveAppData = ({ visible, onHide }) => {

    const { setAuthState, setExpensesGroup } = useContext(AppContext);

	const containerStyle = { backgroundColor: 'white', padding: 20, height: '100%' };

	useEffect(() => {
        const { firstDay, lastDay } = firstAndLastDayCurrentMonth();
        // const expenseStaticData = structureExpenseConcepts(expense_categories, expense_concepts);
        const expensesGroup = structureUserExpenses(expense_categories, userExpenses, userBudgets);
        expensesGroup.currentPeriod = { firstDay: firstDay, lastDay: lastDay };

        setTimeout(() => {            
            setExpensesGroup({ type: 'INITIALIZE', payload: expensesGroup });
            setAuthState({ type: 'LOG_IN' })
        }, 1500);

	}, []);

	return (
		<Provider>
			<Portal>
				<Modal
					visible={visible}
					dismissable={false}
					onDismiss={onHide}
					contentContainerStyle={containerStyle}
					style={{ marginTop: 0 }}
				>
					<ActivityIndicator animating={true} color='red' size='large' />
					<Text style={{ textAlign: 'center', margin:5 }} >Estamos organizando tus datos...</Text>
				</Modal>
			</Portal>
		</Provider>
	);
};

export default ResolveAppData;