import React from 'react';
import './App.css';
import MainScreen from './MainScreen'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>iSentiment Stock Analysis</h1>
      </header>
      <div id="app-body">
        <MainScreen id="main-screen"/>
      </div>
    </div>
  );
}

export default App;
