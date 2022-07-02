import GridState from "@/@types/grid.interface";
import State from "@/@types/state.interface";
import { createGrid } from "@/services/grid.service";
import Mutations from "@/utils/enums/Mutations";
import { MutationTree } from "vuex";

const mutations: MutationTree<State["grid"]> = {
  /**
   * Set grid's cells
   *
   * @param state
   * @param grid
   */
  [Mutations.GRID_RENDER](state, grid: GridState["grid"]): void {
    state.grid = grid;
  },

  /**
   * Set the grid fullness state
   *
   * @param state
   * @param isFull - Pass true if every row is full, else false
   */
  [Mutations.GRID_IS_FULL](state, isFull: GridState["isFull"] = true): void {
    state.isFull = isFull;
  },

  /**
   * Add tetromino's id to spawned list
   *
   * @param state
   * @param key
   */
  [Mutations.GRID_ADD_TETROMINO](state, key: string): void {
    state.tetrominos.push(key);
  },


  /**
   * Init grid properties
   *
   * @param state
   */
  [Mutations.GRID_RESET](state): void {
    state.grid = createGrid({});
    state.isFull = false;
    state.tetrominos = [];
  },
};

export default mutations;
