import React, { useState } from 'react';
import { Menu, Appbar } from 'react-native-paper';
// import { removeAllStorage } from '../../../utilities/commons/Storage';


const HeaderBar = ({ showAddExpense, showAboutMe }) => {

	const [menuVisible, setMenuVisible] = useState(false);
	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	
	return (
		<Appbar.Header
			// theme={{ colors: { primary: color } }} 
			statusBarHeight={0}
			// style={{justifyContent: 'space-between'}}
		>
			<Appbar.Content title='Gastos' subtitle='Registra tus gastos' />

			<Appbar.Action icon='face-recognition' onPress={showAboutMe} />
			<Appbar.Action icon='plus' onPress={() => showAddExpense(null)} />

			<Menu
				visible={menuVisible}
				onDismiss={closeMenu}
				anchor={
					<Appbar.Action disabled={true} icon='dots-vertical' color='white' onPress={openMenu} />
				}>
				<Menu.Item
					onPress={() => console.log('option1')}
					title='Presupuesto'
				/>
				<Menu.Item
					onPress={() => console.log('option3')}
					title='Reportes'
				/>
				<Menu.Item
					onPress={() => console.log('option2')}
					title='Ayuda...'
				/>
			</Menu>
		</Appbar.Header>
	);
};
export default HeaderBar;


