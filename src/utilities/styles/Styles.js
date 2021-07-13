import { StyleSheet, Platform } from 'react-native';

import {    
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';


const colors = {
    primary: '#263238',
    secondary: '#ff3d00',
    tertiary: '#01579B',
    auxiliary: '#546E7A'
};

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
    },
};

const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
};

export { PaperProvider, CombinedDefaultTheme, CombinedDarkTheme }


