<script setup lang="ts">
import GameControls from "./components/GameControls/GameControls.vue";
import GameScoreboard from "./components/GameScoreboard/GameScoreboard.vue";
import GameGrid from "./components/GameGrid/GameGrid.vue";
import { useStore } from "vuex";
import { Ref, ref, watch } from "@vue/runtime-core";
import Getters from "@enum/Getters";
import moment from "moment";
import Actions from "@enum/Actions";
import State from "@type/state.interface";

const { getters, dispatch } = useStore<State>();
let levelCountdown: NodeJS.Timer;
const interval = 1000 * 60 * 1; // 1 minutes
let levelCountdownDuration: moment.Duration = moment.duration(interval);
const timeLeft: Ref<number> = ref(levelCountdownDuration.asMilliseconds());

/**
 * Reset countdown
 */
function resetCountdown() {
  levelCountdownDuration = moment.duration(interval);
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
  dispatch(Actions.GAME_LEVEL_INCREMENT);
}

watch(() => getters[Getters.GAME_IS_RUNNING], levelCountdownHandler);

watch(timeLeft, (time) => {
  const isTimeExpired = time === 0;

  if (isTimeExpired) {
    incrementLevel();
    resetCountdown();
  }

  dispatch(Actions.GAME_LEVEL_SET_COUNTDOWN, timeLeft.value);
});
</script>

<template>
  <main>
    <div class="nes-container with-title is-centered is-rounded">
      <section class="game-container">
        <div class="game-board-container">
          <GameGrid />
        </div>
        <div class="game-controls-container">
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
