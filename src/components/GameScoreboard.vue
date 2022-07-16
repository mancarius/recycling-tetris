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
        Wasted bottles:<span class="value">{{ score }}</span>
      </div>
    </div>
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

  .box {
    margin: 0.25rem;
    padding: 0.5rem;
    background-color: #999999;

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
  }
}
</style>
