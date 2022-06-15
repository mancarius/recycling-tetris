enum Actions {
  TETROMINO_MOVE = "TETROMINO_MOVE",
  TETROMINO_PRINT = "TETROMINO_PRINT",
  TETROMINO_CREATE = "TETROMINO_CREATE",
  TETROMINO_RESET = "TETROMINO_RESET",

  GRID_UPDATE = "updateGrid",
  GRID_REFRESH = "gridRefresh",

  GAME_SCORE_INCREMENT = "incrementScore",
  GAME_SCORE_RESET = "resetScore",
  GAME_LEVEL_INCREMENT = "incrementLevel",
  GAME_LEVEL_RESET = "gameLevelReset",
  GAME_LEVEL_SET_COUNTDOWN = "setLevelCountdown",
  GAME_START = "gameStart",
  GAME_STOP = "gameStop",
  GAME_PLAYER_ACTION_START = "playerActionStart",
  GAME_PLAYER_ACTION_STOP = "playerActionStop",
}

export default Actions;
