import GameState from "./game.interface";
import GridState from "./grid.interface";
import { TetrominoState } from "./tetromino.interface";

interface State {
  tetromino: TetrominoState;
  grid: GridState;
  game: GameState;
}

export default State;
