import { createGrid } from "@/services/grid.service";
import State from "@/@types/state.interface";
import { GRID_SIZE } from "@/configs/configs";

const state = (): State["grid"] => ({
  grid: createGrid(GRID_SIZE),
  isFull: false,
  tetrominos: [],
});

export default state;
