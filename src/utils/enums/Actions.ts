enum Actions {
  TETROMINO_MOVE = "TETROMINO_MOVE",
  TETROMINO_PRINT = "TETROMINO_PRINT",
  TETROMINO_CREATE = "TETROMINO_CREATE",
  TETROMINO_RESET = "TETROMINO_RESET",

  GRID_REFRESH = "gridRefresh",

  GAME_LEVEL_INCREMENT = "incrementLevel",
  GAME_LEVEL_RESET = "gameLevelReset",
  GAME_LEVEL_SET_COUNTDOWN = "setLevelCountdown",
  GAME_START = "gameStart",
  GAME_STOP = "gameStop",
  GAME_RESUME = "gameResume",
  GAME_STATE_TOGGLE = "gameStateToggle",
  GAME_PLAYER_ACTION_START = "playerActionStart",
  GAME_PLAYER_ACTION_STOP = "playerActionStop",
  GAME_RESET = "gameReset"
}

export default Actions;
