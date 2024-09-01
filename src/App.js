import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [time, setTime] = useState(0);
  const fractalColors = ['#ffffff', '#4169E1', '#8A2BE2']; // White, Royal Blue, and Blue Violet
  const depth = 12; // Depth for complex fractal

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    const timer = setInterval(() => {
      setTime(prevTime => (prevTime + 1) % 100);
    }, 50);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const createDragonCurve = (level) => {
    if (level === 0) return 'F';
    const prev = createDragonCurve(level - 1);
    return prev + 'R' + prev.split('').reverse().join('').replace(/L/g, 'T').replace(/R/g, 'L').replace(/T/g, 'R');
  };

  const renderDragonCurve = (curve, offset = 0) => {
    let x = 0;
    let y = 0;
    let direction = 0;
    const path = [];

    curve.split('').forEach((char, index) => {
      if (char === 'F') {
        const newX = x + Math.cos(direction);
        const newY = y + Math.sin(direction);
        const colorIndex = index % fractalColors.length;
        const opacity = Math.sin((time + index + offset) * 0.1) * 0.5 + 0.5;
        path.push(<line key={`${offset}-${path.length}`} x1={x} y1={y} x2={newX} y2={newY} stroke={fractalColors[colorIndex]} strokeWidth="0.1" opacity={opacity} />);
        x = newX;
        y = newY;
      } else if (char === 'R') {
        direction += Math.PI / 2;
      } else if (char === 'L') {
        direction -= Math.PI / 2;
      }
    });

    return path;
  };

  const dragonCurve1 = createDragonCurve(depth);
  const dragonCurve2 = createDragonCurve(depth);
  const dragonPath1 = renderDragonCurve(dragonCurve1);
  const dragonPath2 = renderDragonCurve(dragonCurve2, 50); // Offset to create different animation timing

  const glowingTextStyle = {
    color: '#ffffff',
    textShadow: '0 0 5px #ffffff',
    animation: 'subtleGlowingEffect 4s linear infinite',
  };

  const linkStyle = {
    display: 'inline-block',
    margin: '0 15px',
    padding: '10px 20px',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease',
  };

  return (
    <div className="App" style={{ 
      background: 'radial-gradient(circle at center, #001f3f, #0074D9, #7FDBFF)',
      backgroundSize: '400% 400%',
      animation: 'breathingBG 15s ease infinite'
    }}>
      <svg className="fractal-background" width={windowSize.width} height={windowSize.height} viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(-25, 0) scale(0.7)">{dragonPath1}</g>
        <g transform="translate(25, 0) scale(0.7) rotate(180)">{dragonPath2}</g>
      </svg>
      <div className="content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> {/* Centered */}
        <h1 style={glowingTextStyle}>Welcome to the Lucid Valley</h1>
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <a href="/about" style={linkStyle}>About</a>
        <a href="/projects" style={linkStyle}>Projects</a>
        <a href="/writings" style={linkStyle}>Writings</a>
      </div>
      <style>
        {`
          @keyframes subtleGlowingEffect {
            0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
            50% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }
          }
          a:hover {
            border-bottom: 2px solid #ffffff;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          }
          @keyframes breathingBG {
            0%, 100% { background-color: #001f3f; }
            25% { background-color: #0074D9; }
            50% { background-color: #7FDBFF; }
            75% { background-color: #0074D9; }
          }
          .App::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, transparent 0%, rgba(0, 31, 63, 0.8) 100%),
                        radial-gradient(circle at 20% 20%, rgba(0, 116, 217, 0.5) 0%, transparent 30%),
                        radial-gradient(circle at 80% 80%, rgba(127, 219, 255, 0.5) 0%, transparent 30%),
                        radial-gradient(circle at 50% 50%, rgba(0, 181, 255, 0.5) 0%, transparent 30%);
            mix-blend-mode: screen;
            animation: breathePatch 10s ease-in-out infinite alternate;
          }
          @keyframes breathePatch {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
