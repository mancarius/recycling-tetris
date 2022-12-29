<script setup lang="ts">
import State from "@type/state.interface";
import Getters from "@enum/Getters";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import GameBoard from "@component/GameBoard/GameBoard.vue";
import GameOptions from "@component/GameOptions/GameOptions.vue";

const store = useStore<State>();
const showOptions = computed(() => !store.getters[Getters.GAME_IS_RUNNING]);
</script>

<template>
  <Transition>
    <game-options v-if="showOptions" />
  </Transition>

  <game-board />
</template>

<style lang="scss" scoped>
.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-leave-active {
  transition: all 0.1s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
</style>
