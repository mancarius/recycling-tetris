<script setup lang="ts">
import State from "@/@types/state.interface";
import Getters from "@/utils/enums/Getters";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import GameBoard from "@/components/GameBoard.vue";
import GameOptions from "@/components/GameOptions.vue";

const store = useStore<State>();
const showOptions = computed(() => !store.getters[Getters.GAME_IS_RUNNING]);
</script>

<template>
  <game-board/>
  <game-options v-if="showOptions" />
</template>