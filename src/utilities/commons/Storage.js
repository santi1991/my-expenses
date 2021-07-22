import AsyncStorage from '@react-native-async-storage/async-storage';


export const getInternalStorage = async () => {
    try {
        const keys = ['userExpenses', 'userBudgets'];
        const values = await AsyncStorage.multiGet(keys);
        console.log(values);
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
}

export const getStorageValue = async (key) => {
    // key must be a string
    let jsonValue;
    try {
        jsonValue = await AsyncStorage.getItem(key);
        console.log('jsonValue es: ')
        console.log(jsonValue)
        if (jsonValue === null) {
            jsonValue = [];
        } else {
            jsonValue = JSON.parse(jsonValue);
        }
        return jsonValue;
        // return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (error) {
        // read error
        throw error;
    }

}


export const removeAllStorage = async () => {
    const keys = ['userExpenses', 'userBudgets'];
    try {
        await AsyncStorage.multiRemove(keys)
        console.log('all storage removed');
    } catch (e) {
        // remove error
        throw e;
    }

}



