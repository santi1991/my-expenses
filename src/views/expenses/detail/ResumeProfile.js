import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Surface, Text, Subheading, Avatar } from 'react-native-paper';
import FormatNumber from '../../../utilities/components/FormatNumber';


const ResumeProfile = ({ category, expenses, currentPeriod, totalExpense }) => {

	const firstDay = currentPeriod.firstDay.getDate();
	const lastDay = currentPeriod.lastDay.getDate();
	const relatedMonth = currentPeriod.firstDay.getMonth() + 1;
	const relatedYear = currentPeriod.lastDay.getFullYear();

	return (

		<View style={localStyles.resumeContainer} >

			<Surface style={[localStyles.categorySurface, { backgroundColor: category.color }]}>

				<View style={localStyles.pairContainer} >
					<Avatar.Icon style={localStyles.categoryIcon} size={32} icon={category.icon} />
					<Subheading style={localStyles.textTitle}>
						{category.name.toUpperCase()}
					</Subheading>
				</View>

				<View style={localStyles.pairContainer}>
					<Text style={localStyles.pairLabel}>
						# transacciones:
					</Text>
					<Text style={{ color: 'white', fontSize: 16 }}>
						{expenses.length}
					</Text>
				</View>

				<View style={localStyles.pairContainer}>
					<Text style={localStyles.pairLabel}>
						Presupuesto:
					</Text>
					<FormatNumber value={category.budget} />
				</View>

				<View style={localStyles.pairContainer}>
					<Text style={localStyles.pairLabel}>
						Gasto Total:
					</Text>
					<FormatNumber value={category.value} />
				</View>

			</Surface>

			<View>
				<Surface style={[localStyles.surface, { backgroundColor: category.third_color }]}>
					<Text>Periodo</Text>
					<Text>{firstDay} - {lastDay} / {relatedMonth} / {relatedYear}</Text>
				</Surface>

				<Surface style={[localStyles.surface, { backgroundColor: category.third_color, marginTop: 9 }]}>
					<Text>Gasto Global</Text>
					<FormatNumber
						value={totalExpense}
						style={{ color: 'black' }}
					/>
				</Surface>

			</View>
		</View>
	);
};

export default ResumeProfile;

const localStyles = StyleSheet.create({	
	resumeContainer: {
		flexDirection: 'row',
		//alignItems: 'center',
		justifyContent: Platform.OS === 'web' ? 'space-evenly' : 'space-around',
		marginTop: 5,
		marginBottom: 5
	},
	categorySurface: {
		padding: 5,
		height: 100,
		width: Platform.OS === 'web' ? 255 : 235,
		justifyContent: 'space-evenly',
		elevation: 4,
	},
	textTitle: {
		color: 'white',
		fontWeight: 'bold',
		letterSpacing: 1,
		marginLeft: 8
	},
	surface: {
		padding: 6,
		height: 45,
		width: Platform.OS === 'web' ? 155 : 135,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
	},
	pairContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	pairLabel: {
		color: 'white',
		marginRight: 7
	},
	categoryIcon: {
		borderWidth: 1,
		borderColor: 'white',
	},
});