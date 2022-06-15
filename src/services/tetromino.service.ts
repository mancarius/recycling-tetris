import GridState from '@/@types/grid.interface';
import Coords from "@/@types/coords.interface";
import { TetrominoShape, TetrominoShapePoint, TetrominoState } from "@/@types/tetromino.interface";
import { SHAPES } from "@/utils/constants";
import ControlKeys from "@/utils/enums/ControlKeys";

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
 * Calculate new coords for each tetromino's point
 */
export function getShapeCoordsByPosition(position: Coords, shape: TetrominoShape): Coords[] {
  return shape.map((localCoords) => ({
    x: localCoords.x + position.x,
    y: localCoords.y + position.y,
  }));
}

export function getRandomShape(): TetrominoShape {
  const index = Math.floor(Math.random() * (SHAPES.length - 1) + 1);
  return SHAPES[index];
}

export function getRandomRotation(): number {
  const multiplier = Math.floor(Math.random() * 3 + 1);
  return 90 * multiplier;
}

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


export function printTetrominoOnGrid (
  tetromino: TetrominoState,
  grid: GridState["grid"]
): GridState["grid"] | false {
  const { shape, ...cell } = tetromino;

  for (let point of shape) {
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
};

export function getSpawnPosition({
  shape,
  position,
  rotation,
}: TetrominoState): TetrominoState["position"] {
  const biggestYCoord = shape.reduce((prevY: number, point) => {
    const { y } = rotateShapePoint(point, rotation);
    return prevY >= y ? prevY : y;
  }, 0);
  return { ...position, y: (biggestYCoord + 1) * -1 };
}

export function getTetrominoFinalProjection(
  { position, rotation, shape }: TetrominoState,
  grid: GridState["grid"]
) {
  const rotatedShape = shape.map((point) => rotateShapePoint(point, rotation));
  const columnsLength: number[] = [];
  for (const { x, y } of rotatedShape) {
    const columnIndex = x + position.x;
    const rowIndex = y + position.y;
    let count = 0;
    while (grid[rowIndex + count + 1]?.[columnIndex] === null) {
      count += 1;
    }
    const offset = y > 0 ? y : 0;
    count > 1 && columnsLength.push(rowIndex + count - offset);
  }
  const columnsDeepSorted = columnsLength.sort((a, b) => a - b);
  const minColumnLength = columnsDeepSorted[0] ?? 0;
  return { ...position, y: minColumnLength };
}