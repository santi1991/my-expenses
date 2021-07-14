import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { utcMsToLocalString, firstAndLastDayCurrentMonth } from '../commons/Utils';
import { DatePickerModal } from 'react-native-paper-dates';

const RangeDatePicker = ({ startDate, endDate, onConfirm, containerStyle }) => {

	const { firstDay, lastDay } = firstAndLastDayCurrentMonth();

	// const initialState = { 
	// 	startDate: null,
	// 	endDate: null
	// };
	// const [range, setRange] = useState(initialState);
	
	const [open, setOpen] = useState(false);

	const onDismiss = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirmRange = useCallback(({ startDate, endDate }) => {
		setOpen(false);
		onConfirm(startDate.getTime(), endDate.getTime());
		// setRange(prevState => ({
		// 	...prevState,
		// 	startDate: startDate,
		// 	endDate: endDate
		// }));
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
				{
					`${startDate === null ? '-- / -- / -- ' : utcMsToLocalString(startDate)}` + 
					` -> ` + 
					`${endDate === null ? ' -- / -- / --' : utcMsToLocalString(endDate)}`
				}
				
			</Button>
			{
				open && (
					<DatePickerModal
                        // locale={'en'} optional, default: automatic
						mode='range'
						visible={open}
						onDismiss={onDismiss}
						startDate={firstDay}
						endDate={lastDay}
						onConfirm={onConfirmRange}
                        // validRange={{
                        //   startDate: new Date(2021, 1, 2),  // optional
                        //   endDate: new Date(), // optional
                        // }}
                        // onChange={} // same props as onConfirm but triggered without confirmed by user
                        // locale={'nl'} // optional
						saveLabel='Aceptar' // optional
						label='Selecciona el Periodo' // optional
						startLabel='Desde' // optional
						endLabel='Hasta' // optional
                        // animationType="slide" // optional, default is slide on ios/android and none on web
					/>
				)
			}
		</>
	);
};

const areEqual = (prevProps, nextProps) => {	
	return prevProps.startDate === nextProps.startDate && prevProps.endDate === nextProps.endDate;
};

export default React.memo(RangeDatePicker, areEqual);

const localStyles = StyleSheet.create({
	buttonContainer: {
		height: 36,
		width: 160,
		borderColor: 'grey',
		borderWidth: 0.5
	},
});