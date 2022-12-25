<script setup lang="ts">
// @ts-ignore import
import GameControls from "./components/GameControls/GameControls.vue";
// @ts-ignore import
import GameScoreboard from "./components/GameScoreboard/GameScoreboard.vue";
// @ts-ignore import
import GameGrid from "./components/GameGrid/GameGrid.vue";
import { useStore } from "vuex";
import { Ref, ref, watch, reactive, computed } from "@vue/runtime-core";
import Getters from "@enum/Getters";
import moment from "moment";
import Actions from "@enum/Actions";
import State from "@type/state.interface";
import { DeviceScreen } from "@enum/DeviceScreen.enum";
import { LEVEL_COUNTDOWN_INTERVAL } from "@config";
import { onBeforeUnmount, onMounted } from "vue";
import ControlKeys from "@util/enums/ControlKeys";
import { MOVING_SPEED_TIME_INTERVAL } from "@config";
import { onBeforeRouteLeave } from "vue-router";

const store = useStore<State>();
let levelCountdown: NodeJS.Timer;
let levelCountdownDuration: moment.Duration = moment.duration(LEVEL_COUNTDOWN_INTERVAL);
const timeLeft: Ref<number> = ref(levelCountdownDuration.asMilliseconds());
const isMobileScreen = computed<boolean>(
  () => store.state.core.deviceScreen === DeviceScreen.mobile
);
const gameIsRunning = computed<boolean>(() => store.getters[Getters.GAME_IS_RUNNING]);
const playerAction = computed(() => store.state.game.playerAction);
let movingInterval: NodeJS.Timeout;
let longPressTimeout: NodeJS.Timeout;
const sectionClassList = reactive({
  "nes-container": !isMobileScreen.value,
  "is-rounded": !isMobileScreen.value,
});

/** Pause the game */
function stopGame(): void {
  store.dispatch(Actions.GAME_STOP);
}

/**
 * Move tetromino according to the given 'action'
 * @param action
 */
function moveTetromino(action: ControlKeys): void {
  store.dispatch(Actions.TETROMINO_MOVE, action);
}

/** Reset countdown */
function resetCountdown(): void {
  levelCountdownDuration = moment.duration(LEVEL_COUNTDOWN_INTERVAL);
}

/** Update countdown */
function refreshTime(): void {
  timeLeft.value = levelCountdownDuration.subtract(1000).asMilliseconds();
}

/**
 * Start or stop countdown depending on run param
 * @param run
 */
function levelCountdownHandler(run: boolean): void {
  if (run) levelCountdownStart();
  else levelCountdownStop();
}

/** Start countdown */
function levelCountdownStart(): void {
  levelCountdown = setInterval(refreshTime, 1000);
}

/** Stop countdown */
function levelCountdownStop(): void {
  clearInterval(levelCountdown);
}

/** Increment level by one step */
function incrementLevel(): void {
  store.dispatch(Actions.GAME_LEVEL_INCREMENT);
}

/******* Watchers *******/

watch(gameIsRunning, levelCountdownHandler);

watch(timeLeft, (time) => {
  const isTimeExpired = time <= 0;

  if (isTimeExpired) {
    incrementLevel();
    resetCountdown();
  }

  store.dispatch(Actions.GAME_LEVEL_SET_COUNTDOWN, timeLeft.value);
});

watch(playerAction, (action) => {
  clearInterval(movingInterval);
  clearTimeout(longPressTimeout);

  if (action !== null) {
    moveTetromino(action);
    if (playerAction.value !== ControlKeys.UP) {
      longPressTimeout = setTimeout(() => {
        movingInterval = setInterval(() => {
          action ? moveTetromino(action) : clearInterval(movingInterval);
        }, MOVING_SPEED_TIME_INTERVAL);
      }, MOVING_SPEED_TIME_INTERVAL);
    }
  }
});

/******* Component's Hooks *******/

onMounted(() => {
  gameIsRunning.value && levelCountdownStart();
});

onBeforeUnmount(() => {
  clearInterval(movingInterval);
  clearTimeout(longPressTimeout);
});

onBeforeRouteLeave((_to, _from, next) => {
  if (gameIsRunning.value) {
    stopGame();
    next(false); // cancel navigation
  } else next();
});
</script>

<template>
  <section class="game-container">
    <game-grid class="game-board-container" />
    <game-controls
      class="game-controls-container"
      :class="sectionClassList"
      v-if="!isMobileScreen"
    />
    <game-scoreboard class="game-scoreboard-container" :class="sectionClassList" />
  </section>
</template>

<style lang="scss" scoped>
@import "./GameBoard.scss";
</style>
