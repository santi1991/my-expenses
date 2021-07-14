import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Menu, Searchbar } from 'react-native-paper';
// import { CommonActions } from '@react-navigation/native';

const HeaderProfile = ({ color, navigation, filterFunction, masterDataSource, showFilter }) => {

	const [menuVisible, setMenuVisible] = useState(false);
	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);
	
	const [search, setSearch] = useState('');
	//const onChangeSearch = text => setSearch(text);
	
	const searchDescriptionFilter = (text) => {
		setSearch(text);
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource
			// Update FilteredDataSource
			const newData = masterDataSource.filter((item) => {
				const itemData = item.description
					? item.description.toUpperCase()
					: ''.toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			return filterFunction(newData);
		}
		else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			return filterFunction(masterDataSource);
		}
	};

	
 
	return (
		<View style={[styles.headerContainer, { backgroundColor: color }]}>

			<View style={styles.actionContainer}>

				<IconButton
					icon='arrow-left'
					color='white'
					size={26}
					// onPress={() => navigation.navigate('BottomTabNavigator', { screen: 'ExpenseScreen' })}
					onPress={() => navigation.goBack()}
				/>

			</View>

			<View style={[styles.actionContainer, { flex: 0.67 }]} >
				<Searchbar
					placeholder='Buscar...'
					//onChangeText={onChangeSearch}
					onChangeText={searchDescriptionFilter}
					value={search}
					style={styles.searchBarStyle}
					inputStyle={{ paddingBottom: 0, paddingTop: 0 }}
				/>
			</View>

			<View style={styles.actionContainer}>

				<IconButton
					//disabled={true} 
					icon='filter-outline'
					color='white'
					size={26}
					onPress={showFilter}
				/>

			</View>

			<View style={styles.actionContainer}>

				<Menu
					visible={menuVisible}
					onDismiss={closeMenu}
					anchor={
						<IconButton
							disabled={true} 
							icon='dots-vertical'
							color='white'
							size={26}
							onPress={openMenu}
						/>
					}>
					<Menu.Item
						onPress={() => console.log('option1')}
						title='Presupuesto'
					/>
					<Menu.Item
						onPress={() => console.log('option3')}
						title='Reportes'
					// disabled 
					/>
					<Menu.Item
						onPress={() => console.log('option2')}
						title='Ayuda...'
					/>
				</Menu>

			</View>		

		</View>
	);
};

export default HeaderProfile;

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#263238',
		width: '100%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 5
	},
	actionContainer: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 0.11
	},
	searchBarStyle: {
		height: 35,
	}
});

