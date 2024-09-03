// const CELL_SIZE = 5;
// const ALIVE_COLOR = [255, 255, 255]; // White color
// const DEAD_COLOR = [0, 0, 0]; // Black color

// export const initializeGameOfLife = (windowSize) => {
//     const cols = Math.floor(windowSize.width / CELL_SIZE);
//     const rows = Math.floor(windowSize.height / CELL_SIZE);
//     const grid = Array(cols).fill().map(() => Array(rows).fill().map(() => Math.random() > 0.5));
//     return { grid, cols, rows };
// };

// export const updateGameOfLife = (grid, cols, rows) => {
//     const next = grid.map(arr => [...arr]);

//     for (let i = 0; i < cols; i++) {
//         for (let j = 0; j < rows; j++) {
//             const state = grid[i][j];
//             let neighbors = 0;

//             // Count neighbors (including wrapping)
//             for (let x = -1; x <= 1; x++) {
//                 for (let y = -1; y <= 1; y++) {
//                     if (x === 0 && y === 0) continue;
//                     const col = (i + x + cols) % cols;
//                     const row = (j + y + rows) % rows;
//                     neighbors += grid[col][row] ? 1 : 0;
//                 }
//             }

//             // Apply Conway's Game of Life rules
//             if (state && (neighbors < 2 || neighbors > 3)) {
//                 next[i][j] = false;
//             } else if (!state && neighbors === 3) {
//                 next[i][j] = true;
//             }
//         }
//     }

//     return next;
// };

// export const renderGameOfLife = (grid, cols, rows) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = cols * CELL_SIZE;
//     canvas.height = rows * CELL_SIZE;

//     const imageData = ctx.createImageData(canvas.width, canvas.height);
//     const data = imageData.data;

//     for (let i = 0; i < cols; i++) {
//         for (let j = 0; j < rows; j++) {
//             const color = grid[i][j] ? ALIVE_COLOR : DEAD_COLOR;
//             const index = (j * CELL_SIZE * canvas.width + i * CELL_SIZE) * 4;
//             for (let x = 0; x < CELL_SIZE; x++) {
//                 for (let y = 0; y < CELL_SIZE; y++) {
//                     const pixelIndex = index + (y * canvas.width + x) * 4;
//                     data[pixelIndex] = color[0];
//                     data[pixelIndex + 1] = color[1];
//                     data[pixelIndex + 2] = color[2];
//                     data[pixelIndex + 3] = 255;
//                 }
//             }
//         }
//     }

//     ctx.putImageData(imageData, 0, 0);
//     return canvas.toDataURL();
// };

// // Keep the original function for backwards compatibility
// export const generateMossyStoneTexture = (windowSize) => {
//     const { grid, cols, rows } = initializeGameOfLife(windowSize);
//     return renderGameOfLife(grid, cols, rows);
// };