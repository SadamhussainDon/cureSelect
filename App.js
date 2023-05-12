import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/Navigation/Navigation';

export class App extends Component {
  render() {
    return (
      // <Provider>
      //   <Navigation />
      // </Provider>
      <Navigation />
    );
  }
}

export default App;
