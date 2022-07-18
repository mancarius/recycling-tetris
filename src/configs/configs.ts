const SHAPES = [
  [],
  [
    { y: 2, x: 0 },
    { y: 1, x: 0 },
    { y: 0, x: 0 },
    { y: -1, x: 0 },
  ],
  [
    { y: 0, x: 1 },
    { y: 1, x: 0 },
    { y: 0, x: 0 },
    { y: -1, x: 0 },
  ],
  [
    { y: 1, x: 1 },
    { y: 1, x: 0 },
    { y: 0, x: 0 },
    { y: -1, x: 0 },
  ],
];
Object.freeze(SHAPES);

const COLORS = ["transparent", "cyan", "blue", "orange", "yellow", "green", "purple", "red"];
Object.freeze(COLORS);

const GRID_SIZE = {
  rows: 15,
  columns: 20,
};
Object.freeze(GRID_SIZE);

/**
 * The tetromino's moving speed on long key press in milliseconds
 */
const MOVING_SPEED_TIME_INTERVAL = 70;

/**
 * Default tetromino's falling delay in milliseconds
 */
const DEFAULT_TETROMINO_FALLING_DELAY = 1000;

export { SHAPES, COLORS, GRID_SIZE, MOVING_SPEED_TIME_INTERVAL, DEFAULT_TETROMINO_FALLING_DELAY };
