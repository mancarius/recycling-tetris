import GridState from "@/@types/grid.interface";
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { GetterTree } from "vuex";

const getters: GetterTree<GridState, State> = {
  /**
   * Get grid's cells
   * @param param0 
   * @returns 
   */
  [Getters.GRID]: ({ grid }) => grid,
};

export default getters;
