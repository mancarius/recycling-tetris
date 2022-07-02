<script setup lang="ts">
import Actions from "@/utils/enums/Actions";
import ControlKeys from "@/utils/enums/ControlKeys";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { useStore } from "vuex";
import State from "@/@types/state.interface";

const store = useStore<State>();
const playerAction = computed(() => store.state.game.playerAction);
const canMove = computed(() => store.state.game.isRunning);
let movingInterval: NodeJS.Timeout;
const movingSpeed = 100;

const moveTetromino = (value: ControlKeys) => store.dispatch(Actions.TETROMINO_MOVE, value);

const actionStart = (value: ControlKeys | KeyboardEvent) => {
  const direction = typeof value === "object" ? Reflect.get(value, "code") as ControlKeys : value;
  if (playerAction.value !== direction && canMove.value) {
    store.dispatch(Actions.GAME_PLAYER_ACTION_START, direction);
  }
};

const actionStop = () => {
  store.dispatch(Actions.GAME_PLAYER_ACTION_STOP);
};

watch(playerAction, (next) => {
  clearInterval(movingInterval);
  if (next !== null) {
    moveTetromino(next);
    if (playerAction.value !== ControlKeys.UP) {
      movingInterval = setInterval(() => moveTetromino(next), movingSpeed);
    }
  }
});

onMounted(() => {
  window.addEventListener<"keydown">("keydown", actionStart, { passive: true });
  window.addEventListener<"keyup">("keyup", actionStop, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener<"keydown">("keydown", actionStart);
  window.removeEventListener<"keyup">("keyup", actionStop);
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
