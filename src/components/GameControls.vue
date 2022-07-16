<script setup lang="ts">
import Actions from "@/utils/enums/Actions";
import ControlKeys from "@/utils/enums/ControlKeys";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { useStore } from "vuex";
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { MOVING_SPEED_TIME_INTERVAL } from "@/configs/configs";

const store = useStore<State>();
const playerAction = computed(() => store.state.game.playerAction);
const canMove = computed(() => store.getters[Getters.GAME_IS_RUNNING]);
let movingInterval: NodeJS.Timeout;
let longPressTimeout: NodeJS.Timeout;
const eventListenerController = new AbortController();
const eventListenerSignal = eventListenerController.signal;

const moveTetromino = (value: ControlKeys) => store.dispatch(Actions.TETROMINO_MOVE, value);

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
  if (longPressTimeout) {
    clearTimeout(longPressTimeout);
    clearInterval(movingInterval);
  }
  store.dispatch(Actions.GAME_PLAYER_ACTION_STOP);
}

watch(playerAction, (next) => {
  if (next !== null) {
    moveTetromino(next);

    if (playerAction.value !== ControlKeys.UP) {
      longPressTimeout = setTimeout(() => {
        movingInterval = setInterval(() => moveTetromino(next), MOVING_SPEED_TIME_INTERVAL);
      }, MOVING_SPEED_TIME_INTERVAL * 2);
    }
  }
});

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
  <div class="comands">
    <button
      class="nes-btn is-primary"
      @mousedown.passive="actionStart(ControlKeys.LEFT)"
      @mouseup.passive="actionStop()"
    >
      <i class="nes-icon caret-left is-small"></i>
    </button>
    <button
      class="nes-btn is-primary"
      @mousedown.passive="actionStart(ControlKeys.RIGHT)"
      @mouseup.passive="actionStop()"
    >
      <i class="nes-icon caret-right is-small"></i>
    </button>
    <button
      class="nes-btn is-error"
      @mousedown.passive="actionStart(ControlKeys.UP)"
      @mouseup.passive="actionStop()"
    >
      <i class="nes-icon caret-up is-small"></i>
    </button>
    <button
      class="nes-btn is-error"
      @mousedown.passive="actionStart(ControlKeys.DOWN)"
      @mouseup.passive="actionStop()"
    >
      <i class="nes-icon caret-down is-small"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.comands {
  border: 5px solid #000;
  padding: 5px;
  display: flex;
  gap: 10px;

  & > * {
    flex: 1;
  }
}
</style>
