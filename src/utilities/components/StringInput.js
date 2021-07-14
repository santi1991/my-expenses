import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

// onChangeText - required
const StringInput = ({ value = '', onChangeText, placeholder = '', keyboardType = 'default', maxLength = 40, editable = true, inputStyle }) => {
	// console.log('render:  S T R I N G  I N P U T');
	//const [string, setString] = useState(value);

	return (
		<View style={localStyles.container}>
			<TextInput
				editable={editable}
				autoCorrect={false}
				autoCompleteType='off'
				underlineColorAndroid='transparent'
				placeholder={placeholder}
				keyboardType={keyboardType}
				maxLength={maxLength}
				style={[localStyles.inputContainer, inputStyle]}
				//value={string}
				value={value}
				onChangeText={(text) => onChangeText(text)}
				//onChangeText={(text) => setString(text)}
				//onEndEditing={() => onChangeText(string)} //this way only updates father component once
				//onSubmitEditing={() => Keyboard.dismiss()}
			/>
		</View>
	);

};

const areEqual = (prevProps, nextProps) => {
	/*
	return true if passing nextProps to render would return 
	the same result as passing prevProps to render,
	otherwise return false
	*/
	return prevProps.value === nextProps.value &&
		prevProps.editable === nextProps.editable;
};

export default React.memo(StringInput, areEqual);

const localStyles = StyleSheet.create({
	container: {
		marginTop: 0.5,
		marginBottom: 0.5
	},
	inputContainer: {
		width: 170,
		height: 34,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: 'grey',
		paddingBottom: 0,
		paddingTop: 0,
		paddingLeft: 8,
		fontSize: 18,
		backgroundColor: 'white',
		letterSpacing: 0.6
	},
});