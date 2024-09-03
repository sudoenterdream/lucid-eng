import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import SimulationView from './components/SimulationView';

function App() {
  return (
    <div className="App">
            <SimulationView />

      <HomePage />
    </div>
  );
}

export default App;
