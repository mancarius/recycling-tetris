import { TetrominoState } from "@/@types/tetromino.interface";
import { mockGrid } from "@/mocks/grid";
import { mockTetromino, shape } from "@/mocks/tetromino";
import { beforeEach, describe, expect, it } from "vitest";
import {
  getTetrominoFinalProjection,
  getSpawnPosition,
  rotateShapePoint,
  getShapeCoordsByPosition,
  countFreeRowsLength,
} from "../../src/services/tetromino.service";

describe("TetrominoService", () => {
  beforeEach(() => {});

  it("getSpawnPosition with rotation 90", () => {
    const initialPosition = { x: 4, y: 10 };
    const tetromino: TetrominoState = {
      ...mockTetromino,
      position: initialPosition,
      shape: shape.I,
      rotation: 90,
    };
    const expectedPosition = { x: 4, y: -1 };
    const finalProjection = getSpawnPosition(tetromino);

    expect(finalProjection).toStrictEqual(expectedPosition);
  });

  it("getSpawnPosition with rotation 0", () => {
    const initialPosition = { x: 4, y: 0 };
    const tetromino: TetrominoState = {
      ...mockTetromino,
      position: initialPosition,
      shape: shape.I,
      rotation: 0,
    };
    const expectedPosition = { x: 4, y: -3 };
    const finalProjection = getSpawnPosition(tetromino);

    expect(finalProjection).toStrictEqual(expectedPosition);
  });

  it("countFreeRowsLength", () => {
    const initialPosition = { x: 4, y: 5 };
    const expectedResult = 9;
    const result = countFreeRowsLength(initialPosition, mockGrid);

    expect(result).toEqual(expectedResult);
  });

  it("getTetrominoFinalProjection", () => {
    const initialPosition = { x: 4, y: 5 };
    const tetromino: TetrominoState = { ...mockTetromino, position: initialPosition };
    const expectedPosition = { x: 4, y: 14 };
    const finalProjection = getTetrominoFinalProjection(tetromino, mockGrid);

    expect(finalProjection).toEqual(expectedPosition);
  });
});
