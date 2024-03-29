import GameState from "@type/game.interface";
import State from "@type/state.interface";
import { GameStatus } from "@/constants/enums/GameStatus";
import Getters from "@/constants/enums/Getters";
import { GetterTree } from "vuex";

const getters: GetterTree<GameState, State> = {
  /**
   *  Returns the current level countdown in milliseconds
   * @param state
   * @returns
   */
  [Getters.GAME_LEVEL_COUNTDOWN]: (state) => {
    return state.levelCountdown;
  },

  /**
   *  Returns the current game level
   * @param state
   * @returns
   */
  [Getters.GAME_LEVEL]: (state) => {
    return state.level;
  },

  /**
   *  Returns current game score
   * @param state
   * @returns
   */
  [Getters.GAME_SCORE]: (state, _, rootState) => {
    return rootState.grid.tetrominos.filter((tetrominoID) =>
      rootState.grid.grid.every((row) => row.every((cell) => cell?.tid !== tetrominoID))
    ).length;
  },

  /**
   *  Returns true when game is ready to start
   * @param state
   * @returns
   */
  [Getters.GAME_IS_READY]: (state) => {
    return state.status === GameStatus.preStart;
  },

  /**
   *  Returns the current game running state
   * @param state
   * @returns
   */
  [Getters.GAME_IS_RUNNING]: (state) => {
    return state.status === GameStatus.running;
  },

  /**
   *  Returns true if game is over
   * @param state
   * @returns
   */
  [Getters.GAME_IS_OVER]: (state) => {
    return state.status === GameStatus.gameOver;
  },

  /**
   *  Returns true if game is paused
   * @param state
   * @returns
   */
  [Getters.GAME_IS_PAUSED]: (state) => {
    return state.status === GameStatus.pause;
  },

  /**
   *  Returns true if game has begun
   * @param state
   * @returns
   */
  [Getters.GAME_HAS_BEGUN]: (state) => {
    return state.status !== GameStatus.preStart;
  },
};

export default getters;
