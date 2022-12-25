import GridState from "@type/grid.interface";
import State from "@type/state.interface";
import { createGrid } from "@service/grid.service";
import Mutations from "@enum/Mutations";
import { MutationTree } from "vuex";


const mutations: MutationTree<State["grid"]> = {
  /** Set grid's cells */
  [Mutations.GRID_RENDER](state, grid: GridState["grid"]): void {
    state.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        state.grid[y][x] = grid[y][x];
      });
    });
  },

  /** Set the grid fullness state */
  [Mutations.GRID_IS_FULL](state, isFull: GridState["isFull"] = true): void {
    state.isFull = isFull;
  },

  /** Add tetromino's id to spawned list */
  [Mutations.GRID_ADD_TETROMINO](state, key: string): void {
    state.tetrominos.push(key);
  },

  /** Init grid properties */
  [Mutations.GRID_RESET](state, payload: { rows: number, columns: number }): void {
    state.grid = createGrid(payload);
    state.isFull = false;
    state.tetrominos = [];
  },
};

export default mutations;
