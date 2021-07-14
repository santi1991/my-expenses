import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { Button } from 'react-native-paper';
import { utcMsToLocalString, firstAndLastDayCurrentMonth } from '../commons/Utils';

//date, onConfirm -> REQUIRED

const SingleDatePicker = ({ date, onConfirm, birthdate, containerStyle }) => {

	const currentDate = birthdate ? new Date(2016, 1, 2) : new Date();
	const { firstDay, lastDay } = firstAndLastDayCurrentMonth();
	const [open, setOpen] = useState(false);

	const onDismissSingle = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirmSingle = useCallback((params) => {
		// console.log(params.date); //Date object
		// console.log(params.date.getTime());  //Date ms
		setOpen(false);
		return onConfirm(params.date.getTime());
	}, [setOpen, onConfirm]);

	return (
		<>
			<Button
				theme={{ roundness: 3 }}
				color='white'
				onPress={() => setOpen(true)}
				uppercase={false}
				mode='contained'
				style={[localStyles.buttonContainer, containerStyle]}
				labelStyle={{ marginTop: 7 }}
			>
				{date === null ? '-- / -- / --' : utcMsToLocalString(date)}
			</Button>


			<DatePickerModal
				// locale={'en'} optional, default: automatic
				mode='single'
				visible={open}
				onDismiss={onDismissSingle}
				date={currentDate}
				onConfirm={onConfirmSingle}
				validRange={{
					startDate: birthdate ? new Date(1920, 1, 2) : firstDay,  // optional
					endDate: birthdate ? new Date(2016, 1, 2) : lastDay, // optional
				}}
				// onChange={} // same props as onConfirm but triggered without confirmed by user
				saveLabel='Aceptar' // optional
				label='Seleccionar Fecha' // optional
				// animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web				
			/>


		</>
	);
};

const areEqual = (prevProps, nextProps) => {
	return prevProps.date === nextProps.date;
};

export default React.memo(SingleDatePicker, areEqual);


const localStyles = StyleSheet.create({
	buttonContainer: {
		height: 36,
		width: 140,
		borderColor: 'grey',
		borderWidth: 0.4
	},
});

