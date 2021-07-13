import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, CombinedDefaultTheme, CombinedDarkTheme } from '../../utilities/styles/Styles';
import AppScreens from './AppScreens';

const AppContainer = () => {
    return (
        <PaperProvider theme={CombinedDarkTheme}>
            <NavigationContainer theme={CombinedDarkTheme}>
                <AppScreens />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default AppContainer;

