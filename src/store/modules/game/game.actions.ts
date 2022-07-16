import ControlKeys from "@/utils/enums/ControlKeys";
import GameState from "@/@types/game.interface";
import Actions from "@/utils/enums/Actions";
import State from "@/@types/state.interface";
import { ActionTree } from "vuex";
import Mutations from "@/utils/enums/Mutations";
import { GameStatus } from "@/utils/enums/GameStatus";

const actions: ActionTree<State["game"], State> = {
  /**
   * @description Create new tetromino and start game
   * @param store
   */
  [Actions.GAME_START]: ({ commit, dispatch }) => {
    dispatch(Mutations.TETROMINO_CREATE);
    commit(Mutations.GAME_STATUS, GameStatus.running);
  },

  /**
   * @description Set status to pause or game-over depending on grid status
   * @param store
   */
  [Actions.GAME_STOP]: ({ commit, rootState }) => {
    const { grid } = rootState;
    const nextStatus = grid.isFull ? GameStatus.gameOver : GameStatus.pause;

    commit(Mutations.GAME_STATUS, nextStatus);
  },

  /**
   * @description Set status to running or game-over depending on grid status
   * @param store
   */
  [Actions.GAME_RESUME]: ({ commit, rootState }) => {
    const { grid } = rootState;
    const nextStatus = grid.isFull ? GameStatus.gameOver : GameStatus.running;

    commit(Mutations.GAME_STATUS, nextStatus);
  },

  /**
   * @description Toggle game status
   * @param store
   */
  [Actions.GAME_STATE_TOGGLE]: ({ state, rootState, commit }) => {
    const { grid } = rootState;
    let nextStatus = state.status === GameStatus.running ? GameStatus.pause : GameStatus.running;

    if (nextStatus === GameStatus.running && grid.isFull) {
      nextStatus = GameStatus.gameOver;
    }

    commit(Mutations.GAME_STATUS, nextStatus);
  },

  /**
   * Increment game level by one unit
   * @param store
   */
  [Actions.GAME_LEVEL_INCREMENT]: ({ commit, state }) => {
    commit(Mutations.GAME_LEVEL, state.level + 1);
  },

  /**
   * Reset the game level
   * @param store
   */
  [Actions.GAME_LEVEL_RESET]: ({ commit }) => {
    commit(Mutations.GAME_LEVEL, 0);
  },

  /**
   * Init the level countdown in milliseconds
   * @param store
   * @param milliseconds
   */
  [Actions.GAME_LEVEL_SET_COUNTDOWN]: ({ commit }, milliseconds: GameState["levelCountdown"]) => {
    commit(Mutations.GAME_LEVEL_SET_COUNTDOWN, milliseconds);
  },

  /**
   * Save the current player action
   * @param store
   * @param action
   */
  [Actions.GAME_PLAYER_ACTION_START]: ({ commit, state }, action: ControlKeys) => {
    commit(Mutations.GAME_PLAYER_ACTION, action);
  },

  /**
   * Delete player action
   * @param store
   */
  [Actions.GAME_PLAYER_ACTION_STOP]: ({ commit }) => {
    commit(Mutations.GAME_PLAYER_ACTION, null);
  },

  /**
   * Reset the game status, level countdown, level and grid
   * @param store
   */
  [Actions.GAME_RESET]: ({ commit }) => {
    commit(Mutations.GAME_STATUS, GameStatus.preStart);
    commit(Mutations.GAME_LEVEL_SET_COUNTDOWN, 0);
    commit(Mutations.GAME_LEVEL, 1);
    commit(Mutations.GRID_RESET);
  },
};

export default actions;
