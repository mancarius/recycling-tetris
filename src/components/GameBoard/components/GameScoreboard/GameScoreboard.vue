<script setup lang="ts">
import State from "@type/state.interface";
import Getters from "@enum/Getters";
import { ComputedRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import * as GameScore from "@/components/GameScore/GameScore.vue";

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
@import './GameScoreboard.scss';
</style>
