import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableView from './TouchableView';

// values - required and in order from left to right
// defaultValie - required
// onSelect - required
const ButtonToggle = ({ values, defaultValue, onSelect, iconLeft = '', iconRight = '', activeColor = '#263238', inactiveColor = 'white',
	titleLeft = '', titleRight = '', buttonContainer: boxContainer, labelStyle, spacing = 0 }) => {

	// console.log('render ButtonToggle'); 
	console.log(defaultValue);
	const leftValue = values[0];
	const rightValue = values[1];

	const refLeftPressed = useRef(false);
	const refRightPressed = useRef(false);

	const [render, setRender] = useState(false);


	const leftButtonPressed = () => {
		refRightPressed.current = false;
		refLeftPressed.current = true;
		//setRender(!render);
		return onSelect(leftValue);
	};

	const rightButtonPressed = () => {
		refRightPressed.current = true;
		refLeftPressed.current = false;
		//setRender(!render);
		return onSelect(rightValue);
	};

	useEffect(() => {
		if (defaultValue) {
			switch (defaultValue) {
				case leftValue:
					refRightPressed.current = false;
					refLeftPressed.current = true;
					break;
				case rightValue:
					refRightPressed.current = true;
					refLeftPressed.current = false;
					break;
				default:
					break;
			}
			setRender(!render);
		}
	}, []);

	return (

		<View style={localStyles.container}>

			<TouchableView
				style={[
					localStyles.buttonContainer,
					boxContainer,
					{
						borderTopLeftRadius: 3,
						borderBottomLeftRadius: 3,
						backgroundColor: !defaultValue || !refLeftPressed.current ? inactiveColor : activeColor,
						marginRight: spacing * 0.5
					}
				]}
				onPress={leftButtonPressed}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }} >
					<Text
						style={[localStyles.label, labelStyle, { color: defaultValue === leftValue ? 'white' : 'black' }]}
					>
						{titleLeft}
					</Text>
					{
						defaultValue === leftValue && <MaterialCommunityIcons name={iconLeft} size={22} color='white' />
					}
				</View>


			</TouchableView>

			<TouchableView
				style={[
					localStyles.buttonContainer,
					boxContainer,
					{
						backgroundColor: !defaultValue || !refRightPressed.current ? inactiveColor : activeColor,
						marginLeft: spacing * 0.5,
						borderBottomRightRadius: 3,
						borderTopRightRadius: 3,
					}
				]}
				onPress={rightButtonPressed}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }} >
					<Text
						style={[localStyles.label, labelStyle, { color: defaultValue === rightValue ? 'white' : 'black' }]}
					>
						{titleRight}
					</Text>
					{
						defaultValue === rightValue && <MaterialCommunityIcons name={iconRight} size={22} color='white' />
					}

				</View>


			</TouchableView>

		</View>

	);
};

const areEqual = (prevProps, nextProps) => {

	return prevProps.defaultValue === nextProps.defaultValue;
};

export default React.memo(ButtonToggle, areEqual);


const localStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 4,
		marginBottom: 4
	},
	buttonContainer: {
		height: 40,
		width: 140,
		backgroundColor: 'white',
		borderColor: 'grey',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 0,
		marginRight: 0,
		elevation: 4
	},
	label: {
		marginLeft: 3,
		marginRight: 3,
		fontWeight: 'bold',
		letterSpacing: 1,
		color: 'black'
	}
});

