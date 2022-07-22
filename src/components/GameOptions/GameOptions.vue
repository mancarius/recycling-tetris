<script setup lang="ts">
import State from "@/@types/state.interface";
import Actions from "@/utils/enums/Actions";
import Getters from "@/utils/enums/Getters";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import GameScore from "@/components/GameScore/GameScore.vue";

const store = useStore<State>();
const gameHasBegun = computed(() => store.getters[Getters.GAME_HAS_BEGUN]);
const gameIsPaused = computed(() => store.getters[Getters.GAME_IS_PAUSED]);
const gameIsOver = computed(() => store.getters[Getters.GAME_IS_OVER]);
const score = computed(() => store.getters[Getters.GAME_SCORE]);

function resume() {
  store.dispatch(Actions.GAME_RESUME);
}

function restart() {
  store.dispatch(Actions.GAME_RESET);
  store.dispatch(Actions.GAME_START);
}

function exit() {
  store.dispatch(Actions.GAME_RESET);
}
</script>

<template>
  <div class="game-options nes-container is-rounded">
    <h2 class="title">
      <span v-if="gameIsOver" class="nes-text is-error">Game Over</span>
      <span v-else-if="gameIsPaused" class="blink">Pause</span>
    </h2>
    <!-- SCORE -->
    <div class="score nes-container with-title is-centered is-rounded" v-if="gameIsOver">
      <h3 class="title">Recycled</h3>
      <game-score/>
    </div>
    <!-- MENU -->
    <div class="menu nes-container with-title is-centered is-rounded">
      <h3 class="title">Menu</h3>
      <ul>
        <li v-if="gameIsPaused">
          <a tabindex="2" href="#" @click="resume">Resume</a>
        </li>
        <li v-if="gameIsOver || gameIsPaused">
          <a tabindex="3" href="#" @click="restart">{{
            gameIsOver ? "Retray" : "Restart"
          }}</a>
        </li>
        <li v-if="gameIsOver || gameIsPaused">
          <a tabindex="4" href="#" @click="exit">Exit</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './GameOptions.scss';
</style>
