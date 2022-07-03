<script setup lang="ts">
import { calculateFallingDelay } from "@/services/game.service";
import {
  clearNoFrozenCells,
  freezeGrid,
  isGridFull,
  removeSolidRows,
} from "@/services/grid.service";
import {
  getRandomRotation,
  getTetrominoFinalProjection,
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
import { computed, ComputedRef, nextTick, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import BoardCell from "./BoardCell.vue";

const { getters, dispatch, commit, state } = useStore<State>();
const grid: ComputedRef<GridState["grid"]> = computed(() => getters[Getters.GRID]);
const tetromino: ComputedRef<TetrominoState> = computed(() => getters[Getters.TETROMINO]);
let fallingTimer: NodeJS.Timeout;
let isFalling = false;
let gameIsRunning = computed(() => getters[Getters.GAME_IS_RUNNING]);
const playerAction = computed(() => state.game.playerAction);
let fallDelay: ComputedRef<number> = computed(() => calculateFallingDelay(state.game.level));

function stopGame(): void {
  dispatch(Actions.GAME_STOP);
}

function createTetromino(): void {
  dispatch(Actions.TETROMINO_CREATE);
  commit(Mutations.TETROMINO_ROTATION, getRandomRotation());
}

function printGrid(grid: GridState["grid"]): void {
  dispatch(Actions.GRID_REFRESH, grid);
}

function setGridIsFull(value: boolean): void {
  commit(Mutations.GRID_IS_FULL, value);
}

function fallOneStep(): void {
  if (gameIsRunning.value) {
    isFalling = true;
    if (playerAction.value !== ControlKeys.DOWN && playerAction.value !== ControlKeys.SPACE) {
      dispatch(Actions.TETROMINO_MOVE, ControlKeys.DOWN);
    }
    fallingTimer = setTimeout(fallOneStep, fallDelay.value);
  }
}

function stopFalling(): void {
  clearTimeout(fallingTimer);
}

function refreshGrid(next: [Coords, number], prev: [Coords, number]): void {
  const [prevPos, prevRot] = prev;

  let newGrid = printTetrominoOnGrid(tetromino.value, clearNoFrozenCells(grid.value));

  const isValidPosition = newGrid !== false;

  if (isValidPosition) {
    printGrid(newGrid as Cell[][]);
  } else {
    if (isFalling) {
      stopFalling();

      newGrid = freezeGrid(grid.value);

      const solidRowsRemoved = removeSolidRows(newGrid);

      if (!solidRowsRemoved && isGridFull(newGrid)) {
        setGridIsFull(true);
        stopGame();
        return;
      }

      isFalling = false;
      createTetromino();
      printGrid(newGrid as Cell[][]);
      fallOneStep();
    } else {
      commit(Mutations.TETROMINO_POSITION, prevPos);
      commit(Mutations.TETROMINO_ROTATION, prevRot);
    }
  }

  if (isFalling) isFalling = false;
}

function onSpaceKeyPress() {
  commit(Mutations.TETROMINO_POSITION, getTetrominoFinalProjection(tetromino.value, grid.value));
}

watch((): [Coords, number] => [tetromino.value.position, tetromino.value.rotation], refreshGrid);

watch(gameIsRunning, (isRunning) => {
  isRunning ? fallOneStep() : stopFalling();
});

watch(playerAction, (next) => {
  next === ControlKeys.SPACE && onSpaceKeyPress();
});

onUnmounted(() => {
  stopFalling();
});
</script>

<template>
  <div class="board">
    <template v-for="(row, y) of grid">
      <BoardCell v-for="(cell, x) of row" :key="y + '.' + x" :coords="{ x, y }" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.board {
  display: grid;
  grid-template-columns: repeat(10, minmax(10px, 30px));
  border: 5px solid #000;
  margin: 0 auto;
  padding: 1px;
}
</style>
