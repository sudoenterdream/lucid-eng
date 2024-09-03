import React from 'react';
import SimulationView from '../components/SimulationView';

function HomePage() {
  const glowingTextStyle = {
    color: '#ffffff',
    textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00',
    fontSize: '2em',
    fontWeight: 'bold',
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '1.2em',
  };

  return (
    <div style={{ 
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <SimulationView />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h1 style={glowingTextStyle}>Welcome to Lucid Valley</h1>
          <nav>
            <a href="#about" style={linkStyle}>About</a>
            <a href="#projects" style={linkStyle}>Projects</a>
            <a href="#writings" style={linkStyle}>Writings</a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default HomePage;