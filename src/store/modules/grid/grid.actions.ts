import Actions from "@/constants/enums/Actions";
import State from "@type/state.interface";
import { ActionTree } from "vuex";
import { Cell } from "@type/grid.interface";
import Mutations from "@/constants/enums/Mutations";
import { GRID_SIZE } from "@/configs/configs";
import { calculateNumberOfRows } from "@service/grid.service";

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
    let { rows, columns } = GRID_SIZE[deviceScreen];

    // get rows number if not defined
    if (rows === "auto") {
      const mainElement = document.querySelector("#app > main");
      rows = mainElement ? calculateNumberOfRows(mainElement, columns) : 0;
    }

    commit(Mutations.GRID_RESET, { rows, columns });
  },
};

export default actions;
