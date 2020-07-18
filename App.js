/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';

import Routes from './src/index';
import configureStore from './src/store';

const {persistor, store} = configureStore();

import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
