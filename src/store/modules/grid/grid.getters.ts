import GridState from "@/@types/grid.interface";
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { GetterTree } from "vuex";

const getters: GetterTree<GridState, State> = {
  /**
   *  Get grid's cells
   * @param store
   * @returns
   */
  [Getters.GRID]: ({ grid }) => grid,
};

export default getters;
