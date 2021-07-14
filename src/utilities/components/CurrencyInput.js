import React from 'react';
import { TextInput, View } from 'react-native';
import NumberFormat from 'react-number-format';

// value (number or string) - editable (boolean) - inputContainer (object style) - onChangeNumber (function)

const CurrencyInput = ({ value: number, editable, inputContainer, onChangeNumber, onChange, placeholder = '' }) => {
	// console.log('render:  C U R R E N C Y   I N P U T');
	
	//this way the multiple re-renders to update the screen occurs here, 
	//which is a cheap process since this child component is not doing anything
	//const [num, setNum] = useState(initialNumber);

	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			
			<NumberFormat
				value={number === 0 ? '' : number} // triggers multiple renders in the father component 
				//value={num === 0 ? '' : num}
				displayType={'text'}
				decimalSeparator=','
				thousandSeparator='.'
				decimalScale={2}
				//prefix={'$'}		
				//suffix={' COP'}					
				renderText={value => (
					<TextInput
						inlineImageLeft='currency_sign'
						editable={editable}
						autoCorrect={false}
						autoCapitalize='none'
						autoCompleteType='off'
						underlineColorAndroid='transparent'
						maxLength={11} // (1)
						style={
							editable === false ?
								[inputContainer, { fontWeight: 'bold', color: 'black', backgroundColor: null, borderWidth: 0 }] :
								inputContainer
						}
						placeholder={placeholder}
						onChangeText={(text) => {
							const mystring = text.replace(/\./g, '');
							//const numberValue = Number(mystring);
							return onChangeNumber(Number(mystring)); // triggers multiple renders in the father component
							//return setNum(number);
						}}
						//onEndEditing={() => onChangeNumber(num)} //this way only updates father component once
						onChange={onChange}
						value={value}
						keyboardType='numeric'
					/>
				)}
			/>
		</View>
	);
};

export default CurrencyInput;

/*
 (1) maxLength
	  postgreSQL integer -2147483648 to +2147483647 -> that is a 10 digit value
	plus 3 dots when the number is formatted while typing for a total length of 13

	<Text style={{ fontSize: 17, fontWeight: 'bold', marginRight: 5, color: 'black' }}>
				{`$`}
			</Text>
*/