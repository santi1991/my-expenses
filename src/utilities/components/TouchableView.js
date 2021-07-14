import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';

const TouchableView = ({ disabled, onPress, style, children }) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			activeOpacity={0.6}
			underlayColor='#DDDDDD'
			onPress={onPress}
			style={[styles.container, style]} //when the children is a common react native component, the style props is not required
		>
			{children}
		</TouchableOpacity>
	);
};
export default TouchableView;

const styles = StyleSheet.create({
	container: {
		
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0.6 },
		shadowOpacity: 0.5,
		shadowRadius: 1.5,
		elevation: Platform.OS === 'web' ? 2 : 5,
	}
});