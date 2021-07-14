import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppContext } from '../../../utilities/context/AppProvider';
import ChartPie from './ChartPie';
import CategoryList from './CategoryList';
import AddExpense from '../shared/components/AddExpense';
import AddBudget from '../shared/components/AddBudget';


const ExpenseScreen = ({ navigation, route }) => {

    const { expensesGroup } = useContext(AppContext);

    const refCategory = useRef(null);

    const [addExpenseVisible, setAddExpenseVisible] = useState(false);
    const showAddExpense = (category) => {
        refCategory.current = category;
        setAddExpenseVisible(true);
    };
    const hideAddExpense = () => {
        refCategory.current = null;
        setAddExpenseVisible(false);
    };

    const [addBudgetVisible, setAddBudgetVisible] = useState(false);
    const showAddBudget = (category) => {
        refCategory.current = category;
        setAddBudgetVisible(true);
    };
    const hideAddBudget = () => {
        refCategory.current = null;
        setAddBudgetVisible(false);
    };

    const toEditExpenses = (category) => {
        if (category.value === 0) {
            return alert('Aún no tienes datos registrados');
        }
        else {
            return navigation.navigate('ExpenseDetailScreen', {
            	category: category,
            });
        }
    };

    return (
        <View style={styles.container}>

            <ChartPie
                {...expensesGroup}
                showAddExpense={showAddExpense}
            />

            <CategoryList
                {...expensesGroup}
                toEditExpenses={toEditExpenses}
                showAddExpense={showAddExpense}
                showAddBudget={showAddBudget}
            />

            <AddExpense
                visible={addExpenseVisible}
                onHideModal={hideAddExpense}
                selectedCategory={refCategory.current}
            />

            <AddBudget
                visible={addBudgetVisible}
                onHideModal={hideAddBudget}
                category={refCategory.current}
            // {...refCategory.current}
            />
        
        </View>
    );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

/*
<Button icon="camera" mode="contained" onPress={() => console.log(randomInteger(1, 500))}>
    Press me
</Button>
*/