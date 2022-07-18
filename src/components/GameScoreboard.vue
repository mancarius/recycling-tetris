<script setup lang="ts">
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { ComputedRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import GameScore from "./GameScore.vue";

const { getters, state } = useStore<State>();
const level = computed<number>(() => getters[Getters.GAME_LEVEL]);
const removedRows = computed<number>(() => state.game.removedRows);
const bestScore = computed<number | "-">(() => state.game.bestScore || "-")
const numberFormat = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
});
const levelCountdown: ComputedRef<{ minutes: string; seconds: string }> = computed(() => {
  const milliseconds = getters[Getters.GAME_LEVEL_COUNTDOWN];
  return {
    minutes: numberFormat.format(moment(milliseconds).minutes()),
    seconds: numberFormat.format(moment(milliseconds).seconds()),
  };
});
</script>

<template>
  <div class="scoreboard">
    <div class="box">
      <div class="level-container">
        Level: <span class="value">{{ level }}</span>
      </div>
      <small class="countdown-container">
        next level in {{ levelCountdown.minutes }}:{{ levelCountdown.seconds }}
      </small>
    </div>

    <div class="box">
      <div class="score-container">
        Recycled:
        <game-score />
      </div>
    </div>

    <div class="box">
      <div class="score-container">
        Recycled rows:<span class="value">{{ removedRows }}</span>
      </div>
    </div>

    <div class="box">
      <div class="best-score-container">
        Best score:<span class="value">{{ bestScore }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scoreboard {
  border: 2px solid #000;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .box {
    margin: 0.25rem;
    padding: 0.5rem;
    background-color: #e2e2e2;

    small {
      opacity: 0.7;
      font-size: 70%;
    }

    .value {
      font-size: 150%;
      display: block;
      margin: 1rem auto;
      font-weight: bold;
    }

    .score-container {
      display: flex;
      flex-flow: column;
      align-content: center;
      gap: 1rem;
    }
  }
}
</style>
