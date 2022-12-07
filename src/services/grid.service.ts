import { TetrominoShape } from "@type/tetromino.interface";
import GridState, { Cell } from "@type/grid.interface";
import { GRID_SIZE } from "@config";
import { DeviceScreen } from "@/utils/enums/DeviceScreen.enum";

/**
 *  Creates new empty grid
 *
 * @param configs
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
 * Refresh all cells in the row
 *
 * @param row
 * @param action
 * @returns
 */
export function refreshRow(row: Cell[], action: (cell: Cell) => Cell): Cell[] {
  return row.map(action);
}

/**
 * Checks if the shape position is valid inside the grid
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
 * Returns grid without the current falling tetromino
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
 * Freezes all not-empty cells
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
 * Returns true if there are no blank lines, otherwise returns false
 *
 * @param grid
 * @returns {boolean}
 */
export function isGridFull(grid: GridState["grid"]): boolean {
  return grid.every((row) => !row.every((cell) => cell === null || cell.frozen === false));
}

/**
 * Finds all fullfilled rows and returns an array with the matched indexes
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
 * Removes fullfilled rows and returns the match count
 *
 * @param grid
 * @returns removed count
 */
export function removeSolidRows(grid: GridState["grid"], device: DeviceScreen): number {
  const solidRowsIndexes = findSolidRows(grid);

  for (const solidRowIndex of solidRowsIndexes) {
    grid.splice(solidRowIndex, 1);
    grid.unshift(Array(GRID_SIZE[device].columns).fill(null));
  }

  return solidRowsIndexes.length;
}
