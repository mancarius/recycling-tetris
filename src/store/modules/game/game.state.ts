import GameState from "@type/game.interface";
import { GameStatus } from "@/constants/enums/GameStatus";

const bestScore = window.localStorage.getItem("bestScore");

const state = (): GameState => ({
  level: 1,
  status: GameStatus.preStart,
  levelCountdown: 0,
  playerAction: null,
  removedRows: 0,
  bestScore: bestScore ? Number(bestScore) : null,
});

export default state;
