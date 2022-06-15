import GameState from '@/@types/game.interface';

const state = (): GameState => ({
  level: 1,
  score: 0,
  isRunning: false,
  levelCountdown: 0,
  playerAction: null,
});

export default state;
