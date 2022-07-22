import GridState from "@type/grid.interface";
import Coords from "@type/coords.interface";
import { TetrominoShape, TetrominoShapePoint, TetrominoState } from "@type/tetromino.interface";
import { SHAPES } from "@config";
import ControlKeys from "@enum/ControlKeys";

/**
 *  Create a new tetromino
 * @param configs
 * @returns
 */
export function createTetromino(
  configs: Partial<Pick<TetrominoState, "position" | "rotation" | "shape">> = {}
): { position: Coords; shape: TetrominoShape; rotation: number; tid: string } {
  const { x, y } = { ...{ x: 0, y: 0 }, ...configs.position };
  const rotation = configs.rotation || getRandomRotation();
  const shape = configs.shape || getRandomShape();
  const tid: TetrominoState["tid"] = `t${String(rotation)}${String(Date.now())}`;
  const position = getSpawnPosition({ shape, position: { x, y }, rotation });
  return {
    position,
    shape,
    rotation,
    tid,
  };
}

/**
 *  Rotates single shape point based on the given angle
 * @param shapePoint
 * @param angle
 * @returns
 */
export function rotateShapePoint(
  { x, y }: TetrominoShapePoint,
  angle: TetrominoState["rotation"]
): Coords {
  const rad = (Math.PI / 180) * angle;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  return {
    x: Math.round(x * cos - y * sin),
    y: Math.round(y * cos + x * sin),
  };
}

/**
 *  Calculate new coords for each tetromino's point based on the given position and returns new shape
 * @param position
 * @param shape
 * @returns
 */
export function getShapeCoordsByPosition(position: Coords, shape: TetrominoShape): Coords[] {
  return shape.map((localCoords) => ({
    x: localCoords.x + position.x,
    y: localCoords.y + position.y,
  }));
}

/**
 *  Returns random shape
 * @returns
 */
export function getRandomShape(): TetrominoShape {
  const index = Math.floor(Math.random() * (SHAPES.length - 1) + 1);
  return SHAPES[index];
}

/**
 *  Returns random rotation
 * @returns
 */
export function getRandomRotation(): number {
  const multiplier = Math.floor(Math.random() * 3 + 1);
  return 90 * multiplier;
}

/**
 *  Move tetromino. Returns new position
 * @param direction
 * @param tetromino
 * @returns
 */
export function move(
  direction: ControlKeys,
  tetromino: TetrominoState
): {
  position: TetrominoState["position"];
  shape: TetrominoShape;
  rotation: TetrominoState["rotation"];
} {
  let { position, rotation } = tetromino;
  const { shape } = tetromino;

  switch (direction) {
    case ControlKeys.DOWN:
      position = { ...position, y: position.y + 1 };
      return { position, shape, rotation };
    case ControlKeys.LEFT:
      position = { ...position, x: position.x - 1 };
      return { position, shape, rotation };
    case ControlKeys.RIGHT:
      position = { ...position, x: position.x + 1 };
      return { position, shape, rotation };
    case ControlKeys.UP:
      rotation = rotation >= 270 ? 0 : rotation + 90;
      return { position, shape, rotation };
    default:
      return { position, shape, rotation };
  }
}

/**
 *  Inserts the given tetromino inside the grid and returns the new grid
 * @param tetromino
 * @param grid
 * @returns
 */
export function printTetrominoOnGrid(
  tetromino: TetrominoState,
  grid: GridState["grid"]
): GridState["grid"] | false {
  const { shape, ...cell } = tetromino;

  for (const point of shape) {
    const { x, y } = rotateShapePoint(point, cell.rotation);

    const global = {
      x: x + cell.position.x,
      y: y + cell.position.y,
    };

    if (global.y >= 0) {
      if (global.y < grid.length && grid[global.y][global.x] === null) {
        grid[global.y][global.x] = {
          ...cell,
          local: point,
        };
      } else {
        return false;
      }
    }
  }

  return grid;
}

/**
 * Calculate a new spawn position for the tetromino
 * @param tetromino
 * @returns
 */
export function getSpawnPosition({
  shape,
  position,
  rotation,
}: Pick<TetrominoState, "shape" | "position" | "rotation"> &
  Partial<TetrominoState>): TetrominoState["position"] {
  const biggestYCoord = shape.reduce((prevY: number, point) => {
    const { y } = rotateShapePoint(point, rotation);
    return prevY >= y ? prevY : y;
  }, 0);

  return { ...position, y: (biggestYCoord + 1) * -1 };
}

/**
 * Calculates the final valid vertical position of the tetromino based on the current position
 * @param tetromino
 * @param grid
 * @returns
 */
export function getTetrominosFinalVerticalProjection(
  { position, rotation, shape }: TetrominoState,
  grid: GridState["grid"]
): { y: number; x: number } {
  const rotatedShape = shape.map((point) => rotateShapePoint(point, rotation));
  const columnsLength: number[] = [];
  // for each shape point
  for (const local of rotatedShape) {
    const globalColumnIndex = local.x + position.x;
    const globalRowIndex = local.y + position.y;
    const nextCell = grid[globalRowIndex + 1]?.[globalColumnIndex];
    // check if the next cell belong to the same tetromino or another
    // if next cell is not busy or frozen, then it not belong to the same tetromino
    if (nextCell === null || nextCell?.frozen) {
      const freeRowsLength =
        nextCell === null
          ? countFreeRowsLength({ x: globalColumnIndex, y: globalRowIndex }, grid)
          : 0;
      // save the free rows length under the shape point
      columnsLength.push(position.y + freeRowsLength);
    }
  }
  // take the smaller y value and return it
  const columnsDeepSorted = columnsLength.sort((a, b) => a - b);
  const minColumnLength = columnsDeepSorted.shift() ?? position.y;
  return { ...position, y: minColumnLength };
}

/**
 *  Counts the empties rows under every shape point
 * @param coords - tetromino's point coords
 * @param grid
 * @returns
 */
export function countFreeRowsLength({ x, y }: Coords, grid: GridState["grid"]): number {
  let freeRowsLength = 0;
  // count the empties rows under every shape point
  while (grid[y + freeRowsLength + 1]?.[x] === null) {
    freeRowsLength += 1;
  }

  return freeRowsLength;
}
