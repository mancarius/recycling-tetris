import Coords from "./coords.interface";
import { TetrominoState } from "./tetromino.interface";

export type Cell = null | {
  rotation: TetrominoState["rotation"];
  tid: TetrominoState["tid"];
  image?: TetrominoState["image"];
  color?: TetrominoState["color"];
  local: Coords;
  frozen: TetrominoState["frozen"];
  position: Coords;
};

interface GridState {
  grid: Cell[][];
  isFull: boolean;
  tetrominos: string[]
}

export default GridState;
