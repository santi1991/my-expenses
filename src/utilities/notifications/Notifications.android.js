import { Alert } from "react-native";

export const triggerBudgetNotification = async (updatedCategory) => {
    if (updatedCategory.alert === false || updatedCategory.budget === 0) {
        return false;
    }
    if (updatedCategory.alert === true && updatedCategory.value >= updatedCategory.budget) {
        Alert.alert(
            '¡CUIDADO! Estás gastando mucho!',
            `Has pasado tu presupuesto de ${updatedCategory.name.toUpperCase()}!`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );        	
        return false;
    }
    return true;
};