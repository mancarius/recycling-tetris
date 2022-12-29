import GridState from "@type/grid.interface";
import State from "@type/state.interface";
import Getters from "@/constants/enums/Getters";
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
