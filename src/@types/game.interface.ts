import ControlKeys from '@/utils/enums/ControlKeys';
import { GameStatus } from '@/utils/enums/GameStatus';

interface GameState {
  level: number;
  levelCountdown: number;
  playerAction: ControlKeys | null;
  status: GameStatus
}

export default GameState;
