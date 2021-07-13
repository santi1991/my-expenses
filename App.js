import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContainer from './src/views/core/AppContainer';

import AppProvider from './src/utilities/context/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <>
        <StatusBar style="auto" />
        <AppContainer />
      </>
    </AppProvider>
  );
};

export default App;

