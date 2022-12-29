<script setup lang="ts">
import Actions from "@enum/Actions";
import ControlKeys from "@enum/ControlKeys";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { useStore } from "vuex";
import State from "@type/state.interface";
import Getters from "@enum/Getters";

const store = useStore<State>();
const playerAction = computed(() => store.state.game.playerAction);
const canMove = computed(() => store.getters[Getters.GAME_IS_RUNNING]);
const eventListenerController = new AbortController();
const eventListenerSignal = eventListenerController.signal;

function pause() {
  store.dispatch(Actions.GAME_STOP);
}

function actionStart(value: ControlKeys | KeyboardEvent) {
  const actionCode =
    typeof value === "object" ? (Reflect.get(value, "code") as ControlKeys) : value;

  if (actionCode === ControlKeys.ESCAPE || actionCode === ControlKeys.PAUSE) {
    store.dispatch(Actions.GAME_STATE_TOGGLE);
  } else if (playerAction.value !== actionCode && canMove.value) {
    store.dispatch(Actions.GAME_PLAYER_ACTION_START, actionCode);
  }
}

function actionStop() {
  store.dispatch(Actions.GAME_PLAYER_ACTION_STOP);
}

onMounted(() => {
  document.addEventListener<"keydown">("keydown", actionStart, {
    passive: true,
    capture: true,
    signal: eventListenerSignal,
  });
  document.addEventListener<"keyup">("keyup", actionStop, {
    passive: true,
    capture: true,
    signal: eventListenerSignal,
  });
});

onBeforeUnmount(() => {
  // remove event listeners
  eventListenerController.abort();
});
</script>

<template>
  <div class="game-actions">
    <div class="space">
      <button
        tabindex="-1"
        class="nes-btn is-warning"
        @mousedown.passive="actionStart(ControlKeys.SPACE)"
        @mouseup.passive="actionStop"
        :disabled="!canMove"
      >
        <div>PUSH</div>
        <div>DOWN</div>
      </button>
    </div>
    <div class="menu">
      <button
        tabindex="-1"
        class="nes-btn"
        @mousedown.passive="pause"
        @mouseup.passive="actionStop"
        :disabled="!canMove"
      >
        MENU
      </button>
    </div>
    <div class="directions">
      <div class="wrapper">
        <button
          tabindex="-1"
          class="nes-btn is-error control-up"
          @mousedown.passive="actionStart(ControlKeys.UP)"
          @mouseup.passive="actionStop"
          :disabled="!canMove"
        >
          <i class="nes-icon caret-up is-small"></i>
        </button>
        <button
          tabindex="-1"
          class="nes-btn is-primary control-left"
          @mousedown.passive="actionStart(ControlKeys.LEFT)"
          @mouseup.passive="actionStop"
          :disabled="!canMove"
        >
          <i class="nes-icon caret-left is-small"></i>
        </button>
        <button
          tabindex="-1"
          class="nes-btn is-primary control-down"
          @mousedown.passive="actionStart(ControlKeys.DOWN)"
          @mouseup.passive="actionStop"
          :disabled="!canMove"
        >
          <i class="nes-icon caret-down is-small"></i>
        </button>
        <button
          tabindex="-1"
          class="nes-btn is-primary control-right"
          @mousedown.passive="actionStart(ControlKeys.RIGHT)"
          @mouseup.passive="actionStop"
          :disabled="!canMove"
        >
          <i class="nes-icon caret-right is-small"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./GameControls.scss";
</style>
