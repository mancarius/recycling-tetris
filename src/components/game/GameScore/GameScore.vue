<script setup lang="ts">
import State from "@/@types/state.interface";
import Actions from "@/utils/enums/Actions";
import Getters from "@/utils/enums/Getters";
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  img.bottle {
    max-height: 4rem;
  }

  .score-badge {
    font-size: 2rem;
  }
}
</style>
