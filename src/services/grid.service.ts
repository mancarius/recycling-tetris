import { TetrominoShape } from "@/@types/tetromino.interface";
import GridState, { Cell } from "@/@types/grid.interface";

/**
 *
 * @param param0
 * @returns
 */
export function createGrid({
  rows = 20,
  columns = 10,
}: {
  rows?: number;
  columns?: number;
}): GridState["grid"] {
  return Array.from({ length: rows }, () => Array(columns).fill(null));
}

/**
 *
 * @param row
 * @param action
 * @returns
 */
export function refreshRow(row: Cell[], action: (cell: Cell) => Cell): Cell[] {
  return row.map(action);
}

/**
 *
 * @param shape
 * @param grid
 * @returns
 */
export function isValidPosition(shape: TetrominoShape, grid: GridState["grid"]): boolean {
  // eslint-disable-next-line no-restricted-syntax
  for (const { x, y } of shape) {
    const invalidY = y >= grid.length;
    if (invalidY) return false;
    // eslint-disable-next-line no-continue
    if (y < 0) continue;
    const invalidX = x < 0 || x >= grid[y].length;
    if (invalidX) return false;
  }
  return true;
}

/**
 *
 * @param grid
 * @returns
 */
export function clearNoFrozenCells(grid: GridState["grid"]): GridState["grid"] {
  // eslint-disable-next-line max-len
  return grid.map((row: Cell[]) =>
    row.map((cell: Cell) => (cell && cell.frozen === false ? null : cell))
  );
}

/**
 *
 * @param grid
 * @returns
 */
export function freezeGrid(grid: GridState["grid"]): GridState["grid"] {
  return grid.map((row) => {
    return refreshRow(row, (cell) =>
      cell && cell.frozen === false ? { ...cell, frozen: true } : cell
    );
  });
}

/**
 *
 * @param grid
 * @returns
 */
export function isGridFull(grid: GridState["grid"]): boolean {
  return grid.every((row) => !row.every((cell) => cell === null || cell.frozen === false));
}

/**
 *
 * @param grid
 * @returns
 */
export function findSolidRows(grid: GridState["grid"]): number[] {
  const matchedIndexes: number[] = [];

  grid.forEach((row, index) => {
    const isSolidRow = !row.some((cell) => cell === null || cell.frozen === false);
    if (isSolidRow) matchedIndexes.push(index);
  });

  return matchedIndexes;
}

/**
 * Removes solid rows and returns matches count
 *
 * @param grid
 * @returns removed count
 */
export function removeSolidRows(grid: GridState["grid"]): number {
  const solidRowsIndexes = findSolidRows(grid);

  for (const solidRowIndex of solidRowsIndexes) {
    grid.splice(solidRowIndex, 1);
    grid.unshift(Array(10).fill(null));
  }

  return solidRowsIndexes.length;
}

/**
 * U
 * 
 * @param grid 
 * @param spawnedTetrominos 
 */
export function updateRecycledTetrominos(
  grid: GridState["grid"],
  spawnedTetrominos: GridState["tetrominos"]
) {
  const notRecycled: string[] = Object.entries(spawnedTetrominos)
    .filter(([_, { recycled }]) => !recycled)
    .map(([key]) => key);

  notRecycled.forEach((tetrominoKey) => {
    const isRecycled = !grid.some(
      (row) => row.some((cell) => cell?.tid === tetrominoKey) !== undefined
    );

    if (isRecycled) {
      spawnedTetrominos[tetrominoKey].recycled = true;
    }
  });
}

/**
 * 
 * @param spawnedTetrominos 
 * @returns 
 */
export function countRecycledTetrominos(spawnedTetrominos: GridState["tetrominos"]) {
  const recycledTetrominos = Object.entries(spawnedTetrominos)
    .filter(([_, { recycled }]) => recycled)
    .map(([key]) => key);

  return recycledTetrominos.length;
}
