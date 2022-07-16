import GameState from '@/@types/game.interface';
import { GameStatus } from '@/utils/enums/GameStatus';

const state = (): GameState => ({
  level: 1,
  status: GameStatus.preStart,
  levelCountdown: 0,
  playerAction: null,
});

export default state;
 