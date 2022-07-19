<script setup lang="ts">
import { calculateFallingDelay } from "@/services/game.service";
import {
  clearNoFrozenCells,
  freezeGrid,
  isGridFull,
  removeSolidRows,
} from "@/services/grid.service";
import {
  getTetrominosFinalVerticalProjection,
  printTetrominoOnGrid,
} from "@/services/tetromino.service";
import Coords from "@/@types/coords.interface";
import GridState, { Cell } from "@/@types/grid.interface";
import State from "@/@types/state.interface";
import { TetrominoState } from "@/@types/tetromino.interface";
import Actions from "@/utils/enums/Actions";
import ControlKeys from "@/utils/enums/ControlKeys";
import Getters from "@/utils/enums/Getters";
import Mutations from "@/utils/enums/Mutations";
import { computed, ComputedRef, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import GameGridCell from "./grid/GameGridCell.vue";
import GameGridBackground from "./grid/GameGridBackground.vue";
import { DEFAULT_TETROMINO_FALLING_DELAY } from "@/configs/configs";

const { getters, dispatch, commit, state } = useStore<State>();
const grid: ComputedRef<GridState["grid"]> = computed(() => getters[Getters.GRID]);
const tetromino: ComputedRef<TetrominoState> = computed(() => getters[Getters.TETROMINO]);
let fallingTimeout: NodeJS.Timeout;
let isFalling = false;
let gameIsRunning = computed(() => getters[Getters.GAME_IS_RUNNING]);
const playerAction = computed(() => state.game.playerAction);
let fallDelay: ComputedRef<number> = computed(() =>
  calculateFallingDelay(DEFAULT_TETROMINO_FALLING_DELAY, state.game.level)
);
const gridElement = ref<HTMLElement>();
const gridSize = reactive({
  width: 0,
  height: 0
});

function stopGame(): void {
  dispatch(Actions.GAME_STOP);
}

/**
 *  Spawn new tetromino in grid
 */
function createTetromino(): void {
  dispatch(Actions.TETROMINO_CREATE);
}

/**
 *  Save the new grid
 * @param grid
 */
function saveGrid(grid: GridState["grid"]): void {
  dispatch(Actions.GRID_REFRESH, grid);
}

/**
 *  Set the grid fullness state
 * @param {boolean} isFull
 */
function setGridIsFull(isFull: boolean): void {
  commit(Mutations.GRID_IS_FULL, isFull);
}

/**
 *  Move tetromino one step down
 */
function fallOneStep(): void {
  if (playerAction.value !== ControlKeys.DOWN && playerAction.value !== ControlKeys.SPACE) {
    dispatch(Actions.TETROMINO_MOVE, ControlKeys.DOWN);
  }
}

/**
 *  Start the tetromino falling
 */
function startFalling(): void {
  isFalling = true;
  fallOneStep();
  fallingTimeout = setTimeout(startFalling, fallDelay.value);
}

/**
 *  Stop the tetromino falling
 */
function stopFalling(): void {
  isFalling = false;
  clearTimeout(fallingTimeout);
}

/**
 *  Calculate the new grid on tetromino's changes
 */
function onTetrominoMove(next: [Coords, number], prev: [Coords, number]): void {
  const [prevPos, prevRot] = prev;

  // get a grid copy with tetromino's changes
  let nextGridDraft = printTetrominoOnGrid(tetromino.value, clearNoFrozenCells(grid.value));

  // check if new tetromino position is valid
  const isValidPosition = nextGridDraft !== false;

  if (isValidPosition) {
    // save new position in the grid
    saveGrid(nextGridDraft as Cell[][]);
  } else if (isFalling) {
    // tetromino is going to falling in a not valid position
    stopFalling();
    const fallingHandler = new Promise<null>((resolve, reject) => {
      // freeze tetromino position on grid
      nextGridDraft = freezeGrid(grid.value);

      // add the freezed tetromino's id
      commit(Mutations.GRID_ADD_TETROMINO, tetromino.value.tid);

      // find and remove solid rows
      const solidRowsRemovedLength = removeSolidRows(nextGridDraft);

      // if the grid is full, then stop the game
      if (solidRowsRemovedLength === 0 && isGridFull(nextGridDraft)) {
        setGridIsFull(true);
        reject("Grid is full");
      }

      // refresh removed rows counter
      dispatch(Actions.GAME_ADD_REMOVED_ROWS, solidRowsRemovedLength);

      // if the grid is not full, creates a new tetromino
      createTetromino();

      // inserts tetromino in the grid
      nextGridDraft = printTetrominoOnGrid(tetromino.value, nextGridDraft);

      // saves the new grid
      saveGrid(nextGridDraft as Cell[][]);

      resolve(null);
    });

    fallingHandler
      .then(() => {
        // restarts the tetromino's falling
        gameIsRunning.value && !isFalling && startFalling();
      })
      .catch((error) => {
        stopGame();
      })
      .finally(() => {
        return;
      });
  } else {
    // tetromino was moved by the player in an invalid position, so set the previous valid position
    commit(Mutations.TETROMINO_POSITION, prevPos);
    commit(Mutations.TETROMINO_ROTATION, prevRot);
  }

  isFalling = false;
}

function onSpaceKeyPress() {
  commit(
    Mutations.TETROMINO_POSITION,
    getTetrominosFinalVerticalProjection(tetromino.value, grid.value)
  );
}

function setGridSize() {
  gridSize.width = gridElement.value?.offsetWidth ?? 0;
  gridSize.height = gridElement.value?.offsetHeight ?? 0;
}

watch(
  (): [Coords, number] => [tetromino.value.position, tetromino.value.rotation],
  onTetrominoMove
);

watch(gameIsRunning, (isRunning) => {
  isRunning ? startFalling() : stopFalling();
});

watch(playerAction, (action) => {
  action === ControlKeys.SPACE && onSpaceKeyPress();
});

onMounted(() => {
  gameIsRunning.value && startFalling();
  setGridSize();
});

onUnmounted(() => {
  stopFalling();
});
</script>

<template>
  <div class="container">
    <div class="grid" ref="gridElement">
      <div class="row" v-for="(row, y) of grid" :key="y">
        <GameGridCell class="cell" v-for="(cell, x) of row" :key="y + '.' + x" :coords="{ x, y }" />
      </div>
    </div>
    <div class="background">
      <game-grid-background :size="gridSize" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;

  .grid {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    display: grid;
    position: relative;
    backdrop-filter: blur(1px);
    border: 4px solid #064863;
    margin: 0 auto;
    padding: 1px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 10;
      background-color: #149cc94b;
    }

    .row {
      display: flex;

      .cell {
        flex: 1;
      }
    }
  }

  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
