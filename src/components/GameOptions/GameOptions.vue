<script setup lang="ts">
import { ref } from "vue";
import State from "@type/state.interface";
import Actions from "@enum/Actions";
import Getters from "@enum/Getters";
import { computed, onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import ControlKeys from "@/utils/enums/ControlKeys";
// @ts-ignore import
import RecicledBottlesScore from "@component/RecicledBottlesScore/RecicledBottlesScore.vue";

const store = useStore<State>();
const gameHasBegun = computed(() => store.getters[Getters.GAME_HAS_BEGUN]);
const gameIsPaused = computed(() => store.getters[Getters.GAME_IS_PAUSED]);
const gameIsOver = computed(() => store.getters[Getters.GAME_IS_OVER]);
const score = computed(() => store.getters[Getters.GAME_SCORE]);
const menuElement = ref();
const eventListenerController = new AbortController();
const eventListenerSignal = eventListenerController.signal;

/** Continue the current game */
function resume() {
  store.dispatch(Actions.GAME_RESUME);
}

/** Reset the game and restart */
function restart() {
  store.dispatch(Actions.GAME_RESET);
  store.dispatch(Actions.GAME_START);
}

/** Exit game */
function exit() {
  store.dispatch(Actions.GAME_RESET);
}

/** Handle user navigation in menu */
function menuNavigationHandler(e: KeyboardEvent) {
  e.preventDefault();
  const { code: actionCode } = e;

  const focusedAnchor = (menuElement.value.querySelector("li > a:focus") ||
    menuElement.value?.querySelector("li:first-of-type > a")) as HTMLAnchorElement;
  const { parentNode } = focusedAnchor;
  let nextNode: HTMLElement | null = null;

  if (actionCode === ControlKeys.UP) {
    nextNode = (parentNode?.previousSibling ?? parentNode) as HTMLElement;
  } else if (actionCode === ControlKeys.DOWN) {
    nextNode = (parentNode?.nextSibling ?? parentNode) as HTMLElement;
  } else if (actionCode === ControlKeys.SPACE || actionCode === ControlKeys.ENTER) {
    focusedAnchor?.click();
    return;
  }

  (nextNode?.firstChild as unknown as any)?.focus();
}


/******* Component's Hooks *******/


onMounted(() => {
  // use setTimeout to focus element after click event stop on menu button(otherwise lost focus)
  setTimeout(() => menuElement.value?.querySelector("li:first-of-type > a")?.focus());

  document.addEventListener<"keydown">("keydown", menuNavigationHandler, {
    capture: true,
    signal: eventListenerSignal,
  });
});

onBeforeUnmount(() => {
  eventListenerController.abort(); // remove event listeners
});
</script>

<template>
  <div class="game-options-backdrop">
    <div class="game-options-dialog nes-container is-rounded">
      <h2 class="title">
        <span v-if="gameIsOver" class="nes-text is-error">Game Over</span>
        <span v-else-if="gameIsPaused" class="blink">Pause</span>
      </h2>
      <!-- SCORE -->
      <div class="score nes-container with-title is-centered is-rounded" v-if="gameIsOver">
        <h3 class="title">Recycled</h3>
        <recicled-bottles-score size="large" />
      </div>
      <!-- MENU -->
      <div class="menu nes-container with-title is-centered is-rounded">
        <h3 class="title">Menu</h3>
        <ul ref="menuElement">
          <li v-if="gameIsPaused">
            <a tabindex="1" href="#" @click="resume">Resume</a>
          </li>
          <li v-if="gameIsOver || gameIsPaused">
            <a tabindex="2" href="#" @click="restart">{{ gameIsOver ? "Retray" : "Restart" }}</a>
          </li>
          <li v-if="gameIsOver || gameIsPaused">
            <a tabindex="3" href="#" @click="exit">Exit</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./GameOptions.scss";
</style>
