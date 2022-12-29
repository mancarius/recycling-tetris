import State from "@type/state.interface";
import { TetrominoShape, TetrominoState } from "@type/tetromino.interface";
import Mutations from "@/constants/enums/Mutations";
import { MutationTree } from "vuex";

const mutations: MutationTree<State["tetromino"]> = {
  /**
   * Set tetromino's position
   * @param state
   * @param position
   */
  [Mutations.TETROMINO_POSITION](state, position: TetrominoState["position"]) {
    state.position = position;
  },

  /**
   * Set tetromino's shape
   * @param state
   * @param shape
   */
  [Mutations.TETROMINO_SHAPE](state, shape: TetrominoShape) {
    shape.forEach((point, index) => {
      state.shape[index] = point;
    });
  },

  /**
   * Set tetromino's rotation
   * @param state
   * @param payload
   */
  [Mutations.TETROMINO_ROTATION](state, payload: TetrominoState["rotation"]) {
    state.rotation = payload;
  },

  /**
   * Initialize tetromino's state with passed options
   * @param state
   * @param tetromino
   */
  [Mutations.TETROMINO_CREATE](state, tetromino: TetrominoState) {
    Object.entries(tetromino).forEach(([key, value]) => {
      Reflect.set(state, key as keyof TetrominoState, value);
    });
  },
};

export default mutations;
