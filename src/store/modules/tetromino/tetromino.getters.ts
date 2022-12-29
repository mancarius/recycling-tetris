import State from "@type/state.interface";
import Getters from "@/constants/enums/Getters";
import { GetterTree } from "vuex";

const getters: GetterTree<State["tetromino"], State> = {
  /**
   * Get tetromino's position
   * @param state
   * @returns
   */
  [Getters.TETROMINO_POSITION](state) {
    return state.position;
  },

  /**
   * Get tetromino's shape
   * @param state
   * @returns
   */
  [Getters.TETROMINO_SHAPE](state) {
    return state.shape;
  },

  /**
   * Get tetromino's color
   * @param state
   * @returns
   */
  [Getters.TETROMINO_COLOR](state) {
    return state.color;
  },

  /**
   * Get tetromino's data
   * @param state
   * @returns
   */
  [Getters.TETROMINO](state) {
    return state;
  },
};

export default getters;
