import Actions from "@/utils/enums/Actions";
import State from "@/@types/state.interface";
import { ActionTree } from "vuex";
import { Cell } from "@/@types/grid.interface";
import Mutations from "@/utils/enums/Mutations";

const actions: ActionTree<State["grid"], State> = {
  /**
   * @description Set grid's cells
   * @param store
   * @param grid
   */
  [Actions.GRID_REFRESH]: ({ commit }, grid: Cell[][]) => {
    commit(Mutations.GRID_RENDER, grid);
  },
};

export default actions;
