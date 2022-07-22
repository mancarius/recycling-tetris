import { createGrid } from "@service/grid.service";
import State from "@type/state.interface";
import { GRID_SIZE } from "@config";

const state = (): State["grid"] => ({
  grid: createGrid(GRID_SIZE),
  isFull: false,
  tetrominos: [],
});

export default state;
