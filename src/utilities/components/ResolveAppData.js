import React, { useContext, useEffect } from 'react';
import { Modal, Portal, Text, Provider, ActivityIndicator } from 'react-native-paper';
import { AppContext } from '../context/AppProvider';

import { getInternalStorage } from '../commons/Storage';

import { expense_categories, expense_concepts } from '../../views/expenses/shared/Data';

import { structureExpenseConcepts, structureUserExpenses } from '../../views/expenses/shared/Utils';
import { firstAndLastDayCurrentMonth } from '../../utilities/commons/Utils';


// const userExpenses = [
//     {
//         id: 1,
//         category_id: 1,
//         concept_id: 1,
//         value: 1100000,
//         description: 'pago alquiler apto',
//         date: 1626215119,
//         category_name: 'Alojamiento', // join made in the query
//         concept_name: 'Arriendo' // join made in the query
//     },
//     {
//         id: 2,
//         category_id: 1,
//         concept_id: 1,
//         value: 500000,
//         description: 'pago alquiler airbnb',
//         date: 1626215119,
//         category_name: 'Alojamiento', // join made in the query
//         concept_name: 'Servicio Público' // join made in the query
//     },
//     {
//         id: 3,
//         category_id: 2,
//         concept_id: 7,
//         value: 1000000,
//         description: 'pago uber',
//         date: 1626215119,
//         category_name: 'Transporte', // join made in the query
//         concept_name: 'Servicio Público' // join made in the query
//     },
//     {
//         id: 4,
//         category_id: 3,
//         concept_id: 14,
//         value: 1000000,
//         description: 'pago agua',
//         date: 1626215119,
//         category_name: 'Facturas', // join made in the query
//         concept_name: 'Agua' // join made in the query
//     },
//     // {
//     //     id: 5,
//     //     category_id: 4,
//     //     concept_id: 20,
//     //     value: 1000000,
//     //     description: 'pago cine',
//     //     date: 1626215119,
//     //     category_name: 'Gastos Personales', // join made in the query
//     //     concept_name: 'Entretenimiento' // join made in the query
//     // },
//     // {
//     //     id: 6,
//     //     category_id: 5,
//     //     concept_id: 27,
//     //     value: 1000000,
//     //     description: 'pago mercado',
//     //     date: 1626215119,
//     //     category_name: 'Comida', // join made in the query
//     //     concept_name: 'Mercado' // join made in the query
//     // },
//     // {
//     //     id: 7,
//     //     category_id: 6,
//     //     concept_id: 31,
//     //     value: 1000000,
//     //     description: 'pago estudio',
//     //     date: 1626215119,
//     //     category_name: 'Créditos', // join made in the query
//     //     concept_name: 'Estudio' // join made in the query
//     // },
// ];
// const userBudgets = [
//     {
//         id: 1,
//         category_id: 1,
//         budget: 2000000
//     }
// ]; //id category_id  budgets

// visible, splashScreen, loadScreen, onHide
const ResolveAppData = ({ visible, onHide }) => {

    const { setAuthState, setExpensesGroup } = useContext(AppContext);

    const containerStyle = { backgroundColor: 'white', padding: 20, height: '100%' };

    const getUserData = async () => {
        const { userExpenses, userBudgets } = await getInternalStorage();
        return { userExpenses, userBudgets };
    };

    useEffect(() => {
        const { firstDay, lastDay } = firstAndLastDayCurrentMonth();
        // const expenseStaticData = structureExpenseConcepts(expense_categories, expense_concepts);

        getUserData()
            .then(response => {
                console.log(response.userExpenses);
                const expensesGroup = structureUserExpenses(expense_categories, response.userExpenses, response.userBudgets);
                expensesGroup.currentPeriod = { firstDay: firstDay, lastDay: lastDay };

                setTimeout(() => {
                    setExpensesGroup({ type: 'INITIALIZE', payload: expensesGroup });
                    setAuthState({ type: 'LOG_IN' });
                }, 1000);
            })

        // const expensesGroup = structureUserExpenses(expense_categories, userExpenses, userBudgets);
        // expensesGroup.currentPeriod = { firstDay: firstDay, lastDay: lastDay };

        // setTimeout(() => {
        //     setExpensesGroup({ type: 'INITIALIZE', payload: expensesGroup });
        //     setAuthState({ type: 'LOG_IN' });
        // }, 1000);

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
                    <Text style={{ textAlign: 'center', margin: 5 }} >Estamos organizando tus datos...</Text>
                </Modal>
            </Portal>
        </Provider>
    );
};

export default ResolveAppData;