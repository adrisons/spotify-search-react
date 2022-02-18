import React from 'react';
import './App.scss';
import { Authorization } from './components/authorization/Authorization';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Authorization />
        
      </header>
    </div>
  );
}

export default App;
