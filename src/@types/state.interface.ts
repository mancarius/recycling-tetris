import { CoreState } from "./core.type";
import GameState from "./game.interface";
import GridState from "./grid.interface";
import { TetrominoState } from "./tetromino.interface";

interface State {
  core: CoreState;
  tetromino: TetrominoState;
  grid: GridState;
  game: GameState;
}

export default State;
