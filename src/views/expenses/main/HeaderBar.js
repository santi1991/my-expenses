import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { removeAllStorage } from '../../../utilities/commons/Storage';

const HeaderBar = ({ showAddExpense }) => {

	const [menuVisible, setMenuVisible] = useState(false); 
	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);	
	

	return (
		<View style={styles.headerContainer}>
			
	
			<View style={[styles.actionContainer, { flex: 0.76 }]} >	
				<IconButton
					icon='plus'
					color='red'
					size={28}
					onPress={removeAllStorage}
				/>			

			</View>

			<View style={[styles.actionContainer, { flex: 0.12 }]}>

				<IconButton
					icon='plus'
					color='white'
					size={28}
					onPress={() => showAddExpense(null)}
				/>

			</View>

			<View style={[styles.actionContainer, { flex: 0.12 }]}>

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
export default HeaderBar;

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#263238',
		width: '100%',
		height: Platform.OS === 'web' ? 65 : 55,
		flexDirection: 'row',
		alignItems: 'center',
		// elevation:5,

        shadowColor: '#000',
		shadowOffset: { width: 0, height: 0.5 },
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: Platform.OS === 'web' ? 2 : 5,
	},
	actionContainer: {
		height: 45,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
