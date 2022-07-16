<script setup lang="ts">
import State from "@/@types/state.interface";
import Actions from "@/utils/enums/Actions";
import Getters from "@/utils/enums/Getters";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore<State>();
const show = computed(() => !store.getters[Getters.GAME_IS_RUNNING]);
const gameHasBegun = computed(() => store.getters[Getters.GAME_HAS_BEGUN]);
const gameIsPaused = computed(() => store.getters[Getters.GAME_IS_PAUSED]);
const gameIsOver = computed(() => store.getters[Getters.GAME_IS_OVER]);

function resume() {
  store.dispatch(Actions.GAME_RESUME);
}

function start() {
  store.dispatch(Actions.GAME_START);
};

function restart() {
  store.dispatch(Actions.GAME_RESET);
  store.dispatch(Actions.GAME_START);
}

function exit() {
  store.dispatch(Actions.GAME_RESET);
}
</script>

<template>
  <div v-if="show" class="game-options nes-container is-rounded">
    <h2>
      <span v-if="!gameHasBegun" class="nes-text is-success">Game Start</span>
      <span v-else-if="gameIsOver" class="nes-text is-error">Game Over</span>
      <span v-else-if="gameIsPaused" class="blink">Pause</span>
    </h2>
    <ul class="options nes-container is-rounded">
      <li v-if="!gameHasBegun">
        <a tabindex="1" href="#" @click="start">Start</a>
      </li>
      <li v-else-if="gameIsPaused">
        <a tabindex="1" href="#" @click="resume">Resume</a>
      </li>
      <li v-if="gameIsOver || gameIsPaused">
        <a tabindex="1" href="#" @click="restart">Restart</a>
      </li>
      <li v-if="gameIsPaused">
        <a tabindex="2" href="#" @click="exit">Exit</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.game-options {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem !important;
  text-align: center;

  ul.options {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      a {
        display: block;
        text-align: center;
        padding: 0.5rem;
      }
    }
  }

  .blink {
    animation: blink 0.5s alternate infinite;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
