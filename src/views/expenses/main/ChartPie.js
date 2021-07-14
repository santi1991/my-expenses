import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Headline, Caption } from 'react-native-paper';
import { Text } from 'react-native-svg';
import TouchableView from '../../../utilities/components/TouchableView';

const ChartPie = ({ showAddExpense, totalExpense, pieData }) => {
	const LabelsPer = ({ slices, height, width }) => slices.map((slice, index) => {
		const { labelCentroid, pieCentroid, data } = slice;
		return (
			<Text
				key={index}
				x={pieCentroid[0]}
				y={pieCentroid[1]}
				fill='white'
				textAnchor='middle'
				alignmentBaseline='middle'
				fontSize={16}
				fontWeight='800'
				stroke='black'
				strokeWidth={0.5}
			>
				{data.value === 0 ? null : ((data.value / totalExpense) * 100).toFixed(1) + '%'}
			</Text>
		);
	});

	return (
		<>
			{
				totalExpense === 0 ? (
					<TouchableView
						onPress={() => showAddExpense(null)}
						style={[localStyles.startContainer, { backgroundColor: 'black' }]}
					>

						<Headline style={{ color: 'white' }} >Comienza!</Headline>
						<Caption style={{ color: 'white', textAlign: 'center' }}>Registra {'\n'} tu primer gasto</Caption>

					</TouchableView>

				) : (
						<PieChart
							style={localStyles.pieChart}
							data={pieData}
							innerRadius={55}
							outerRadius={100}
							labelRadius={125}
						>
							<LabelsPer />

						</PieChart>
				)
			}
		</>
	);

};

// const areEqual = (prevProps, nextProps) => {
// 	return prevProps.totalExpense === nextProps.totalExpense;
// };
// export default React.memo(ChartPie, areEqual);
export default ChartPie;

const localStyles = StyleSheet.create({
	pieChart: {
		height: 240,
		// marginTop: 10
	},
	progressCircle: {
		height: 130,
		marginTop: 85
	},
	fadingContainer: {
		// backgroundColor: 'powderblue'
	},
	startContainer: {
		alignSelf: 'center',
		height: 150,
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 80,
		borderColor: 'white',
		marginTop: Platform.OS === 'web' ? '4%' : '10%',
		marginBottom: Platform.OS === 'web' ? '4%' : '10%',
		elevation: 5
	}
});