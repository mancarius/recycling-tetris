<script setup lang="ts">
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import State from "./@types/state.interface";
import PageBackground from "./components/PageBackground/PageBackground.vue";
import Getters from "./utils/enums/Getters";
import PageFooter from "./components/PageFooter/PageFooter.vue"
import { useRouter } from "vue-router";

const store = useStore<State>();
const gameHasBegun = computed<boolean>(
  () => store.getters[Getters.GAME_HAS_BEGUN]
);
const router = useRouter();

/**
 * Set route depending on game status
 */
function routingHandler(hasBegun: boolean) {
  if (hasBegun) router.push({ name: "Game" });
  else router.push({ name: "Home" });
}

watch(gameHasBegun, routingHandler, { immediate: true });
</script>

<template>
  <header>
    <h1 class="title">
      <img src="@/assets/title.png" title="Recycled Tetris" />
    </h1>
  </header>
  <main>
    <router-view></router-view>
    <page-background />
  </main>
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
