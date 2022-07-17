<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import State from "./@types/state.interface";
import GameBackground from "./components/GameBackground.vue";
import GameBoard from "./components/GameBoard.vue";
import GameOptions from "./components/GameOptions.vue";
import Actions from "./utils/enums/Actions";
import Getters from "./utils/enums/Getters";

const store = useStore<State>();
const gameHasBegun = computed<boolean>(() => store.getters[Getters.GAME_HAS_BEGUN]);
const showOptions = computed(() => !store.getters[Getters.GAME_IS_RUNNING]);

function start() {
  store.dispatch(Actions.GAME_START);
}
</script>

<template>
  <div>
    <h1 class="title"><img src="@/assets/title.png" title="Recycled Tetris" /></h1>
    <div class="pre-start-view" v-if="!gameHasBegun">
      <div class="buttons-container">
        <button class="nes-btn is-error" @click.passive="start">PLAY</button>
      </div>
      <!-- COMMAND LIST -->
      <div class="command-list nes-container with-title is-centered is-rounded">
        <h3 class="title">Command List</h3>
        <ul class="nes-list">
          <li>
            <span class="nes-text is-error">[<i class="nes-icon caret-up is-small"></i>]</span
            >:rotate bottle
          </li>
          <li>
            <span class="nes-text is-primary">[<i class="nes-icon caret-down is-small"></i>]</span
            >:move down tetromino
          </li>
          <li>
            <span class="nes-text is-primary">[<i class="nes-icon caret-left is-small"></i>]</span
            >:move left tetromino
          </li>
          <li>
            <span class="nes-text is-primary">[<i class="nes-icon caret-right is-small"></i>]</span
            >:move right tetromino
          </li>
          <li><span class="nes-text is-warning">[SPACE]</span>:push down tetromino</li>
          <li><span class="nes-text">[P/Esc]</span>:open/close menu</li>
        </ul>
      </div>
    </div>
    <game-board v-if="gameHasBegun" />
    <game-options v-if="showOptions && gameHasBegun" />
    <game-background />
  </div>
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

.pre-start-view {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  .command-list {
    font-size: 0.8rem;
    margin-bottom: 2rem;
    background-color: #fff;
    &.nes-container {
      padding: {
        left: 1rem;
        right: 1rem;
      }
    }

    .nes-list {
      padding: 0;

      li {
        text-align: left;
      }
    }
  }
}
</style>

<style lang="scss">
#app {
  position: relative;
  padding: 1px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
