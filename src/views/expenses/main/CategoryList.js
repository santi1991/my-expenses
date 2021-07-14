import React from 'react';
import { StyleSheet, Platform, FlatList, View, useWindowDimensions } from 'react-native';
import { Avatar, Paragraph, Subheading, Text, Caption, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableView from '../../../utilities/components/TouchableView';
import FormatNumber from '../../../utilities/components/FormatNumber';


const BudgetButton = ({ category, onClick: showAddBudget }) => (

	<TouchableView
		onPress={() => showAddBudget(category)}
		style={[localStyles.buttonSyle, { backgroundColor: category.second_color }]}
	>
		{
			category.budget === 0 ? (
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
					<Caption style={{ color: 'white', flex: 0.9, textAlign: 'center', fontWeight: 'bold' }}>
						CREAR PRESUPUESTO
					</Caption>
					<MaterialCommunityIcons name='circle-edit-outline' size={22} color='white' />
				</View>
			) : (
				<>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }} >
						<Paragraph style={localStyles.textStyle} >Presupuesto</Paragraph>
						<MaterialCommunityIcons name='circle-edit-outline' size={20} color='white' />
					</View>
					<FormatNumber value={category.budget} />
				</>
			)
		}
	</TouchableView>
);

const ExpenseButton = ({ category, onClick: showAddExpense }) => (
	<TouchableView
		onPress={() => showAddExpense(category)}
		style={[localStyles.buttonSyle, { backgroundColor: category.second_color }]}
	>
		{
			category.value === 0 ? (
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
					<Paragraph style={{ color: 'white', flex: 0.7, textAlign: 'center', fontWeight: 'bold' }} >NUEVO GASTO</Paragraph>
					<MaterialCommunityIcons name='plus-circle-outline' size={24} color='white' />
				</View>
			) : (
				<>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }} >
						<Paragraph style={localStyles.textStyle}>Gasto</Paragraph>
						<MaterialCommunityIcons name='plus-circle-outline' size={21} color='white' />
					</View>
					<FormatNumber
						value={category.value}
						style={{ fontSize: 17 }}
					/>
				</>
			)
		}
	</TouchableView>
);



const CategoryList = ({ categoryExpenses, totalExpense, toEditExpenses, showAddExpense, showAddBudget }) => {
	// console.log('render: CategoryList');
	const dimensions = useWindowDimensions();

	const renderListCategories = ({ item }) => {
		// console.log(item);
		return (
			<View style={localStyles.categoryView}>

				<TouchableView
					onPress={() => toEditExpenses(item)}
					style={[localStyles.categoryContainer, { backgroundColor: item.color }]}
				>

					<View style={{ flex: 0.15, alignItems: 'center' }}>
						<Avatar.Icon style={localStyles.avatarIcon} size={44} icon={item.icon} />
					</View>

					<View style={{ flex: 0.74 }}>

						<Subheading style={localStyles.titleStyle}>
							{item.name.toUpperCase()}
						</Subheading>

						<View style={localStyles.buttonContainer} >

							<BudgetButton
								category={item}
								onClick={showAddBudget}
							/>
							<ExpenseButton
								category={item}
								onClick={showAddExpense}
							/>

						</View>

						<ProgressBar
							// visible={true}
							progress={0.5}
							color={item.third_color}
							style={localStyles.barStyle}
						/>

						<Text style={localStyles.textStyle} >Progreso Presupuesto: 50%</Text>

					</View>

					<View style={{ flex: 0.11, alignItems: 'center' }} >
						<MaterialCommunityIcons name='chevron-right' size={38} color='white' />
					</View>

				</TouchableView>

			</View>
		);
	};

	return (
		<View style={localStyles.flatListContainer}>
			<FlatList
				data={categoryExpenses}
				extraData={categoryExpenses}
				renderItem={renderListCategories}
				keyExtractor={item => (item.id).toString()}
				numColumns={dimensions.width >= 768 ? 2 : 1}
				ListHeaderComponent={
					<>
						<Paragraph>Gasto Total</Paragraph>
						<FormatNumber value={totalExpense} style={{ color: 'black' }} />
					</>
				}
				ListHeaderComponentStyle={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
			/>
		</View>
	);

};

const areEqual = (prevProps, nextProps) => {
	return prevProps.totalExpense === nextProps.totalExpense &&
		prevProps.categoryExpenses === nextProps.categoryExpenses;
};


export default React.memo(CategoryList, areEqual);


const localStyles = StyleSheet.create({
	flatListContainer: {
		...Platform.select({
			web: {
				alignItems: 'center',
				height: '50%',
				//backgroundColor: 'white',			
			},
			android: {
				// maxHeight: '55%',
				height: '55%',
				//backgroundColor:'white'
			}
		})
	},
	categoryView: {
		...Platform.select({
			android: {
				backgroundColor: '#ECEFF1'
			}
		})
	},
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 2,
		elevation: 5,
		height: 135,
		borderWidth: 0.6,
		borderColor: 'grey',
		borderRadius: 22,
		marginTop: 2,
		marginBottom: 2,
		marginLeft: 4,
		marginRight: 4,
		...Platform.select({
			web: {
				width: 400,
			},
		})
	},
	avatarIcon: {
		borderWidth: 1,
		borderColor: 'white',
	},
	titleStyle: {
		color: 'white',
		fontWeight: 'bold',
		letterSpacing: 2,
		textAlign: 'center'
	},
	textStyle: {
		marginRight: 5,
		color: 'white',
		fontWeight: 'bold'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 2,
		marginBottom: 4
	},
	buttonSyle: {
		flex: 0.46,
		height: 55,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 0.3,
		borderColor: 'grey',		
		borderRadius: 8,
		padding: 1
	},
	barStyle: {
		marginTop: 5,
		marginBottom: 5,
		height: 6
	}
});

