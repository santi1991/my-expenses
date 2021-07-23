import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, CombinedDefaultTheme, CombinedDarkTheme, colors } from '../../utilities/commons/Styles';
import AppScreens from './AppScreens';

const AppContainer = () => {
    return (
        <PaperProvider theme={CombinedDefaultTheme}>
            <NavigationContainer theme={CombinedDefaultTheme}>
                <StatusBar barStyle='light-content' animated={true} backgroundColor={colors.primary} />
                <AppScreens />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default AppContainer;

