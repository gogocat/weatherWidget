import React, { Component } from 'react';
import './App.css';

import WeatherWidget from './components/weatherWidget/weatherWidget';

class App extends Component {
  render() {
    return (
      <div className="app">
        <WeatherWidget/>
      </div>
    );
  }
}

export default App;
