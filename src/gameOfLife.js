// src/gameOfLife.js

export function gameOfLife(canvas) {
    const ctx = canvas.getContext('2d');
  
    // Game settings
    const cellSize = 8; // Size of each cell
    let cols = Math.floor(canvas.width / cellSize);
    let rows = Math.floor(canvas.height / cellSize);
    let grid = [];
  
    // Resize canvas and reset grid on window resize
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / cellSize);
      rows = Math.floor(canvas.height / cellSize);
      grid = createGrid();
    }
  
    window.addEventListener('resize', resizeCanvas);
  
    // Initialize the grid
    function createGrid() {
      const arr = [];
      for (let x = 0; x < cols; x++) {
        arr[x] = [];
        for (let y = 0; y < rows; y++) {
          arr[x][y] = Math.random() > 0.9 ? 1 : 0; // Randomly alive or dead
        }
      }
      return arr;
    }
  
    // Draw the grid with pale color for the dots
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if (grid[x][y]) {
            ctx.beginPath();
            ctx.arc(
              x * cellSize + cellSize / 2,
              y * cellSize + cellSize / 2,
              cellSize / 2 - 1,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = 'rgba(125, 125, 125, 0.2)'; // Very pale gray color (RGBA format)
            ctx.fill();
          }
        }
      }
    }
  
    // Compute the next generation
    function updateGrid() {
      const nextGen = [];
      for (let x = 0; x < cols; x++) {
        nextGen[x] = [];
        for (let y = 0; y < rows; y++) {
          const neighbors = countNeighbors(grid, x, y);
          if (grid[x][y] === 1 && (neighbors === 2 || neighbors === 3)) {
            nextGen[x][y] = 1;
          } else if (grid[x][y] === 0 && neighbors === 3) {
            nextGen[x][y] = 1;
          } else {
            nextGen[x][y] = 0;
          }
        }
      }
      grid = nextGen;
    }
  
    // Count the live neighbors of a cell
    function countNeighbors(grid, x, y) {
      let sum = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const col = (x + i + cols) % cols;
          const row = (y + j + rows) % rows;
          sum += grid[col][row];
        }
      }
      sum -= grid[x][y];
      return sum;
    }
  
    // Animation loop
    function animate() {
      drawGrid();
      updateGrid();
      requestAnimationFrame(animate);
    }
  
    resizeCanvas(); // Initial canvas setup
    grid = createGrid();
    animate();
  }
  