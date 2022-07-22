import Actions from "@enum/Actions";
import State from "@type/state.interface";
import { ActionTree } from "vuex";
import { Cell } from "@type/grid.interface";
import Mutations from "@enum/Mutations";

const actions: ActionTree<State["grid"], State> = {
  /**
   *  Set grid's cells
   * @param store
   * @param grid
   */
  [Actions.GRID_REFRESH]: ({ commit }, grid: Cell[][]) => {
    commit(Mutations.GRID_RENDER, grid);
  },
};

export default actions;
