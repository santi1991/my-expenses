export const randomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const utcDateConstructor = (year, month, day, hours, minutes, seconds) => {
	// the month is 0-indexed --> 0-11	
	return new Date(year, month, day, hours, minutes, seconds); // return date object
};

/**
 * 
 */
export const utcDateToUtcString = (utcDate) => {
	return utcDate.toISOString();
};

/**
 * 
 */
export const utcMsToLocalString = (utcDateMs) => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return new Date(utcDateMs).toLocaleString('es-CO', options);
};

/**
 * 
 */
export const utcMsToUtcString = (utcDateMs) => {
	return new Date(utcDateMs).toISOString();
};

/**
 * 
 */
export const firstAndLastDayOfMonth = (year, month) => {
	const firstDay = utcDateConstructor(year, month - 1, 1);
	const lastDay = utcDateConstructor(year, month, 0);
	return {
		firstDay: utcDateToUtcString(firstDay),
		lastDay: utcDateToUtcString(lastDay)
	};
};

/**
 * 
 */
export const firstAndLastDayCurrentMonth = () => {
	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
	return { firstDay, lastDay };
};