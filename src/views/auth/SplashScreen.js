import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ResolveAppData from '../../utilities/components/ResolveAppData';


const SplashScreen = () => {

    const [visible, setVisible] = useState(true);
	//const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color='red' size='large' />

            {
				visible && (
					<ResolveAppData 
						visible={visible}
						onHide={hideModal}
					/>
				)
			}

        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
});
