import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Modal, Portal, ActivityIndicator, Text } from 'react-native-paper';

const Loader = ({ loading }) => {
	return (

		<Portal>
			<Modal 
				visible={loading} 
				contentContainerStyle={localStyles.modalContainer} 
				dismissable={false}
			>
				<View style={{ justifyContent: 'center', alignItems: 'center' }} >
					<ActivityIndicator animating={true} color='black' size='small' />
					<Text style={{ fontWeight: 'bold', marginTop:4, letterSpacing:0.4 }}>
						Cargando...
					</Text>
				</View>

			</Modal>
		</Portal>

	);
};

export default Loader;

const localStyles = StyleSheet.create({
	modalContainer: {
		backgroundColor: '#FAFAFA', 
		borderRadius:28, 		
		width:89,
		height:88, 		
		//alignSelf:'center',
		borderWidth:0.4,
		borderColor:'grey',
		...Platform.select({
			web:{
				marginLeft:'50%'
			},
			android:{
				alignSelf:'center'
			}
		})
	},	
});
