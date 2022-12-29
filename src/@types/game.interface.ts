import ControlKeys from "@/constants/enums/ControlKeys";
import { GameStatus } from "@/constants/enums/GameStatus";

interface GameState {
  level: number;
  levelCountdown: number;
  playerAction: ControlKeys | null;
  status: GameStatus;
  removedRows: number;
  bestScore: null | number;
}

export default GameState;
