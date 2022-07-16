enum Mutations {
  TETROMINO_POSITION = "TETROMINO_POSITION",
  TETROMINO_SHAPE = "TETROMINO_SHAPE",
  TETROMINO_ROTATION = "setTetrominoRotation",
  TETROMINO_CREATE = "TETROMINO_CREATE",
  TETROMINO_RESET = "TETROMINO_RESET",

  GRID_RENDER = "gridRender",
  GRID_IS_FULL = "setGridFullState",
  GRID_ADD_TETROMINO = "addNewTetrominoToGrid",
  GRID_RESET = "resetGrid",

  GAME_LEVEL = "gameLevelIncrement",
  GAME_LEVEL_SET_COUNTDOWN = "setLevelCountdown",
  GAME_STATUS = "setGameStatus",
  GAME_PLAYER_ACTION = "setPlayerAction",
}

export default Mutations;
