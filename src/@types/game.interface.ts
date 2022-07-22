import ControlKeys from "@enum/ControlKeys";
import { GameStatus } from "@enum/GameStatus";

interface GameState {
  level: number;
  levelCountdown: number;
  playerAction: ControlKeys | null;
  status: GameStatus;
  removedRows: number;
  bestScore: null | number;
}

export default GameState;
