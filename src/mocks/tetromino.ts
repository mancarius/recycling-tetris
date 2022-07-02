import { TetrominoState } from "@/@types/tetromino.interface";
import { SHAPES } from "@/utils/constants";

export const mockTetromino: TetrominoState = {
  position: { x: 4, y: 5 },
  shape: SHAPES[1],
  rotation: 90,
  color: "cyan",
  frozen: false,
  tid: "t01656528763129",
};

export const shape = {
  I: SHAPES[1]
}