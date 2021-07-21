import React from 'react';
import { StyleSheet, View, Platform, Text as ReactText } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line, ForeignObject } from 'react-native-svg'
import { Headline, Caption } from 'react-native-paper';
import { Text } from 'react-native-svg';
import TouchableView from '../../../utilities/components/TouchableView';
import FormatNumber from '../../../utilities/components/FormatNumber';

const ChartPie = ({ showAddExpense, totalExpense, pieData }) => {

	// const LabelsPer = ({ slices, height, width }) => slices.map((slice, index) => {
	// 	const { labelCentroid, pieCentroid, data } = slice;
	// 	return (
	// 		<Text
	// 			key={index}
	// 			x={pieCentroid[0]}
	// 			y={pieCentroid[1]}
	// 			fill='white'
	// 			textAnchor='middle'
	// 			alignmentBaseline='middle'
	// 			fontSize={16}
	// 			fontWeight='800'
	// 			stroke='black'
	// 			strokeWidth={0.5}
	// 		>
	// 			{data.value === 0 ? null : ((data.value / totalExpense) * 100).toFixed(1) + '%'}
	// 		</Text>
	// 	);
	// });

	const modifyX = (positionX, name) => {
		// -84 ** -60
		if (positionX < 0 && positionX < -53) {
			if (name.length >= 10 && name.length < 13) {
				return positionX - 70;
			}
			if (name.length >= 13) {
				return positionX - 118;
			}
			return positionX - 55;
		}
		return positionX;
	};

	const Labels = ({ slices }) => {
		return slices.map((slice, index) => {
			const { labelCentroid, pieCentroid, data } = slice;
			// console.log('____________')
			// console.log(data.svg.name);
			// console.log(labelCentroid);

			if (data.value === 0) {
				return;
			}
			return (
				<G key={data.key} >
					<Line
						x1={labelCentroid[0]}
						y1={labelCentroid[1]}
						x2={pieCentroid[0]}
						y2={pieCentroid[1]}
						stroke={data.svg.fill}
					/>
					{/* <Circle 
							onClick={data.svg.onPress}
							cx={labelCentroid[0]}
							cy={labelCentroid[1]}
							r={15}
							fill={data.svg.fill}
						/> */}
					<Text
						key={data.key}
						// x={labelCentroid[0]}
						x={modifyX(labelCentroid[0], data.svg.name)}
						y={labelCentroid[1]}
						fill={data.svg.fill}
						// fill='white'
						// textAnchor='middle'
						// alignmentBaseline='middle'
						// fontSize={16}
						// fontWeight='800'
						// stroke='black'
						// strokeWidth={0.5}
					>
						{data.svg.name}
					</Text>

				</G>
			)
		})
	}

	return (
		<View style={{}} >
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
						outerRadius={90}
						labelRadius={125}
					>
						{/* <LabelsPer /> */}
						<Labels />
						{/* x={-35} y={-18} */}
						<ForeignObject x={-100} y={-18} width={100} height={100}>
							<View style={{ alignItems:'center', width: 200, height: 400, transform: [] }}>
								<ReactText  >Gasto Total</ReactText>
								<FormatNumber value={totalExpense} style={{ color: 'black', fontSize:15 }} />
							</View>
						</ForeignObject>

					</PieChart>
				)
			}
		</View>
	);

};

const areEqual = (prevProps, nextProps) => {
	return prevProps.totalExpense === nextProps.totalExpense;
};
export default React.memo(ChartPie, areEqual);
// export default ChartPie;

const localStyles = StyleSheet.create({
	pieChart: {
		height: 300,
		// marginTop: 10
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