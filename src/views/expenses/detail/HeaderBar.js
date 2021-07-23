import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Appbar, Menu, Searchbar } from 'react-native-paper';

const HeaderBar = ({ color, navigation, filterFunction, masterDataSource, showFilter }) => {

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
        <Appbar.Header 
            theme={{ colors: { primary: color } }} 
            statusBarHeight={0} 
            style={{justifyContent: 'space-between'}}
        >

            <Appbar.BackAction onPress={navigation.goBack} />

            {/* <Appbar.Content title="Title" subtitle="Subtitle" /> */}
            <Searchbar
                placeholder='Buscar...'
                //onChangeText={onChangeSearch}
                onChangeText={searchDescriptionFilter}
                value={search}
                style={styles.searchBarStyle}
                inputStyle={{ paddingBottom: 0, paddingTop: 0 }}
            />

            <Appbar.Action icon='filter-outline' onPress={showFilter} />



            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action disabled={true} icon='dots-vertical' color='white' onPress={openMenu}/>

                }>
                <Menu.Item
                    onPress={() => alert('option1')}
                    title='Presupuesto'
                />
                <Menu.Item
                    onPress={() => alert('option3')}
                    title='Reportes'
                    // disabled 
                />
                <Menu.Item
                    onPress={() => alert('option2')}
                    title='Ayuda...'
                />
            </Menu>


        </Appbar.Header>
    );
};
export default HeaderBar;

const styles = StyleSheet.create({        
    searchBarStyle: {
        height: 35,               
        width: Platform.OS === 'web' ? '45%' : 220
    }
});

