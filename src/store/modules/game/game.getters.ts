import GameState from "@/@types/game.interface";
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { GetterTree } from "vuex";

const getters: GetterTree<GameState, State> = {
  /**
   *
   * @param state
   * @returns
   */
  [Getters.GAME_LEVEL_COUNTDOWN]: (state) => {
    return state.levelCountdown;
  },

  /**
   *
   * @param state
   * @returns
   */
  [Getters.GAME_LEVEL]: (state) => {
    return state.level;
  },

  /**
   *
   * @param state
   * @returns
   */
  [Getters.GAME_SCORE]: (state, _, rootState) => {
    return rootState.grid.tetrominos.filter((tetrominoID) =>
      rootState.grid.grid.every((row) => row.every((cell) => cell?.tid !== tetrominoID))
    ).length;
  },

  /**
   *
   * @param state
   * @returns
   */
  [Getters.GAME_IS_RUNNING]: (state) => {
    return state.isRunning;
  },
};

export default getters;
