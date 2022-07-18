<script setup lang="ts">
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import State from "./@types/state.interface";
import GameBackground from "./components/GameBackground.vue";
import Getters from "./utils/enums/Getters";
import PageFooter from "./components/PageFooter.vue";
import { useRouter } from "vue-router"

const store = useStore<State>();
const gameHasBegun = computed<boolean>(() => store.getters[Getters.GAME_HAS_BEGUN]);
const router = useRouter();

watch(gameHasBegun, hasBegun => {
  if (hasBegun) router.push({ name: "Game" })
  else router.push({ name: "Home" })
}, { immediate: true })
</script>

<template>
  <div>
    <h1 class="title"><img src="@/assets/title.png" title="Recycled Tetris" /></h1>
    <router-view></router-view>
    <game-background />
  </div>
  <page-footer v-if="!gameHasBegun" />
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 2rem;
  text-align: center;

  img {
    max-width: 800px;
  }
}

.nes-container {
  width: fit-content;
  background-color: #ffffff;
}
</style>

<style lang="scss">
#app {
  position: relative;
  padding: 1px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
