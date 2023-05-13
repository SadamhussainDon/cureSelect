import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/Navigation/Navigation';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import patientReducer from './src/reducer/patientReducer';
const rootReducer = combineReducers({
  patient: patientReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));


function App() {
  return (
    <Provider store={store}>
        <Navigation />
      </Provider>
  );
}

export default App;

