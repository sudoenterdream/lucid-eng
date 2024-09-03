import React, { useEffect, useRef, useState } from 'react';
import { noise } from '@chriscourses/perlin-noise';

const CELL_SIZE = 5;

const COLORS = [
  [250, 195, 243], // Bright sky blue, topmost layer
    [104,164,184], // Vivid cerulean blue, surface layer
    [66,107,138],  // Rich steel blue, mid-depth layer
    [28, 53, 92]    // Deep indigo blue, deepest layer
  ];
  const DEAD_COLOR = [29, 52, 97, 255]; // Deep, intense blue for "empty" water
  const DEPTH_COLOR = [10, 30, 60, 255]; // Darker blue with a bit more visibility for depth layers
  const LILY_PAD_COLOR = [60, 180, 80, 200]; // Lush green for lily pads
  const FLOWER_COLOR = [183, 195, 243, 220]; // Bright pastel pink for flowers
  const VINE_COLOR = [34, 139, 34, 180]; // Vibrant forest green for vines
  

const INITIAL_LIVE_PROBABILITIES = [0.03, 0.05, 0.08, 0.10];
const NOISE_SCALE = 0.05;
const LILY_PAD_THRESHOLD = 0.7;
const LILY_PAD_SIZE = 3; // Size of lily pad in cells (3x3 pixels)
const VINE_THRESHOLD = 0.8;
const FLOWER_THRESHOLD = 0.9;
const FLOWER_SIZE = 7; // Increased size of flower (7x7 pixels)

const SimulationView = () => {
  const canvasRef = useRef(null);
  const [grids, setGrids] = useState([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [plantLayer, setPlantLayer] = useState([]);

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

    // Initialize the grids with varying densities, including solid color layers
    setGrids(Array(COLORS.length * 2 - 1).fill().map((_, index) => 
      index % 2 === 0
        ? Array(cols).fill().map(() => Array(rows).fill().map(() => Math.random() < INITIAL_LIVE_PROBABILITIES[Math.floor(index / 2)]))
        : Array(cols).fill().map(() => Array(rows).fill(true))
    ));

    // Initialize plant layer (lily pads, vines, and flowers)
    const newPlantLayer = Array(cols).fill().map(() => Array(rows).fill(0));
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const noiseValue = noise(i * NOISE_SCALE, j * NOISE_SCALE);
        if (noiseValue > LILY_PAD_THRESHOLD) {
          // Create lily pad
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              const newI = (i + x + cols) % cols;
              const newJ = (j + y + rows) % rows;
              newPlantLayer[newI][newJ] = 1; // 1 represents lily pad
            }
          }
          // Add flower to the center of the lily pad
          if (Math.random() > 0.5) {
            newPlantLayer[i][j] = 4; // 4 represents flower on lily pad
          }
        } else if (noiseValue > VINE_THRESHOLD) {
          newPlantLayer[i][j] = 2; // 2 represents vine
          if (noiseValue > FLOWER_THRESHOLD) {
            newPlantLayer[i][j] = 3; // 3 represents flower
          }
        }
      }
    }
    setPlantLayer(newPlantLayer);

    const updateGrids = () => {
      setGrids(prevGrids => prevGrids.map((grid, index) => index % 2 === 0 ? updateSingleGrid(grid) : grid));
    };

    const updateSingleGrid = (prevGrid) => {
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
    };

    const renderGrids = () => {
      if (grids.length === 0 || grids[0].length === 0) {
        return;
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let finalColor = DEAD_COLOR;
          let alpha = 255;

          if (plantLayer[i][j] === 1) {
            finalColor = LILY_PAD_COLOR.slice(0, 3);
            alpha = LILY_PAD_COLOR[3];
          } else if (plantLayer[i][j] === 2) {
            finalColor = VINE_COLOR.slice(0, 3);
            alpha = VINE_COLOR[3];
          } else if (plantLayer[i][j] === 3) {
            finalColor = FLOWER_COLOR.slice(0, 3);
            alpha = FLOWER_COLOR[3];
          } else if (plantLayer[i][j] === 4) {
            // Render lily pad with flower
            finalColor = LILY_PAD_COLOR.slice(0, 3);
            alpha = LILY_PAD_COLOR[3];
            
            // Draw larger flower
            const flowerPixels = [
              [-3, 0], [-2, -1], [-2, 0], [-2, 1], [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2],
              [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3],
              [1, -2], [1, -1], [1, 0], [1, 1], [1, 2],
              [2, -1], [2, 0], [2, 1], [3, 0]
            ];
            for (const [dx, dy] of flowerPixels) {
              const pixelIndex = ((j * CELL_SIZE + dy) * canvas.width + (i * CELL_SIZE + dx)) * 4;
              data[pixelIndex] = FLOWER_COLOR[0];
              data[pixelIndex + 1] = FLOWER_COLOR[1];
              data[pixelIndex + 2] = FLOWER_COLOR[2];
              data[pixelIndex + 3] = FLOWER_COLOR[3];
            }
          } else {
            for (let layer = 0; layer < grids.length; layer++) {
              if (layer % 2 === 0 && grids[layer][i][j]) {
                const baseColor = COLORS[Math.floor(layer / 2)];
                finalColor = baseColor.slice(0, 3);
                alpha = baseColor[3];
                break;
              } else if (layer % 2 !== 0) {
                // Apply depth effect
                finalColor = finalColor.map((c, index) => 
                  Math.max(0, c - DEPTH_COLOR[index])
                );
                alpha = Math.max(0, alpha - (255 - DEPTH_COLOR[3]));
              }
            }
          }

          const index = (j * CELL_SIZE * canvas.width + i * CELL_SIZE) * 4;
          for (let x = 0; x < CELL_SIZE; x++) {
            for (let y = 0; y < CELL_SIZE; y++) {
              const pixelIndex = index + (y * canvas.width + x) * 4;
              if (plantLayer[i][j] !== 4 || (Math.abs(x - 3) > 3 || Math.abs(y - 3) > 3)) {
                data[pixelIndex] = finalColor[0];
                data[pixelIndex + 1] = finalColor[1];
                data[pixelIndex + 2] = finalColor[2];
                data[pixelIndex + 3] = alpha;
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const simulate = () => {
      updateGrids();
      renderGrids();
      const simulationId = requestAnimationFrame(simulate);
      return simulationId;
    };

    const simulationId = requestAnimationFrame(simulate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(simulationId);
    };
  }, [cols, rows]);

  // Update the separate useEffect for grid updates
  useEffect(() => {
    if (grids.length > 0 && grids[0].length > 0 && plantLayer.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const renderGrids = () => {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let finalColor = DEAD_COLOR;
            let alpha = 255;

            if (plantLayer[i][j] === 1) {
              finalColor = LILY_PAD_COLOR.slice(0, 3);
              alpha = LILY_PAD_COLOR[3];
            } else if (plantLayer[i][j] === 2) {
              finalColor = VINE_COLOR.slice(0, 3);
              alpha = VINE_COLOR[3];
            } else if (plantLayer[i][j] === 3) {
              finalColor = FLOWER_COLOR.slice(0, 3);
              alpha = FLOWER_COLOR[3];
            } else if (plantLayer[i][j] === 4) {
              finalColor = LILY_PAD_COLOR.slice(0, 3);
              alpha = LILY_PAD_COLOR[3];
              
              // Draw larger flower
              const flowerPixels = [
                [-3, 0], [-2, -1], [-2, 0], [-2, 1], [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2],
                [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3],
                [1, -2], [1, -1], [1, 0], [1, 1], [1, 2],
                [2, -1], [2, 0], [2, 1], [3, 0]
              ];
              for (const [dx, dy] of flowerPixels) {
                const pixelIndex = ((j * CELL_SIZE + dy) * canvas.width + (i * CELL_SIZE + dx)) * 4;
                data[pixelIndex] = FLOWER_COLOR[0];
                data[pixelIndex + 1] = FLOWER_COLOR[1];
                data[pixelIndex + 2] = FLOWER_COLOR[2];
                data[pixelIndex + 3] = FLOWER_COLOR[3];
              }
            } else {
              let isDepthLayer = false;

              for (let layer = 0; layer < grids.length; layer++) {
                if (layer % 2 === 0 && grids[layer][i][j]) {
                  finalColor = COLORS[Math.floor(layer / 2)];
                  break;
                } else if (layer % 2 !== 0) {
                  isDepthLayer = true;
                  finalColor = DEPTH_COLOR;
                }
              }

              alpha = isDepthLayer ? DEPTH_COLOR[3] : 255;
            }

            const index = (j * CELL_SIZE * canvas.width + i * CELL_SIZE) * 4;
            for (let x = 0; x < CELL_SIZE; x++) {
              for (let y = 0; y < CELL_SIZE; y++) {
                const pixelIndex = index + (y * canvas.width + x) * 4;
                if (plantLayer[i][j] !== 4 || (Math.abs(x - 3) > 3 || Math.abs(y - 3) > 3)) {
                  data[pixelIndex] = finalColor[0];
                  data[pixelIndex + 1] = finalColor[1];
                  data[pixelIndex + 2] = finalColor[2];
                  data[pixelIndex + 3] = alpha;
                }
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      };

      renderGrids();
    }
  }, [grids, plantLayer, cols, rows]);

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
        backgroundColor: 'rgb(0, 0, 50)' // Dark blue background
      }}
    />
  );
};

export default SimulationView;