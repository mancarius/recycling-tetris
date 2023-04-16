<script setup lang="ts">
import State from "@type/state.interface";
import Getters from "@enum/Getters";
import { ComputedRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import { DeviceScreen } from "@enum/DeviceScreen.enum";
import RecycledBottlesScore from "@component/common/RecycledBottlesScore/RecycledBottlesScore.vue";

const { getters, state } = useStore<State>();
const level = computed<number>(() => getters[Getters.GAME_LEVEL]);
const removedRows = computed<number>(() => state.game.removedRows);
const bestScore = computed<number | "-">(() => state.game.bestScore || "-");
const recycledBottlesScoreSize = computed<"small" | "medium" | "large">(() => {
  switch (state.core.deviceScreen) {
    case DeviceScreen.mobile:
      return "small";
    case DeviceScreen.tablet:
    default:
      return "medium";
  }
});
const numberFormat = new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 });
const levelCountdown: ComputedRef<{ minutes: string; seconds: string }> = computed(() => {
  const milliseconds = getters[Getters.GAME_LEVEL_COUNTDOWN];
  return {
    minutes: numberFormat.format(moment(milliseconds).minutes()),
    seconds: numberFormat.format(moment(milliseconds).seconds()),
  };
});

/**
 * Time formatter.
 * @param timeToFormat
 * @returns Return a string rappresenting minutes and seconds or only seconds if minutes is zero.
 */
const timeFormatter = ({ minutes, seconds }: { minutes: string, seconds: string }) => (Number(minutes) > 0 ? minutes + ':' : '') + seconds;
</script>

<template>
  <div class="game-scoreboard">

    <div class="box level-container">

      <h6>Level</h6>

      <span class="value">{{ level }}</span>

      <small class="countdown-container">

        {{ timeFormatter(levelCountdown) }} to next

      </small>

    </div>



    <div class="box recycled-rows-score-container">

      <h6>Lines</h6>

      <span class="value">{{ removedRows }}</span>

    </div>



    <div class="box score-container">

      <h6>Score</h6>

      <recycled-bottles-score :size="recycledBottlesScoreSize" />

    </div>



    <div class="box best-score-container">

      <h6>Best score</h6>

      <span class="value"><i class="nes-icon trophy is-small"></i> {{ bestScore }}</span>

    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "./GameScoreboard.scss";
</style>
