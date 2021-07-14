import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// values - required and in order from left to right
// defaultValie - required
// onSelect - required
const ButtonToggle = ({ values, defaultValue, onSelect, iconLeft, iconRight, activeColor = '#263238', inactiveColor = 'white',
	titleLeft = '', titleRight = '', buttonContainer: boxContainer, labelStyle, spacing = 0 }) => {        
	
	console.log('render ButtonToggle'); 
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

			<TouchableOpacity
				style={[
					localStyles.buttonContainer, 
					boxContainer,
					{ 
						borderTopLeftRadius:3,
						borderBottomLeftRadius:3,
						backgroundColor: !defaultValue || !refLeftPressed.current ? inactiveColor : activeColor,
						marginRight: spacing * 0.5
					}
				]}
				onPress={leftButtonPressed}
			>
				<Text style={[
					localStyles.label,
					labelStyle,
					{ 
						color: !defaultValue || !refLeftPressed.current ? 'black' : 'white' 
					}
				]} 
				>
					{titleLeft}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					localStyles.buttonContainer, 
					boxContainer,
					{ 
						backgroundColor: !defaultValue || !refRightPressed.current ? inactiveColor : activeColor,
						marginLeft: spacing * 0.5,
						borderBottomRightRadius:3,
						borderTopRightRadius:3,
					}
				]}
				onPress={rightButtonPressed}
			>
				<Text 
					style={[
						localStyles.label,
						labelStyle,
						{ 
							color: !defaultValue || !refRightPressed.current  ? 'black' : 'white'
						}
					]}
				>
					{titleRight}
				</Text>
			</TouchableOpacity>

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
		marginBottom:4
	},
	buttonContainer: {
		height:40, 
		width:140, 
		backgroundColor:'white',
		borderColor:'grey',
		borderWidth:1,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:0,
		marginRight:0,
		elevation: 4 
	},
	label: {
		fontWeight: 'bold', 
		letterSpacing: 1,
		color:'black'
	}
});