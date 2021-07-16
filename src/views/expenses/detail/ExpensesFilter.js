import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text, Divider, IconButton, Modal } from 'react-native-paper';
import { styles, colors } from '../../../utilities/commons/Styles';
import { filterExpenses } from '../shared/Utils';
import CurrencyInput from '../../../utilities/components/CurrencyInput';
import DroplistMenu from '../../../utilities/components/DroplistMenu';
import ButtonToggle from '../../../utilities/components/ButtonToggle';
import RangeDatePicker from '../../../utilities/components/RangeDatePicker';


const ExpensesFilter = ({ visible, onHideModal, onFilter, onClean, masterDataSource, conceptsList }) => {
	// console.log('render: EXPENSES FILTER');

	const clearIcon = 'close-box-outline';
	const [render, setRender] = useState(false); //trigge a rerender for the component if needed

	const filterArray = useRef([]);

	const addToFilterArray = (filterObject) => {
		const idx = filterArray.current.findIndex(idx => idx.id === filterObject.id);
		if (idx > -1) {
			filterArray.current.splice(idx, 1, filterObject);
		}
		filterArray.current.push(filterObject);
	};
	const deleteFromFilterArray = (id) => {
		const idx = filterArray.current.findIndex(idx => idx.id === id);
		filterArray.current.splice(idx, 1);
	};

	// --------------------------------------------------------------------
	//   -----  by  CONCEPT  ----- id: 1
	//*********************************************************************
	const concept_name = useRef(''); // for UI purposes
	const concept_id = useRef(null); //  ##*** search parameter -> number ***##

	const onSelectConcept = (item) => {
		concept_name.current = item.name;
		concept_id.current = item.id;
		const filterObject = { id: 1, filter: item.id };
		addToFilterArray(filterObject);
		setRender(!render);
	};
	const onCleanConcept = () => {
		deleteFromFilterArray(1);
		concept_name.current = '';
		concept_id.current = null;
		setRender(!render);
	};
	// --------------------------------------------------------------------
	//   -----  by  DATE RANGE  ----- id: 2
	//*********************************************************************
	const initialDate = useRef(null); // ##*** search parameter -> number ***##
	const finalDate = useRef(null); // ##*** search parameter -> number ***##

	const selectedDate = (startDate, endDate) => {
		initialDate.current = startDate;
		finalDate.current = endDate;
		const filterObject = {
			id: 2,
			filter: [startDate, endDate]
		};
		addToFilterArray(filterObject);
		setRender(!render);
	};
	const onCleanDateRange = () => {
		deleteFromFilterArray(2);
		initialDate.current = null;
		finalDate.current = null;
		setRender(!render);
	};
	// --------------------------------------------------------------------
	//   -----  by  DATE ORDER  ----- id: 3
	//*********************************************************************
	const [dateOrder, setDateOrder] = useState(null); // ##*** search parameter -> string ***##
	const onSelectDateOrder = (parameter) => {
		const filterObject = {
			id: 3,
			filter: parameter
		};
		addToFilterArray(filterObject);
		return setDateOrder(parameter); //param: 'newest'; to oldest --- param: 'oldest'; to newest 
	};
	const onCleanDateOrder = () => {
		deleteFromFilterArray(3);
		return setDateOrder(null);
	};
	// --------------------------------------------------------------------
	//   -----  by  VALUE RANGE  -----  id: 4
	//*********************************************************************	
	const [valueRange, setValueRange] = useState({
		firstValue: 0,
		lastValue: 0
	}); // ##*** search parameter -> number ***##
	const onSelectValueRange = (order, number) => {
		if (order === 'first') {
			return setValueRange({ ...valueRange, firstValue: number });
		}
		const filterObject = {
			id: 4,
			filter: [valueRange.firstValue, number]
		};
		addToFilterArray(filterObject);
		return setValueRange({ ...valueRange, lastValue: number });
	};
	const onCleanValueRange = () => {
		deleteFromFilterArray(4);
		return setValueRange({ ...valueRange, firstValue: 0, lastValue: 0 });
	};
	// --------------------------------------------------------------------	
	//   -----  by  VALUE ORDER  -----  id: 5
	//*********************************************************************
	const [valueOrder, setValueOrder] = useState(null); // ##*** search parameter -> string ***##
	const onSelectValueOrder = (parameter) => {
		const filterObject = {
			id: 5,
			filter: parameter
		};
		addToFilterArray(filterObject);
		return setValueOrder(parameter); //param: 'highest'; to lowest --- param: 'lowest'; to highest 
	};
	const onCleanValueOrder = () => {
		deleteFromFilterArray(5);
		return setValueOrder(null);
	};
	// --------------------------------------------------------------------	
	//*********************************************************************

	const applyFilterOptions = () => {
		//const cloneMasterData = [...masterDataSource];
		const filteredData = filterExpenses(masterDataSource, filterArray.current);
		return onFilter(filteredData);
	};

	const cleanFilterOptions = () => {
		const cloneFilterArray = [...filterArray.current];
		for (let i = 0; i < cloneFilterArray.length; i++) {
			const optionFilter = cloneFilterArray.find(optionFilter => optionFilter.id === cloneFilterArray[i].id);
			switch (optionFilter.id) {
				case 1:
					onCleanConcept(); break;
				case 2:
					onCleanDateRange(); break;
				case 3:
					onCleanDateOrder(); break;
				case 4:
					onCleanValueRange(); break;
				case 5:
					onCleanValueOrder(); break;
				default:
					filterArray.current = [];
					throw new Error('No match en switch cleanFilterOptions');
			}
		}
		//return onClean();
	};

	const closeFilterModal = () => {
		return onHideModal();
	};

	return (
		<Portal>
			<Modal
				dismissable={true}
				visible={visible}
				onDismiss={closeFilterModal}
				contentContainerStyle={styles.modalContainer}
			>
				<View>

					<View style={styles.modalPairContainer}>

						<Text>Por Concepto</Text>

						<DroplistMenu
							title={concept_name.current}
							data={conceptsList}
							onClickItem={onSelectConcept}
							titleContainer={{ width: 145 }}
						/>

						<IconButton
							disabled={!concept_name.current}
							icon={clearIcon}
							color='black'
							size={20}
							onPress={onCleanConcept}
						/>

					</View>

					<Divider style={styles.dividerContainer} />

					<Text>Por Rango de Fecha</Text>

					<View style={styles.modalPairContainer}>

						<RangeDatePicker
							startDate={initialDate.current}
							endDate={finalDate.current}
							onConfirm={selectedDate}
							containerStyle={{ width: 220 }}
						/>



						<IconButton
							disabled={!finalDate.current}
							icon={clearIcon}
							color='black'
							size={20}
							onPress={onCleanDateRange}
						/>

					</View>

					<View style={styles.modalPairContainer}>

						<ButtonToggle
							activeColor={colors.secondary}
							buttonContainer={{ height: 35, width: 90 }}
							titleLeft={'Reciente'}
							titleRight={'Antiguo'}
							spacing={10}
							values={['newest', 'oldest']}
							defaultValue={dateOrder}
							onSelect={(val) => onSelectDateOrder(val)}
						/>

						<IconButton
							disabled={!dateOrder}
							icon={clearIcon}
							color='black'
							size={20}
							onPress={onCleanDateOrder}
						/>

					</View>

					<Divider style={styles.dividerContainer} />

					<Text>Por Valor</Text>

					<View style={styles.modalPairContainer}>

						<CurrencyInput
							value={valueRange.firstValue}
							inputContainer={[styles.input, { width: 115 }]}
							onChangeNumber={(number) => onSelectValueRange('first', number)}
							placeholder={'Min.'}
						/>

						<CurrencyInput
							value={valueRange.lastValue}
							inputContainer={[styles.input, { width: 115 }]}
							onChangeNumber={(number) => onSelectValueRange('last', number)}
							placeholder={'Max.'}
						/>

						<IconButton
							disabled={!valueRange.lastValue || !valueRange.firstValue}
							icon={clearIcon}
							color='black'
							size={20}
							onPress={onCleanValueRange}
						/>
					</View>

					<View style={styles.modalPairContainer}>

						<ButtonToggle
							activeColor={colors.secondary}
							buttonContainer={{ height: 35, width: 90 }}
							titleLeft={'De Mayor'}
							titleRight={'De Menor'}
							spacing={10}
							values={['highest', 'lowest']}
							defaultValue={valueOrder}
							onSelect={(val) => onSelectValueOrder(val)}
						/>

						<IconButton
							disabled={!valueOrder}
							icon={clearIcon}
							color='black'
							size={20}
							onPress={onCleanValueOrder}
						/>

					</View>

					<Divider style={styles.dividerContainer} />



					<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 }}>
						<Button
							mode='text'
							style={{ width: 120 }}
							onPress={closeFilterModal}
						>
							Cancelar
						</Button>

						<Button
							disabled={!filterArray.current.length}
							mode='contained'
							color={'blue'}
							style={{ width: 100 }}
							onPress={cleanFilterOptions}
						>
							Limpiar
						</Button>

						<Button
							// disabled={!filterArray.current.length}
							mode='contained'
							onPress={applyFilterOptions}
							style={{ width: 100 }}
						>
							Filtrar
						</Button>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

const areEqual = (prevProps, nextProps) => {
	return prevProps.visible === nextProps.visible;
};

export default React.memo(ExpensesFilter, areEqual);

