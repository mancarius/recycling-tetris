import ControlKeys from '@/utils/enums/ControlKeys';
import GameState from '@/@types/game.interface';
import State from "@/@types/state.interface";
import Mutations from "@/utils/enums/Mutations";
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
   * Set current game score
   * 
   * @param state 
   * @param {Number} payload 
   */
  [Mutations.GAME_SCORE](state, payload: GameState["score"]): void {
    state.score = payload;
  },

  /**
   * Set game state
   * 
   * @param state 
   * @param {Boolean} payload 
   */
  [Mutations.GAME_IS_RUNNING](state, payload: GameState["isRunning"] = true): void {
    state.isRunning = payload;
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
   * @param {ControlKeys | null} payload 
   */
  [Mutations.GAME_PLAYER_ACTION](state, payload: GameState["playerAction"]): void {
    state.playerAction = payload;
  }
};

export default mutations;
