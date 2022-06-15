import ControlKeys from "@/utils/enums/ControlKeys";
import GameState from "@/@types/game.interface";
import Actions from "@/utils/enums/Actions";
import State from "@/@types/state.interface";
import { ActionTree } from "vuex";
import Mutations from "@/utils/enums/Mutations";

const actions: ActionTree<State["game"], State> = {
  /**
   * Create new tetromino and start game
   * @param param0
   */
  [Actions.GAME_START]: ({ commit, dispatch }) => {
    dispatch(Mutations.TETROMINO_CREATE);
    commit(Mutations.GAME_IS_RUNNING);
  },

  /**
   *
   * @param param0
   */
  [Actions.GAME_STOP]: ({ commit }) => {
    commit(Mutations.GAME_IS_RUNNING, false);
  },

  /**
   *
   * @param param0
   */
  [Actions.GAME_LEVEL_INCREMENT]: ({ commit, state }) => {
    commit(Mutations.GAME_LEVEL, state.level + 1);
  },

  /**
   *
   * @param param0
   */
  [Actions.GAME_LEVEL_RESET]: ({ commit }) => {
    commit(Mutations.GAME_LEVEL, 0);
  },

  /**
   *
   * @param param0
   * @param payload
   */
  [Actions.GAME_LEVEL_SET_COUNTDOWN]: ({ commit }, payload: GameState["levelCountdown"]) => {
    commit(Mutations.GAME_LEVEL_SET_COUNTDOWN, payload);
  },

  /**
   *
   * @param param0
   * @param multiplier
   */
  [Actions.GAME_SCORE_INCREMENT]: ({ commit, state }, multiplier: number) => {
    commit(Mutations.GAME_SCORE, Number(state.score) + 10 * multiplier);
  },

  /**
   *
   * @param param0
   */
  [Actions.GAME_LEVEL_RESET]: ({ commit }) => {
    commit(Mutations.GRID_RENDER, 0);
  },

  /**
   *
   * @param param0
   * @param payload
   */
  [Actions.GAME_PLAYER_ACTION_START]: ({ commit }, payload: ControlKeys) => {
    commit(Mutations.GAME_PLAYER_ACTION, payload);
  },

  /**
   *
   * @param param0
   */
  [Actions.GAME_PLAYER_ACTION_STOP]: ({ commit }) => {
    commit(Mutations.GAME_PLAYER_ACTION, null);
  },
};

export default actions;
