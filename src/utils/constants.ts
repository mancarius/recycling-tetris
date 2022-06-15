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
  rows: 20,
  columns: 10,
};
Object.freeze(GRID_SIZE);

export { SHAPES, COLORS, GRID_SIZE };
