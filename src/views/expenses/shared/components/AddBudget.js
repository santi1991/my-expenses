import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Portal, Modal, Subheading, Avatar, Title, Button, ProgressBar, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../../../utilities/context/AppProvider';
import { randomInteger } from '../../../../utilities/commons/Utils';
import Loader from '../../../../utilities/components/Loader';
import CurrencyInput from '../../../../utilities/components/CurrencyInput';
import { styles } from '../../../../utilities/commons/Styles';




const AddBudget = ({ visible, onHideModal, category }) => {

	// console.log('render: A D D   B U D G E T');
	// console.log(category);
	const { setExpensesGroup } = useContext(AppContext);

	const [budget, setBudget] = useState(0);
	const [loading, setLoading] = useState(false);


	const setProgress = () => {
		let barProgress = 0;
		let labelProgress = '0%';
		let iconBell = 'bell-remove-outline';
		let alert = false;

		if (budget > category?.value) {
			barProgress = category?.value / budget;
			labelProgress = `${(barProgress * 100).toFixed(1)}%`;
			alert = true;
			iconBell = 'bell-check';
		}
		return { barProgress, labelProgress, alert, iconBell };
	};

	const startBudgetOperation = () => {
		const budgetFields = {
			category_id: category.id,
			budget: budget,
		};
		//if there is a budget_id it means the user is updating an existing budget
		if (category.budget_id !== null) {
			budgetFields.id = category.budget_id;
			return callUpdateBudget(budgetFields);
		}
		else {
			return callPutBudget(budgetFields);
		}
	};

	const callPutBudget = async (budgetFields) => {
		// const selectedCategory = refCategoryData.current;
		setLoading(true);
		// putBudget(budgetFields)
		// 	.then((newBudget) => {
		// 		const updatedCategory = {
		// 			...category,
		// 			budget_id: newBudget.id,
		// 			budget: newBudget.budget,
		// 			alert: true
		// 		};
		// 		return setExpensesGroup({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
		// 		// return updateCategoryExpenses(updatedCategory);
		// 	})
		// 	.catch((error) => {
		// 		alert('error' + JSON.stringify(error));
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 		handleOnDismiss();
		// 	});
		const updatedCategory = {
			...category,
			budget_id: randomInteger(1, 999),
			budget: budget,
			alert: true
		};
		setExpensesGroup({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
		setTimeout(() => {
			setLoading(false);
			handleOnDismiss();
		}, 1500);
	};

	const callUpdateBudget = async (budgetFields) => {
		setLoading(true);
		// updateBudget(budgetFields)
		// 	.then(() => {
		// 		// when updating -> the succesfull response from KNEX is 1, not returning the data				
		// 		const updatedCategory = {
		// 			...category,
		// 			budget_id: budgetFields.id,
		// 			budget: budgetFields.budget,
		// 			alert: true
		// 		};
		// 		return setExpensesGroup({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
		// 		// return updateCategoryExpenses(updatedCategory);

		// 	})
		// 	.catch((error) => {
		// 		alert('error' + JSON.stringify(error));
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 		handleOnDismiss();
		// 	});
		const updatedCategory = {
			...category,
			budget_id: budgetFields.id,
			budget: budgetFields.budget,
			alert: true
		};
		setExpensesGroup({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
		setTimeout(() => {
			setLoading(false);
			handleOnDismiss();
		}, 1500);
	};

	const handleOnDismiss = () => {
		setBudget(0);
		return onHideModal();
	};

	useEffect(() => {
		if (category) {
			setBudget(category.budget);
		}
	}, [category]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleOnDismiss}
				contentContainerStyle={styles.modalContainer}
			>
				<View>

					<View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>

						<Avatar.Icon
							theme={{ colors: { primary: category?.color } }}
							style={{ borderWidth: 1, borderColor: 'black', marginRight: 15 }}
							size={50}
							icon={category?.icon}
						/>
						<Title style={{ width: 230, letterSpacing: 1 }} >{category?.name.toUpperCase()} </Title>


						<MaterialCommunityIcons
							name={setProgress().iconBell}
							size={32}
							color='black'
						/>

					</View>

					<Divider inset={true} style={{ height: 1.5 }} />


					<View style={styles.modalPairContainer}>

						<Subheading style={styles.subheading}>Gasto Actual</Subheading>

						<CurrencyInput
							value={category?.value}
							inputContainer={styles.input}
							editable={false}
						/>

					</View>

					<View style={styles.modalPairContainer}>

						<Subheading style={styles.subheading}>Presupuesto</Subheading>

						<CurrencyInput
							value={budget}
							inputContainer={styles.input}
							onChangeNumber={setBudget}
							placeholder={'0.0...'}
						// onChange={onRefChange}
						/>

					</View>

					<ProgressBar
						// visible={true}
						progress={setProgress().barProgress}
						color={category?.second_color}
						style={{
							marginTop: 10,
							marginBottom: 6,
							height: 8
						}}
					/>
					<Subheading style={{ textAlign: 'center' }} >
						Progreso Presupuesto:{' '}
						<Title>{setProgress().labelProgress}</Title>

					</Subheading>

					<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 }} >

						<Button
							mode='contained'
							onPress={handleOnDismiss}
							color='#546E7A'
						>
							Cancelar
						</Button>
						<Button
							disabled={!setProgress().alert}
							mode='contained'
							onPress={startBudgetOperation}
						>
							Guardar
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

export default React.memo(AddBudget, areEqual);


