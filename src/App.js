import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import SimulationView from './components/SimulationView';

function App() {
  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <SimulationView />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 50, 0.2)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <HomePage />
    </div>
  );
}

export default App;
