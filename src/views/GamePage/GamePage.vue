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
  <game-board/>
  <game-options v-if="showOptions" />
</template>
