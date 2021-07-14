import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../../utilities/context/AppProvider';
import ExpenseScreen from '../expenses/main/ExpenseScreen';
import ExpenseDetailScreen from '../expenses/detail/ExpenseDetailScreen';
import SplashScreen from '../auth/SplashScreen';

const Stack = createStackNavigator();
 
const AppScreens = () => {

    const { authState } = useContext(AppContext);

    if (authState.isLoading === true) {
		return <SplashScreen />;
	} 
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ExpenseScreen' 
                component={ExpenseScreen} 
            />
            <Stack.Screen 
                name='ExpenseDetailScreen' 
                component={ExpenseDetailScreen} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppScreens;