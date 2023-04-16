import { beforeEach, describe, expect, it } from "vitest";
import { TetrominoState } from "@/@types/tetromino.interface";
import { mockGrid } from "@/mocks/grid";
import { mockTetromino, shape } from "@/mocks/tetromino";
import {
  getTetrominosFinalVerticalProjection,
  getSpawnPosition,
  countFreeRowsLength,
} from "../../src/services/tetromino.service";

describe("TetrominoService", () => {
  beforeEach(() => {/* */ });

  describe('getSpawnPosition', () => {

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
  });

  describe('countFreeRowsLength', () => {
    
    it("countFreeRowsLength should return 9", () => {
      const initialPosition = { x: 4, y: 5 };
      const expectedResult = 9;
      const result = countFreeRowsLength(initialPosition, mockGrid);

      expect(result).toEqual(expectedResult);
    });

    it("countFreeRowsLength should return 0", () => {
      const initialPosition = { x: 4, y: 14 };
      const expectedResult = 0;
      const result = countFreeRowsLength(initialPosition, { ...mockGrid });

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTetrominosFinalVerticalProjection', () => {

    it("getTetrominosFinalVerticalProjection should return y=14", () => {
      const initialPosition = { x: 4, y: 5 };
      const tetromino: TetrominoState = { ...mockTetromino, position: initialPosition, rotation: 90 };
      const expectedPosition = { x: 4, y: 14 };
      const finalPosition = getTetrominosFinalVerticalProjection(tetromino, { ...mockGrid });

      expect(finalPosition).toEqual(expectedPosition);
    });

    it("getTetrominosFinalVerticalProjection should return the initial y", () => {
      const initialPosition = { x: 4, y: 14 };
      const tetromino: TetrominoState = { ...mockTetromino, position: initialPosition, rotation: 90 };
      const finalPosition = getTetrominosFinalVerticalProjection(tetromino, { ...mockGrid });

      expect(finalPosition).toEqual(initialPosition);
    });
  });
});