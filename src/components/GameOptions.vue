<script setup lang="ts">
import State from "@/@types/state.interface";
import Actions from "@/utils/enums/Actions";
import Getters from "@/utils/enums/Getters";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import GameScore from "./GameScore.vue";

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
.game-options {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem !important;
  text-align: center;
  background-color: #fff !important;

  &>h2.title {
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .score {
    margin: 1rem 0;
    background-color: #fff;
  }

  .nes-badge > span {
    left: 0;
  }

  .menu {
    background-color: #fff;

    ul {
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
