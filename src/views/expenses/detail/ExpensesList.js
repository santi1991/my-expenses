import React from 'react';
import { StyleSheet, FlatList, View, Platform } from 'react-native';
import { Paragraph, Subheading } from 'react-native-paper';
import { utcMsToLocalString } from '../../../utilities/commons/Utils';
import FormatNumber from '../../../utilities/components/FormatNumber';
import TouchableView from '../../../utilities/components/TouchableView';

const ExpensesList = ({ list, onClickItem, color }) => {

	// console.log('render:  E X P E N S E S   L I S T');
	// const dimensions = useWindowDimensions(); // useWindowDimensions from react-native
				
	const renderItem = ({ item }) => {
		return (
				<TouchableView
					onPress={() => onClickItem(item)}
					style={[localStyles.itemContainer, { flex: Platform.OS === 'web' ? 0.3 : 0.5 }]}
				>
					<>
						<View style={[localStyles.itemHeader, { backgroundColor: color }]} >
							<Subheading style={{ color: 'white' }}>{item.concept_name}</Subheading>
						</View>
						<View style={{ justifyContent: 'space-around', alignItems: 'center' }} >
							<Paragraph>
								{item.date === null ? '-- / -- / --' : utcMsToLocalString(item.date)}
							</Paragraph>
							<Paragraph>{item.description}</Paragraph>
							<FormatNumber value={item.value} style={{ color: 'black' }} />
						</View>
					</>

				</TouchableView>
				
		);
	};

	return (
		<View>		
			<FlatList
				data={list}
				extraData={list}
				renderItem={renderItem}
				keyExtractor={item => (item.id).toString()}
				// numColumns={dimensions.width >= 768 ? 3 : 2}
				numColumns={Platform.OS === 'web' ? 3 : 2}
				ListEmptyComponent={
					<Paragraph style={{ textAlign: 'center' }}>No se han encontrado resultados</Paragraph>
				}
			/>            			
		</View>
	);
};

const areEqual = (prevProps, nextProps) => {
	return prevProps.list === nextProps.list;
};

export default React.memo(ExpensesList, areEqual);

const localStyles = StyleSheet.create({	
	itemContainer: {
		height: 110,
		margin: 4,
		padding: 4,
		borderRadius: 16,
		borderWidth: 0.5,
		borderColor: 'grey',
		backgroundColor: '#F5F5F5',
		elevation: 5,
	},
	itemHeader: {
		height: 25,
		// flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 0.5,
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6
	},	
});

{/* <TouchableHighlight
					activeOpacity={0.6}
					underlayColor='#DDDDDD'
					onPress={() => {
						onClickItem(item);
						//console.log(JSON.stringify(item));
					}}
				>
					<>
						<View style={[localStyles.itemHeader, { backgroundColor: color }]} >
							<Subheading style={{ color: 'white' }}>{item.concept_name}</Subheading>
						</View>
						<View style={{ justifyContent: 'space-around', alignItems: 'center' }} >
							<Paragraph>
								{item.date === null ? '-- / -- / --' : utcMsToLocalString(item.date)}
							</Paragraph>
							<Paragraph>{item.description}</Paragraph>
							<FormatNumber value={item.value} style={{ color: 'black' }} />
						</View>
					</>
				</TouchableHighlight> */}