<script setup lang="ts">
import State from "@type/state.interface";
import Actions from "@enum/Actions";
import Getters from "@enum/Getters";
import { computed } from "@vue/runtime-core";
import { watch } from "vue";
import { useStore } from "vuex";

const store = useStore<State>();
const score = computed<number>(() => store.getters[Getters.GAME_SCORE]);

/**
 * Update best score
 */
function updateBestScore(newScore: number) {
  store.dispatch(Actions.GAME_SET_BEST_SCORE, newScore);
}

watch(score, updateBestScore);
</script>

<template>
  <div class="container">
    <img class="bottle" src="@/assets/bottle/happy-bottle.png" />X
    <span class="nes-text score-badge" :class="{ 'is-success': score > 0, 'is-error': score === 0 }">{{ score }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import './GameScore.scss';
</style>
