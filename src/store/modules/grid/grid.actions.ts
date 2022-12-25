import Actions from "@enum/Actions";
import State from "@type/state.interface";
import { ActionTree } from "vuex";
import { Cell } from "@type/grid.interface";
import Mutations from "@enum/Mutations";
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
    let { rows, columns } = GRID_SIZE[deviceScreen];

    // get rows number if not defined
    if (rows === "auto") {
      const mainElement = document.querySelector("#app > main");
      const mainElementHeight = mainElement?.clientHeight ?? 0;
      const mainElementWidth = mainElement?.clientWidth ?? 0;
      const cellHeight = mainElementWidth / columns;
      rows = Math.ceil(mainElementHeight / cellHeight) - 1;
    }

    commit(Mutations.GRID_RESET, { rows, columns });
  },
};

export default actions;
