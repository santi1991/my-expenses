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
	secondary: 'blue',
    // secondary: '#ff3d00',
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	}, 
	dividerContainer: {
		height: 1.5,
		marginBottom: 3,
		marginTop: 3
	},
	
	//--------------------------------------------------------------
	//--------------   D I A L O G   S T Y L E   -------------------
	subheading: {
		fontWeight: 'bold'
	},
	input: {
		width: 170,
		height: 34,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: 'grey',
		paddingBottom: 0,
		paddingTop: 0,
		paddingLeft: 8,
		marginTop: 2,
		fontSize: 17,
		backgroundColor: 'white',
		letterSpacing: 0.6
	},
	//--------------------------------------------------------------
	//--------------   M O D A L   S T Y L E   -------------------
	modalContainer: {
		backgroundColor: '#FAFAFA',
		padding: 12,
		borderRadius: 16,
		marginLeft: Platform.OS === 'web' ? '36.6%' : 10,
		marginRight: Platform.OS === 'web' ? '36.6%' : 10,
		// ...Platform.select({
		// 	android: {
		// 		marginBottom: '50%'
		// 	}
		// })
	},
	modalPairContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
		marginTop: 4,
	},
	labelContainer: {
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 160,
		borderRightWidth: 0,
		borderColor: 'grey',
		borderRadius: 3,
		backgroundColor: 'white',
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0
	}
});

export { PaperProvider, CombinedDefaultTheme, CombinedDarkTheme, styles, colors }


