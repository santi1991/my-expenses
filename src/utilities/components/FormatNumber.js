import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

const FormatNumber = ({ value: number, style: numberStyle }) => {

	return (
		<NumberFormat
			value={number}
			renderText={value =>
				<Text style={[{ color: 'white', fontSize:17, letterSpacing: 0.5 }, numberStyle]}>
					{value}
				</Text>
			}
			displayType={'text'}
			decimalScale={2}
			decimalSeparator=','
			thousandSeparator='.'
			prefix={'$ '}
		/>
	);
};

export default FormatNumber;

