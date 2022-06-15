import ControlKeys from '@/utils/enums/ControlKeys';

interface GameState {
  level: number;
  score: number;
  isRunning: boolean;
  levelCountdown: number;
  playerAction: ControlKeys | null;
}

export default GameState;
