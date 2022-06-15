import Coords from "./coords.interface";

export type TetrominoShapePoint = Coords;

export type TetrominoShape = TetrominoShapePoint[];

export interface TetrominoState {
  color?: string;
  image?: string;
  shape: TetrominoShape;
  rotation: number;
  position: Coords;
  tid: string | null;
  frozen: boolean;
}
