import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { Portal, Modal, Subheading, IconButton, Button } from 'react-native-paper';
import { styles } from '../../../../utilities/commons/Styles';
import { utcMsToUtcString, randomInteger } from '../../../../utilities/commons/Utils';
import { selectConceptsList } from '../Utils';
import { AppContext } from '../../../../utilities/context/AppProvider';
import Loader from '../../../../utilities/components/Loader';
import CurrencyInput from '../../../../utilities/components/CurrencyInput';
import DroplistMenu from '../../../../utilities/components/DroplistMenu';
import StringInput from '../../../../utilities/components/StringInput';
import SingleDatePicker from '../../../../utilities/components/SingleDatePicker';
import { expense_categories } from '../Data';
import { setStorageValue, getStorageValue } from '../../../../utilities/commons/Storage';
// import { putExpense, updateExpense, deleteExpense } from '../../../utilities/api/Budgets';


// expenseInfo, selectedCategory, selectedClass ->
// are required to update/delete expense - father comp already did the search to define these values.

const AddExpense = ({ visible, onHideModal, expenseInfo, selectedCategory, selectedClass }) => {

	// console.log('render: A D D   E X P E N S E');
	const expenseCategories = expense_categories;
	const { setExpensesGroup } = useContext(AppContext);

	const refConceptList = useRef([]);

	const initialState = {
		id: null,
		category_name: '', // not a field of the DB 
		category_id: null,
		concept_name: '', // not a field of the DB 
		concept_id: '',
		description: '',
		date: new Date().getTime(),
		value: 0
	};
	const [expense, setExpense] = useState(expenseInfo || initialState);
	const [loading, setLoading] = useState(false);

	const onClickItemCategory = (item) => {
		//this logic assign an empty value to concept name if it has had already assigned a value,
		//because probably the user picks another category different to the first one chosen
		let currentConceptName = expense.concept_name;
		if (expense.concept_name !== '') {
			currentConceptName = '';
		}
		refConceptList.current = selectConceptsList(item.id);
		return setExpense(prevState => ({
			...prevState,
			category_name: item.name,
			category_id: item.id,
			concept_name: currentConceptName
		}));
	};

	const onDismissKeyboard = () => {
		let ms = 0;
		//This conditional must be done because if you omit this, on web you wont be able to focus the input
		if (Platform.OS !== 'web') {
			ms = 5;
			Keyboard.dismiss();
		}
		//this timer is a way out to wait for the keyboard closing animation to end
		return ms;
	};

	const generateExpenseFields = () => {
		const expenseDbFields = { ...expense };
		// delete those fields that do not belong to DB
		delete expenseDbFields.category_name;
		delete expenseDbFields.concept_name;
		expenseDbFields.date = utcMsToUtcString(expense.date);
		return { expenseDbFields, expenseUiFields: expense };
	};

	const callPutExpense = async () => {
		setLoading(true);
		const { expenseDbFields, expenseUiFields } = generateExpenseFields();
		delete expenseDbFields.id;
		// expenseDbFields.date = utcMsToUtcString(expense.date); // date in ms to UTC format to be saved on db
		// putExpense(expenseDbFields)
		// 	.then((savedExpense) => {
		// 		console.log(JSON.stringify(savedExpense));
		// 		const newExpense = { ...expenseUiFields, id: savedExpense.id };
		// 		return setExpensesGroup({ type: 'PUT_EXPENSE', payload: newExpense });
		// 	})
		// 	.catch((error) => {
		// 		alert(JSON.stringify(error));
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 		handleOnDismiss();
		// 	});

		const currentExpensesList = await getStorageValue('userExpenses');
		expenseDbFields.id = randomInteger(1, 999);
		console.log(expenseDbFields);
		currentExpensesList.push(expenseDbFields);
		console.log(currentExpensesList);
		debugger;
		await setStorageValue('userExpenses', currentExpensesList);
		

		const newExpense = { ...expenseUiFields, id: randomInteger(1, 999) };

		
		setExpensesGroup({ type: 'PUT_EXPENSE', payload: newExpense });
		setTimeout(() => {            
            setLoading(false);
			handleOnDismiss();
        }, 1000);
	};

	const callUpdateExpense = async () => {
		setLoading(true);
		const { expenseDbFields, expenseUiFields } = generateExpenseFields();
		// updateExpense(expenseDbFields)
		// 	.then(() => {
		// 		const payloadObj = {
		// 			oldExpenseValue: expenseInfo.value, //expenseInfo comes as props, it is not directly modified
		// 			updatedExpense: expenseUiFields,
		// 			selectedCategory: selectedCategory,
		// 			selectedClass: selectedClass
		// 		};
		// 		setExpensesGroup({ type: 'UPDATE_EXPENSE', payload: payloadObj });
		// 	})
		// 	.catch((error) => {
		// 		alert(JSON.stringify(error));
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 		handleOnDismiss();
		// 	});
		const payloadObj = {
			oldExpenseValue: expenseInfo.value, //expenseInfo comes as props, it is not directly modified
			updatedExpense: expenseUiFields,
			selectedCategory: selectedCategory,
			selectedClass: selectedClass
		};
		setExpensesGroup({ type: 'UPDATE_EXPENSE', payload: payloadObj });	
		setTimeout(() => {            
			setLoading(false);
			handleOnDismiss();
		}, 1000);
	};

	const callDeleteExpense = async () => {
		setLoading(true);
		const { expenseDbFields, expenseUiFields } = generateExpenseFields();
		// deleteExpense(expenseDbFields)
		// 	.then(() => {
		// 		const payloadObj = {
		// 			deletedExpense: expenseUiFields,
		// 			selectedCategory: selectedCategory,
		// 			selectedClass: selectedClass
		// 		};
		// 		setExpensesGroup({ type: 'DELETE_EXPENSE', payload: payloadObj });
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		alert('ERROR delete expense');
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 		handleOnDismiss();
		// 	});

		const payloadObj = {
			deletedExpense: expenseUiFields,
			selectedCategory: selectedCategory,
			selectedClass: selectedClass
		};
		setExpensesGroup({ type: 'DELETE_EXPENSE', payload: payloadObj });
		setTimeout(() => {            
			setLoading(false);
			handleOnDismiss();
		}, 1000);
	};

	const onPressAccept = () => {
		const ms = onDismissKeyboard();
		//this timer is a way out to wait for the keyboard closing animation to end
		//avoids weird jumps of the dropdown menus or loader comp if they are open
		setTimeout(() => {
			if (expenseInfo) {
				return callUpdateExpense();
			}
			return callPutExpense();
		}, ms);
	};

	const onPressDelete = () => {
		const ms = onDismissKeyboard();
		setTimeout(() => {
			return callDeleteExpense();
		}, ms);
	};

	const handleOnDismiss = () => {
		setExpense(initialState);
		return onHideModal();
	};

	useEffect(() => {
		if (selectedCategory) {
			refConceptList.current = selectConceptsList(selectedCategory.id);
			setExpense(prevState => ({
				...prevState,
				category_name: selectedCategory.name,
				category_id: selectedCategory.id
			}));
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (expenseInfo) {
			setExpense(prevState => ({
				...prevState,
				...expenseInfo
			}));
		}
	}, [expenseInfo]);

	return (
		<Portal>
			<Modal
				dismissable={true}
				visible={visible}
				onDismiss={handleOnDismiss}
				contentContainerStyle={styles.modalContainer}
			>

				<View>

					<View style={styles.modalPairContainer}>

						<Subheading style={styles.subheading}>Fecha de Registro</Subheading>

						<SingleDatePicker
							date={expense.date}
							onConfirm={(newDate) => setExpense(prevState => ({ ...prevState, date: newDate }))}
						/>

					</View>

					<View style={styles.modalPairContainer}>

						<Subheading style={styles.subheading}>Categoría</Subheading>


						<View style={{ flexDirection: 'row', alignItems: 'center' }}>

							<DroplistMenu
								title={expense.category_name}
								disabled={Boolean(selectedCategory)}
								data={expenseCategories}
								onClickItem={onClickItemCategory}
							/>
						</View>

					</View>

					<View style={styles.modalPairContainer}>

						<Subheading style={styles.subheading}>Concepto</Subheading>

						<View style={{ flexDirection: 'row', alignItems: 'center' }}>

							<DroplistMenu
								title={expense.concept_name}
								disabled={!expense.category_name}
								data={refConceptList.current}
								onClickItem={(item) =>
									setExpense(prevState => ({
										...prevState,
										concept_name: item.name,
										concept_id: item.id
									}))
								}
							/>
						</View>

					</View>

					<View style={styles.modalPairContainer}>

						<Subheading style={styles.subheading}>Valor Gastado</Subheading>

						<CurrencyInput
							value={expense.value}
							inputContainer={[styles.input, { width: 140 }]}
							onChangeNumber={(num) => setExpense(prevState => ({ ...prevState, value: num }))}
							placeholder={'0.0...'}
						/>

					</View>

					<Subheading style={styles.subheading}>Descripción</Subheading>

					<StringInput
						value={expense.description}
						onChangeText={(text) => setExpense(prevState => ({ ...prevState, description: text }))}
						placeholder={'Pago Arriendo del mes ...'}
						inputStyle={{ width: '100%' }}
					/>

					<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 }} >
						{
							expenseInfo && (
								<IconButton
									icon='delete-forever'
									size={28}
									color='red'
									onPress={onPressDelete}
									style={{ marginRight: 20 }}
								/>
							)
						}
						<Button
							mode='contained'
							onPress={handleOnDismiss}
							color='#546E7A'
						>
							Cancelar
						</Button>
						<Button
							disabled={!expense.category_name || !expense.concept_name || !expense.value || !expense.date}
							mode='contained'
							onPress={onPressAccept}
						>
							{expenseInfo ? 'Editar' : 'Crear'} Gasto
						</Button>

					</View>
					{
						loading && (
							<Loader loading={loading} />
						)
					}

				</View>

			</Modal>
		</Portal>


	);
};

const areEqual = (prevProps, nextProps) => {
	return prevProps.visible === nextProps.visible;
};

export default React.memo(AddExpense, areEqual);

/*
<TouchableWithoutFeedback onPress={onDismissKeyboard} touchSoundDisabled={true}>
</TouchableWithoutFeedback>


<DateButton
	date={expense.date}
	containerStyle={{ width: 150 }}
	onPress={() =>
		setExpense({ type: 'DATE', payload: { date: expense.date, dateVisible: true } })
	}
/>

{
	expense.dateVisible && (
		<DateSelector
			visible={expense.dateVisible}
			onHide={() => setExpense({ type: 'DATE', payload: { date: expense.date, dateVisible: false } })}
			onSelectedDate={(newDate) => setExpense({ type: 'DATE', payload: { date: newDate, dateVisible: false } })}
		/>
	)
}
*/