import Actions from "@enum/Actions";
import State from "@type/state.interface";
import { ActionTree } from "vuex";
import { Cell } from "@type/grid.interface";
import Mutations from "@enum/Mutations";
import { DeviceScreen } from "@/utils/enums/DeviceScreen.enum";
import { GRID_SIZE } from "@/configs/configs";

const actions: ActionTree<State["grid"], State> = {
  /**
   *  Set grid's cells
   * @param store
   * @param grid
   */
  [Actions.GRID_REFRESH]: ({ commit }, grid: Cell[][]) => {
    commit(Mutations.GRID_RENDER, grid);
  },

  [Actions.GRID_RESET]: ({ commit, rootState }) => {
    const { deviceScreen } = rootState.core;

    commit(Mutations.GRID_RESET, GRID_SIZE[deviceScreen]);
  },
};

export default actions;
