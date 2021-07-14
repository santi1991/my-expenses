import React, { createContext, useReducer } from 'react';
import * as Reducer from './Reducers';
import * as InitialState from './InitialStates';

const AppContext = createContext();


const AppProvider = ({ children }) => {

	const [authState, setAuthState] = useReducer(Reducer.authState, InitialState.authState);
	const [expensesGroup, setExpensesGroup] = useReducer(Reducer.expensesGroup, InitialState.expensesGroup);

	return (
		<AppContext.Provider
			value={{	
				authState,
				setAuthState,										
				expensesGroup,
				setExpensesGroup,							
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
export { AppContext };