import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Keyboard, Text, Platform } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableView from './TouchableView';

//data - onClickItem --> ARE required
// data, disabled and title are props that expects the component to re-render if its values changes
const DroplistMenu = ({ disabled, data, onClickItem, initialNumToRender = 10, title = 'elegir...', titleContainer, titleStyle,
	icon = 'chevron-down', color = 'blue', buttonStyle }) => {

	// console.log('render:  D R O P L I S T   M E N U');
	const [visible, setVisible] = useState(false);

	const itemPressed = (item) => {
		onClickItem(item);
		setVisible(false);
	};

	const showModal = () => {
		Keyboard.dismiss();
		if (Platform.OS !== 'web') {
			//This is made in order to wait for the keyboard of the device to close, since the animation takes a few ms
			//then, after 8ms, the dropdown menu is opened and rendered in its correct place			
			return setTimeout(() => { setVisible(true); }, 8);
		}
		return setVisible(true);
	};

	const renderItems = ({ item }) => (
		<TouchableView onPress={() => itemPressed(item)}>
			<View style={{ margin: 8 }} >
				<Text style={{ color: 'black' }}>{(item.name).toUpperCase()}</Text>
			</View>
		</TouchableView>
	);

	const staticTitle = () => 
		<Text style={{ fontStyle: 'italic', color: disabled === true ? 'grey' : 'black' }}>Elegir...</Text>;


	return (
		<View >



			<Menu
				statusBarHeight={35}
				visible={visible}
				onDismiss={() => setVisible(false)}
				anchor={
					<TouchableView
						disabled={disabled}
						onPress={showModal}
						style={[localStyles.labelContainer, titleContainer, { backgroundColor: disabled === true ? '#F5F5F5' : 'white' }]}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>

							<Text style={[localStyles.labelStyle, titleStyle]}>
								{title === '' ? staticTitle() : title.toUpperCase()}
							</Text>

							<View style={[localStyles.iconContainer, { backgroundColor: color}, buttonStyle]}>
								<MaterialCommunityIcons name='chevron-down' size={24} color='white'  />
							</View>
							
							
						</View>


					</TouchableView>
				}
			>
				{
					data.map((item) => {
						return (
							<Menu.Item
								key={item.id}
								onPress={() => itemPressed(item)}
								title={item.name}
							/>
							// <Stack.Screen
							// 	key={a.id}
							// 	name={a.name}
							// 	component={a.component}
							// 	options={a.options}
							// />
						);
					})
				}	


				{/* <View style={{ flex: 1, height: 180, width: 180, paddingTop: 0 }} >
					<FlatList
						data={data}
						renderItem={renderItems}
						keyExtractor={item => (item.id).toString()}
						ItemSeparatorComponent={() => <Divider />}
						initialNumToRender={initialNumToRender}
					/>
				</View> */}
			</Menu>
		</View>
	);

};

const areEqual = (prevProps, nextProps) => {
	/*
	return true if passing nextProps to render would return 
	the same result as passing prevProps to render,
	otherwise return false
	*/
	return prevProps.data === nextProps.data &&
		prevProps.title === nextProps.title &&
		prevProps.disabled === nextProps.disabled;
};

export default React.memo(DroplistMenu, areEqual);

const localStyles = StyleSheet.create({
	labelContainer: {
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 190,
		borderRightWidth: 0,
		borderColor: 'grey',
		borderRadius: 3,
		backgroundColor: 'white',		
	},
	iconContainer: {
		height: 35,
		width: 30,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: 'grey',		
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,				
		justifyContent:'center',
		alignItems:'center'		
	},
	labelStyle: {
		textAlign:'center',
		width: 160,
		color: 'black'
	}
});
