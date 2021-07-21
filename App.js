import React from 'react';
import { StatusBar } from 'react-native';
import AppContainer from './src/views/core/AppContainer';

import AppProvider from './src/utilities/context/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <>
        <StatusBar barStyle='light-content' animated={true} />
        <AppContainer />
      </>
    </AppProvider>
  );
};

export default App;

