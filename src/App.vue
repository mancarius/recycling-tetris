<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import State from "@type/state.interface";
import Getters from "@enum/Getters";
import AppLogo from "@component/common/AppLogo.vue";
import PageBackground from "@component/PageBackground/PageBackground.vue";
import PageFooter from "@component/PageFooter/PageFooter.vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
import { useResize } from "@composable/resize";
import Mutations from "@enum/Mutations";
import { DeviceScreen } from "@enum/DeviceScreen.enum";

const store = useStore<State>();
const gameHasBegun = computed<boolean>(() => store.getters[Getters.GAME_HAS_BEGUN]);
const router = useRouter();
const route = useRoute();
const currentRoute = computed<RouteRecordName | null | undefined>(() => route.name);
// Don't need to be reactive. Keep the bootstrap device screen size
const { isDesktop, isTablet, isMobile, deviceType } = useResize();
const headerClasses = computed(() => ({
  "on-top": isDesktop.value || currentRoute.value === "Home",
}));

/** Set route depending on game status */
function routingHandler(hasBegun: boolean): void {
  if (hasBegun) router.push({ name: "Game" });
  else router.push({ name: "Home" });
}

/** Watch immediatelly the game status for handle routing */
watch(gameHasBegun, routingHandler, { immediate: true });

/** Refresh page when device change */
watch(deviceType, (next, prev) => {
  prev !== undefined && next !== prev && router.go(0);
});

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
  <header :class="headerClasses">
    <h1 class="title">
      <app-logo class="logo"></app-logo>
    </h1>
  </header>
  <!-- /header -->

  <!-- body -->
  <main>
    <!-- router -->
    <router-view></router-view>
    <!-- /router -->
  </main>
  <!-- /body -->

  <!-- footer -->
  <page-footer class="page-footer" v-if="!gameHasBegun" />
  <!-- /footer -->

  <!-- background -->
  <page-background />
  <!-- /background -->
</template>

<!-- Style -->

<style lang="scss" scoped>
@import "src/styles/globals";

header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(.on-top) {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.8;
  }

  .title {
    padding: 1vh 1rem;
    text-align: center;
    width: auto;
    box-sizing: border-box;

    .logo {
      width: 100%;
      max-width: 800px;

      @media only screen and (max-width: #{screenBreakpoints('tabletMax')}) {
        max-width: 80vw;
      }
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
