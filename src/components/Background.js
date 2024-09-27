// src/components/Background.js
import React, { useRef, useEffect } from 'react';
import { gameOfLife } from '../gameOfLife';

function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    gameOfLife(canvas);
  }, []);

  return <canvas id="background" ref={canvasRef}></canvas>;
}

export default Background;
