import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseScreen from '../expenses/main/ExpenseScreen';
import DetailScreen from '../expenses/detail/DetailScreen';

const Stack = createStackNavigator();

const AppScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ExpenseScreen' component={ExpenseScreen} />
            <Stack.Screen name='DetailScreen' component={DetailScreen} />
        </Stack.Navigator>
    );
};

export default AppScreens;