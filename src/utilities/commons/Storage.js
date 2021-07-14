import AsyncStorage from '@react-native-async-storage/async-storage';

setStorageObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    }
    catch (e) {
        // save error
        throw e;
    }
};

getStorageObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null
    }
    catch (e) {
        // read error
        throw e;
    }
};

getMultiple = async () => {

    let values
    try {
        values = await AsyncStorage.multiGet(['@MyApp_user', '@MyApp_key'])
    } catch (e) {
        // read error
    }
    console.log(values)

    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}

