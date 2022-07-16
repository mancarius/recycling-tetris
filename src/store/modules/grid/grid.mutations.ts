import GridState from "@/@types/grid.interface";
import State from "@/@types/state.interface";
import { GRID_SIZE } from "@/configs/configs";
import { createGrid } from "@/services/grid.service";
import Mutations from "@/utils/enums/Mutations";
import { MutationTree } from "vuex";

const mutations: MutationTree<State["grid"]> = {
  /**
   * @description Set grid's cells
   */
  [Mutations.GRID_RENDER](state, grid: GridState["grid"]): void {
    state.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        state.grid[y][x] = grid[y][x];
      });
    });
  },

  /**
   * @description Set the grid fullness state
   */
  [Mutations.GRID_IS_FULL](state, isFull: GridState["isFull"] = true): void {
    state.isFull = isFull;
  },

  /**
   * @description Add tetromino's id to spawned list
   */
  [Mutations.GRID_ADD_TETROMINO](state, key: string): void {
    state.tetrominos.push(key);
  },

  /**
   * @description Init grid properties
   */
  [Mutations.GRID_RESET](state): void {
    state.grid = createGrid(GRID_SIZE);
    state.isFull = false;
    state.tetrominos = [];
  },
};

export default mutations;
