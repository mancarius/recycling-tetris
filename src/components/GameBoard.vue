<script setup lang="ts">
import GameControls from "./GameControls.vue";
import GameScoreboard from "./GameScoreboard.vue";
import GameBackground from "./GameBackground.vue";
import GameGrid from "./GameGrid.vue";
import { useStore } from "vuex";
import { onMounted, Ref, ref, watch } from "@vue/runtime-core";
import Getters from "@/utils/enums/Getters";
import moment from "moment";
import Actions from "@/utils/enums/Actions";

const { getters, dispatch } = useStore();
let levelCountdown: number = 0;
const interval = 1000 * 60 * 1; // 1 minutes
let levelCountdownDuration: moment.Duration = moment.duration(interval);
const timeLeft: Ref<number> = ref(levelCountdownDuration.asMilliseconds());

function resetCountdown() {
  levelCountdownDuration = moment.duration(interval);
}

function refreshTime() {
  timeLeft.value = levelCountdownDuration.subtract(1000).asMilliseconds();
}

function levelCountdownStart() {
  levelCountdown = setInterval(refreshTime, 1000);
}

function levelCountdownStop() {
  clearInterval(levelCountdown);
}

function levelCountdownHandler(run: boolean): void {
  if (run) levelCountdownStart();
  else levelCountdownStop();
}

function incrementLevel() {
  dispatch(Actions.GAME_LEVEL_INCREMENT);
}

function startGame() {
  dispatch(Actions.GAME_START);
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

onMounted(() => {
  startGame();
});
</script>

<template>
  <main>
    <div class="nes-container with-title is-centered">
      <h1 class="title">Recycling Tetris</h1>
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
    <GameBackground />
  </main>
</template>

<style lang="scss" scoped>
.nes-container {
  width: fit-content;
  background-color: #ffffff;
}

.game-container {
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "board scoreboard"
    "board scoreboard"
    "controls controls";

  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  .game-board-container {
    grid-area: board;
  }

  .game-controls-container {
    grid-area: controls;
  }

  .game-scoreboard-container {
    grid-area: scoreboard;
  }
}
</style>

<style lang="scss">
#app {
  position: relative;
  padding: 1px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
