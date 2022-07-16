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
import { computed, ComputedRef, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import GameGridCell from "./GameGridCell.vue";
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

function stopGame(): void {
  dispatch(Actions.GAME_STOP);
}

/**
 * @description Spawn new tetromino in grid
 */
function createTetromino(): void {
  dispatch(Actions.TETROMINO_CREATE);
}

/**
 * @description Save the new grid
 * @param grid
 */
function saveGrid(grid: GridState["grid"]): void {
  dispatch(Actions.GRID_REFRESH, grid);
}

/**
 * @description Set the grid fullness state
 * @param {boolean} isFull
 */
function setGridIsFull(isFull: boolean): void {
  commit(Mutations.GRID_IS_FULL, isFull);
}

/**
 * @description Move tetromino one step down
 */
function fallOneStep(): void {
  if (playerAction.value !== ControlKeys.DOWN && playerAction.value !== ControlKeys.SPACE) {
    dispatch(Actions.TETROMINO_MOVE, ControlKeys.DOWN);
  }
}

/**
 * @description Start the tetromino falling
 */
function startFalling(): void {
  isFalling = true;
  fallOneStep();
  fallingTimeout = setTimeout(startFalling, fallDelay.value);
}

/**
 * @description Stop the tetromino falling
 */
function stopFalling(): void {
  isFalling = false;
  clearTimeout(fallingTimeout);
}

/**
 * @description Calculate the new grid on tetromino's changes
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
        console.log(error);
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

onUnmounted(() => {
  stopFalling();
});
</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, y) of grid" :key="y">
      <GameGridCell class="cell" v-for="(cell, x) of row" :key="y + '.' + x" :coords="{ x, y }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board {
  display: grid;
  /*grid-template-columns: repeat(10, minmax(10px, 30px));*/
  border: 5px solid #000;
  margin: 0 auto;
  padding: 1px;

  .row {
    display: flex;

    .cell {
      flex: 1;
    }
  }
}
</style>
