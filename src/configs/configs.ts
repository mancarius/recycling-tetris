import { DeviceScreen } from "@enum/DeviceScreen.enum";

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
  [DeviceScreen.desktop]: {
    rows: 15,
    columns: 20,
  },
  [DeviceScreen.tablet]: {
    rows: 20,
    columns: 15,
  },
  [DeviceScreen.mobile]: {
    rows: "auto",
    columns: 12,
  }
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

/**
 * Next level countdown time interval
 */
const LEVEL_COUNTDOWN_INTERVAL = 1000 * 60 * 1;

/**
 * Image to use for grid background
 */
const GRID_BACKGROUND_IMAGE = "underwater.jpg";

/**
 * Screen breakpoints in px for 960 grids
 */
const SCREEN_BREAKPOINTS = {
  mobile: {
    max: 481
  },
  tablet: {
    min: 482,
    max: 961
  },
  desktop: {
    min: 962
  }
}
Object.freeze(SCREEN_BREAKPOINTS);

export {
  SHAPES,
  COLORS,
  GRID_SIZE,
  MOVING_SPEED_TIME_INTERVAL,
  GRID_BACKGROUND_IMAGE,
  DEFAULT_TETROMINO_FALLING_DELAY,
  LEVEL_COUNTDOWN_INTERVAL,
  SCREEN_BREAKPOINTS
};
