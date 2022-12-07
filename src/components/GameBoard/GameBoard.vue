<script setup lang="ts">
import GameControls from "./components/GameControls/GameControls.vue";
import GameScoreboard from "./components/GameScoreboard/GameScoreboard.vue";
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


const store = useStore<State>();
let levelCountdown: NodeJS.Timer;
let levelCountdownDuration: moment.Duration = moment.duration(LEVEL_COUNTDOWN_INTERVAL);
const timeLeft: Ref<number> = ref(levelCountdownDuration.asMilliseconds());
const isMobileScreen = computed<boolean>(() => store.state.core.deviceScreen === DeviceScreen.mobile);
const gameIsRunning = computed<boolean>(() => store.getters[Getters.GAME_IS_RUNNING]);
const playerAction = computed(() => store.state.game.playerAction);
let movingInterval: NodeJS.Timeout;
let longPressTimeout: NodeJS.Timeout;
const containerClassList = computed(() => ({
  "nes-container": !isMobileScreen.value,
  "is-centered": !isMobileScreen.value,
  "is-rounded": !isMobileScreen.value
}));
const moveTetromino = (value: ControlKeys) => store.dispatch(Actions.TETROMINO_MOVE, value);

console.log({containerClassList})

/**
 * Reset countdown
 */
function resetCountdown() {
  levelCountdownDuration = moment.duration(LEVEL_COUNTDOWN_INTERVAL);
}

/**
 * Update countdown
 */
function refreshTime() {
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

/**
 *  Start countdown
 */
function levelCountdownStart() {
  levelCountdown = setInterval(refreshTime, 1000);
}

/**
 *  Stop countdown
 */
function levelCountdownStop() {
  clearInterval(levelCountdown);
}

/**
 *  Increment level by one step
 */
function incrementLevel() {
  store.dispatch(Actions.GAME_LEVEL_INCREMENT);
}

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

onMounted(() => {
  gameIsRunning.value && levelCountdownStart();
});

onBeforeUnmount(() => {
  clearInterval(movingInterval);
  clearTimeout(longPressTimeout);
});
</script>

<template>
  <main>
    <div :class="containerClassList">
      <section class="game-container">
        <div class="game-board-container">
          <GameGrid />
        </div>
        <div class="game-controls-container" v-if="!isMobileScreen">
          <GameControls />
        </div>
        <div class="game-scoreboard-container">
          <GameScoreboard />
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import './GameBoard.scss';
</style>
