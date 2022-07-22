import GameState from "@type/game.interface";
import State from "@type/state.interface";
import { GameStatus } from "@enum/GameStatus";
import Mutations from "@enum/Mutations";
import { MutationTree } from "vuex";

const mutations: MutationTree<State["game"]> = {
  /**
   * Set game level
   *
   * @param state
   * @param {Number} payload
   */
  [Mutations.GAME_LEVEL](state, payload: GameState["level"]): void {
    state.level = payload;
  },

  /**
   * Set game state
   *
   * @param state
   * @param {Boolean} payload
   */
  [Mutations.GAME_STATUS](state, status: GameState["status"]): void {
    state.status = status;
  },

  /**
   * Set game level countdown
   *
   * @param state
   * @param {Number} payload
   */
  [Mutations.GAME_LEVEL_SET_COUNTDOWN](state, payload: GameState["levelCountdown"]): void {
    state.levelCountdown = payload;
  },

  /**
   * Save last player action
   *
   * @param state
   * @param {ControlKeys | null} action
   */
  [Mutations.GAME_PLAYER_ACTION](state, action: GameState["playerAction"]): void {
    state.playerAction = action;
  },

  /**
   * Set removed rows
   *
   * @param state
   * @param {Number} removedLength
   */
  [Mutations.GAME_SET_REMOVED_ROWS](state, removedLength: GameState["removedRows"]): void {
    state.removedRows = removedLength;
  },

  /**
   * Set best score
   *
   * @param state
   * @param {Number} currentScore
   */
  [Mutations.GAME_SET_BEST_SCORE](state, currentScore: number): void {
    if (typeof currentScore === "number") {
      state.bestScore = currentScore;
    }
  },
};

export default mutations;
