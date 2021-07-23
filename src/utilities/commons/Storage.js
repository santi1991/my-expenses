import AsyncStorage from '@react-native-async-storage/async-storage';


export const getInternalStorage = async () => {
    try {
        const keys = ['userExpenses', 'userBudgets'];
        const values = await AsyncStorage.multiGet(keys);
        return {
            userExpenses: JSON.parse(values[0][1]) === null ? [] : JSON.parse(values[0][1]),
            userBudgets: JSON.parse(values[1][1]) === null ? [] : JSON.parse(values[1][1]),
        };
    }
    catch (error) {
        // handleStorageError('getInternalStorage', error);
        throw error;
    }
};

export const setStorageValue = async (key, value) => {
    // key must be a string
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // save error
        throw error;
    }
};

export const getStorageValue = async (key) => {
    // key must be a string
    let jsonValue;
    try {
        jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue === null) {
            jsonValue = [];
        } else {
            jsonValue = JSON.parse(jsonValue);
        }
        return jsonValue;
        // return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (error) {
        throw error;
    }
};

export const removeAllStorage = async () => {
    const keys = ['userExpenses', 'userBudgets', 'storageMonth'];
    try {
        await AsyncStorage.multiRemove(keys)
        console.log('all storage removed');
    } catch (error) {
        throw error;
    }
};

export const checkStorageDate = async (currentMonth) => {
    // console.log(`current month: ${currentMonth}`);
    try {
        let storageMonth = await AsyncStorage.getItem('storageMonth');
        if (storageMonth === null) {
            // console.log('prevMonth not found on storage -> saving it');
            return await AsyncStorage.setItem('storageMonth', currentMonth.toString());
        } else {
            // console.log(`prevMonth found: ${Number(storageMonth)}`);
            if (currentMonth > Number(storageMonth)) {
                // console.log('prevMonth expired');
                await removeAllStorage();
                return await AsyncStorage.setItem('storageMonth', currentMonth.toString());
            }
        }
    } catch (error) {
        throw error;
    }
};

export const updateExpenseStorage = async (action, expense) => {
    let itemIdx;
    const currentExpensesList = await getStorageValue('userExpenses');
    switch (action) {
        case 'PUT':
            currentExpensesList.push(expense);
            break;
        case 'UPDATE':
            itemIdx = currentExpensesList.findIndex(itemIdx => itemIdx.id === expense.id);
            currentExpensesList.splice(itemIdx, 1, expense);
            break;
        case 'DELETE':
            itemIdx = currentExpensesList.findIndex(itemIdx => itemIdx.id === expense.id);
            currentExpensesList.splice(itemIdx, 1);
            break;
        default:
            throw new Error('No action Match en updateExpenseStorage function');
    }
    await setStorageValue('userExpenses', currentExpensesList);
};

export const updateBudgetStorage = async (action, budget) => {
    let itemIdx;
    const currentBudgetsList = await getStorageValue('userBudgets');
    switch (action) {
        case 'PUT':
            currentBudgetsList.push(budget);
            break;
        case 'UPDATE':
            itemIdx = currentBudgetsList.findIndex(itemIdx => itemIdx.id === budget.id);
            currentBudgetsList.splice(itemIdx, 1, budget);
            break;
        default:
            throw new Error('No action Match en updateBudgetStorage function');
    }
    await setStorageValue('userBudgets', currentBudgetsList);
};



