<script setup lang="ts">
import Actions from "@enum/Actions";
import { useStore } from "vuex";


const store = useStore();

function start() {
  store.dispatch(Actions.GAME_START);
}
</script>

<template>
  <div class="pre-start-view">
    <div class="buttons-container">
      <button class="nes-btn is-error" @click.passive="start">PLAY</button>
    </div>
    <!-- COMMAND LIST -->
    <div class="command-list nes-container with-title is-centered is-rounded">
      <h3 class="title">Command List</h3>
      <ul class="nes-list">
        <li>
          <span class="nes-text is-error">[<i class="nes-icon caret-up is-small"></i>]</span>:rotate bottle
        </li>
        <li>
          <span class="nes-text is-primary">[<i class="nes-icon caret-down is-small"></i>]</span>:move down tetromino
        </li>
        <li>
          <span class="nes-text is-primary">[<i class="nes-icon caret-left is-small"></i>]</span>:move left tetromino
        </li>
        <li>
          <span class="nes-text is-primary">[<i class="nes-icon caret-right is-small"></i>]</span>:move right
          tetromino
        </li>
        <li><span class="nes-text is-warning">[SPACE]</span>:push down tetromino</li>
        <li><span class="nes-text">[P/Esc]</span>:open/close menu</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>