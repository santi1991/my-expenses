import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const DetailScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22 }} >This is going to be the DETAILS SCREEN!!</Text>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                Coming Soon...
            </Button>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});