<script setup lang="ts">
import { useResize } from "@/composables/resize";
import Actions from "@enum/Actions";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import SingleLeftTapImage from "@asset/gestures/gesture-single-left-tap.png"
import SingleRightTapImage from "@asset/gestures/gesture-single-right-tap.png"
import SwipeUpImage from "@asset/gestures/gesture-swipe-up.png"
import SwipeDownImage from "@asset/gestures/gesture-swipe-down.png"
import State from "@type/state.interface";
import { DeviceScreen } from "@util/enums/DeviceScreen.enum";


const store = useStore<State>();
const mobileScreen = computed<boolean>(() => store.state.core.deviceScreen === DeviceScreen.mobile);

function start() {
  store.dispatch(Actions.GAME_START);
}
</script>

<template>
  <div class="pre-start-view">
    <!-- COMMAND LIST -->
    <div class="command-list-container nes-container with-title is-centered is-rounded">
      <h3 class="title">Command List</h3>
      <ul class="nes-list command-list">
        <!-- DESKTOP COMMAND LIST -->
        <template v-if="!mobileScreen">
          <li class="command-item">
            <span class="nes-text is-error">[<i class="nes-icon caret-up is-small"></i>]</span>:rotate bottle
          </li>
          <li class="command-item">
            <span class="nes-text is-primary">[<i class="nes-icon caret-down is-small"></i>]</span>:move down bottle
          </li>
          <li class="command-item">
            <span class="nes-text is-primary">[<i class="nes-icon caret-left is-small"></i>]</span>:move left bottle
          </li>
          <li class="command-item">
            <span class="nes-text is-primary">[<i class="nes-icon caret-right is-small"></i>]</span>:move right
            bottle
          </li>
          <li class="command-item"><span class="nes-text is-warning">[SPACE]</span>:push down bottle</li>
          <li class="command-item"><span class="nes-text">[P/Esc]</span>:open/close menu</li>
        </template>

        <!-- MOBILE COMMAND LIST -->
        <template v-else>
          <li class="command-item">
            <img :src="SwipeUpImage" /> Rotate
          </li>
          <li class="command-item">
            <img :src="SwipeDownImage" /> Push down
          </li>
          <li class="command-item">
            <img :src="SingleLeftTapImage" /> Move to left
          </li>
          <li class="command-item">
            <img :src="SingleRightTapImage" /> Move to right
          </li>
          <li class="command-item"><span class="nes-text">[P/Esc]</span>:open/close menu</li>
        </template>
      </ul>
    </div>

    <!-- PLAY BTN -->
    <div class="buttons-container">
      <button class="nes-btn is-error" @click.passive="start">PLAY</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>
