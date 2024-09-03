import React, { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 5;
const ALIVE_COLOR = [255, 255, 255]; // White color
const DEAD_COLOR = [0, 0, 0]; // Black color

const SimulationView = () => {
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCols(Math.floor(canvas.width / CELL_SIZE));
      setRows(Math.floor(canvas.height / CELL_SIZE));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize the grid
    setGrid(Array(cols).fill().map(() => Array(rows).fill().map(() => Math.random() > 0.5)));

    const updateGrid = () => {
      setGrid(prevGrid => {
        if (prevGrid.length === 0 || prevGrid[0].length === 0) {
          return prevGrid;
        }

        const next = prevGrid.map(arr => [...arr]);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const state = prevGrid[i][j];
            let neighbors = 0;

            // Count neighbors (including wrapping)
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;
                const col = (i + x + cols) % cols;
                const row = (j + y + rows) % rows;
                neighbors += prevGrid[col][row] ? 1 : 0;
              }
            }

            // Apply Conway's Game of Life rules
            if (state && (neighbors < 2 || neighbors > 3)) {
              next[i][j] = false;
            } else if (!state && neighbors === 3) {
              next[i][j] = true;
            }
          }
        }

        return next;
      });
    };

    const renderGrid = () => {
      if (grid.length === 0 || grid[0].length === 0) {
        return;
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const color = grid[i][j] ? ALIVE_COLOR : DEAD_COLOR;
          const index = (j * CELL_SIZE * canvas.width + i * CELL_SIZE) * 4;
          for (let x = 0; x < CELL_SIZE; x++) {
            for (let y = 0; y < CELL_SIZE; y++) {
              const pixelIndex = index + (y * canvas.width + x) * 4;
              data[pixelIndex] = color[0];
              data[pixelIndex + 1] = color[1];
              data[pixelIndex + 2] = color[2];
              data[pixelIndex + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const simulate = () => {
      updateGrid();
      renderGrid();
      const simulationId = requestAnimationFrame(simulate);
      return simulationId;
    };

    const simulationId = requestAnimationFrame(simulate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(simulationId);
    };
  }, [cols, rows]);

  // Add a separate useEffect for grid updates
  useEffect(() => {
    if (grid.length > 0 && grid[0].length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const renderGrid = () => {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const color = grid[i][j] ? ALIVE_COLOR : DEAD_COLOR;
            const index = (j * CELL_SIZE * canvas.width + i * CELL_SIZE) * 4;
            for (let x = 0; x < CELL_SIZE; x++) {
              for (let y = 0; y < CELL_SIZE; y++) {
                const pixelIndex = index + (y * canvas.width + x) * 4;
                data[pixelIndex] = color[0];
                data[pixelIndex + 1] = color[1];
                data[pixelIndex + 2] = color[2];
                data[pixelIndex + 3] = 255;
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      };

      renderGrid();
    }
  }, [grid, cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: 'black'
      }}
    />
  );
};

export default SimulationView;
