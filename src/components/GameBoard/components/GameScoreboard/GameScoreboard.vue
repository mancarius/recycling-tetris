<script setup lang="ts">
import State from "@type/state.interface";
import Getters from "@enum/Getters";
import { ComputedRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import GameScore from "@component/GameScore/GameScore.vue";

const { getters, state } = useStore<State>();
const level = computed<number>(() => getters[Getters.GAME_LEVEL]);
const removedRows = computed<number>(() => state.game.removedRows);
const bestScore = computed<number | "-">(() => state.game.bestScore || "-");
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
    <div class="box level-container">
      <h6>Level</h6>
      <span class="value">{{ level }}</span>
      <small class="countdown-container">
        next level in {{ levelCountdown.minutes }}:{{ levelCountdown.seconds }}
      </small>
    </div>

    <div class="box score-container">
      <h6>Recycled</h6>
      <game-score />
    </div>

    <div class="box recycled-rows-score-container">
      <h6>Recycled rows</h6>
      <span class="value">{{ removedRows }}</span>
    </div>

    <div class="box best-score-container">
      <h6>Best score</h6>
      <span class="value">{{ bestScore }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/styles/globals";
@import "./GameScoreboard.scss";
</style>
