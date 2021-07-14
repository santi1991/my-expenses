import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, CombinedDefaultTheme, CombinedDarkTheme } from '../../utilities/commons/Styles';
import AppScreens from './AppScreens';

const AppContainer = () => {
    return (
        <PaperProvider theme={CombinedDefaultTheme}>
            <NavigationContainer theme={CombinedDefaultTheme}>
                <AppScreens />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default AppContainer;

