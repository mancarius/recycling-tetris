<script setup lang="ts">
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import State from "./@types/state.interface";
import Getters from "./utils/enums/Getters";
import PageBackground from "./components/PageBackground/PageBackground.vue";
import PageFooter from "./components/PageFooter/PageFooter.vue";
import { useRouter } from "vue-router";
import { useResize } from "./composables/resize";
import Mutations from "./utils/enums/Mutations";
import { DeviceScreen } from "./utils/enums/DeviceScreen.enum";

const store = useStore<State>();
const gameHasBegun = computed<boolean>(() => store.getters[Getters.GAME_HAS_BEGUN]);
const router = useRouter();
// Don't need to be reactive. Keep the bootstrap device screen size
const { isDesktop, isTablet, isMobile } = useResize();

/**
 * Set route depending on game status
 */
function routingHandler(hasBegun: boolean): void {
  if (hasBegun) router.push({ name: "Game" });
  else router.push({ name: "Home" });
}

/**
 *  Watch immediatelly the game status for handle routing
 */
watch(gameHasBegun, routingHandler, { immediate: true });

onMounted(() => {
  // Save device screen type in store
  store.commit(
    Mutations.CORE_SET_DEVICE_SCREEN,
    isDesktop.value
      ? DeviceScreen.desktop
      : isTablet.value
      ? DeviceScreen.tablet
      : isMobile.value
      ? DeviceScreen.mobile
      : DeviceScreen.desktop
  );
});
</script>

<!-- Template -->

<template>
  <!-- header -->
  <header>
    <h1 class="title">
      <img src="@/assets/title.png" title="Recycled Tetris" />
    </h1>
  </header>

  <main>
    <!-- router -->
    <router-view></router-view>
  </main>

  <!-- footer -->
  <page-footer class="page-footer" v-if="!gameHasBegun" />

  <!-- background -->
  <page-background />
</template>

<!-- Style -->

<style lang="scss" scoped>
header {
  width: 100%;
  box-sizing: border-box;

  .title {
    padding: 1vh 1rem;
    text-align: center;
    width: auto;
    box-sizing: border-box;

    img {
      width: 100%;
      max-width: 800px;
      box-sizing: border-box;
    }
  }
}

.page-footer {
  margin-bottom: 0.5rem;
}

.nes-container {
  width: fit-content;
  background-color: #ffffff;
}
</style>
