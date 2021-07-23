import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../../../utilities/context/AppProvider';
import ChartPie from './ChartPie';
import CategoryList from './CategoryList';
import HeaderBar from './HeaderBar';
import AddExpense from '../shared/components/AddExpense';
import AddBudget from '../shared/components/AddBudget';
import AboutMe from '../../../utilities/components/AboutMe';

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

    const [aboutVisible, setAboutVisible] = useState(false);
	const showAboutMe = () => setAboutVisible(true);
	const hideAboutMe = () => setAboutVisible(false);

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

            <HeaderBar
				showAddExpense={showAddExpense}
                showAboutMe={showAboutMe}
			/>

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
            {
				aboutVisible &&
                    <AboutMe
                        visible={aboutVisible}
                        onDismiss={hideAboutMe}
                    />
			}
        
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