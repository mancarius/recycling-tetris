import clone from "@/utils/clone";
import { createTetromino, move } from "@/services/tetromino.service";
import State from "@/@types/state.interface";
import { TetrominoState } from "@/@types/tetromino.interface";
import { GRID_SIZE, SHAPES } from "@/configs/configs";
import Actions from "@/utils/enums/Actions";
import ControlKeys from "@/utils/enums/ControlKeys";
import Mutations from "@/utils/enums/Mutations";
import { ActionTree } from "vuex";

const actions: ActionTree<State["tetromino"], State> = {
  /**
   * Create new tetromino with random shape
   * @param param0
   */
  [Actions.TETROMINO_CREATE]: ({ commit }) => {
    const { columns } = GRID_SIZE;
    const x = Math.floor(columns / 2) - 1;
    const y = 1;
    const shape = SHAPES[1];

    commit(Mutations.TETROMINO_CREATE, createTetromino({ position: { x, y }, shape }));
  },

  /**
   * Update tetromino's position, rotations and shape by direction
   * @param param0
   * @param direction
   */
  [Actions.TETROMINO_MOVE]: ({ commit, state }, direction: ControlKeys) => {
    const { position, shape, rotation } = move(direction, clone<TetrominoState>(state));
    commit(Mutations.TETROMINO_POSITION, position);
    commit(Mutations.TETROMINO_SHAPE, shape);
    commit(Mutations.TETROMINO_ROTATION, rotation);
  },
};

export default actions;
