<script setup lang="ts">
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { ComputedRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";

const { getters } = useStore<State>();
const score: ComputedRef<number> = computed(() => getters[Getters.GAME_SCORE]);
const level: ComputedRef<number> = computed(() => getters[Getters.GAME_LEVEL]);
const numberFormat = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2
});
const levelCountdown: ComputedRef<{minutes: string, seconds: string}> = computed(() => {
  const milliseconds = getters[Getters.GAME_LEVEL_COUNTDOWN];
  return {
    minutes: numberFormat.format(moment(milliseconds).minutes()),
    seconds: numberFormat.format(moment(milliseconds).seconds()),
  }
})
</script>

<template>
  <div class="scoreboard">
    <div class="score-container">Score: {{ score }}</div>
    <div class="level-container">Level: {{ level }}</div>
    <div class="countdown-container">{{levelCountdown.minutes}}:{{levelCountdown.seconds}}</div>
  </div>
</template>

<style lang="scss" scoped>
.scoreboard {
  border: 5px solid #000;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
