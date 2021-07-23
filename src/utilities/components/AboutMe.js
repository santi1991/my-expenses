import React, { useCallback } from 'react';
import { View, Linking, Platform } from 'react-native';
import { Modal, Portal, Text, Button, Avatar, Paragraph } from 'react-native-paper';
import { styles } from '../commons/Styles';



const AboutMe = ({ visible, onDismiss }) => {

    const supportedURL = 'https://santi1991.github.io/me';

    const handlePress = useCallback(async () => {

        const supported = await Linking.canOpenURL(supportedURL);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(supportedURL);
        } else {
            Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
        }
    }, []);


    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[styles.modalContainer, { height: 220 }]}
            >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Avatar.Image size={110} source={require('../../resources/images/avatar.png')} />
                        <View style={{marginLeft:8, width:230}} >
                            <Paragraph style={{textAlign:'center'}}>Hola Mundo!, Soy Santiago</Paragraph>
                            <Text style={{textAlign:'center'}}>Recuerda, ningún dato que ingreses persiste en una DB.</Text>
                            <Paragraph>santiago.marulandam@gmail.com</Paragraph>
                        </View>

                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Button icon='web' mode='contained' onPress={handlePress}>
                            Ir a mi Sitio
                        </Button>


                    </View>

            </Modal>
        </Portal>
    );
};

export default AboutMe;