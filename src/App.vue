<template>
<div>
  <game-board />
  <game-background />
</div>
</template>

<script setup lang="ts">
import GameBackground from "./components/GameBackground.vue";
import GameBoard from "./components/GameBoard.vue";
</script>

<style lang="scss" scoped>
.nes-container {
  width: fit-content;
  background-color: #ffffff;
}

.game-container {
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "board scoreboard"
    "board scoreboard"
    "controls controls";

  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  .game-board-container {
    grid-area: board;
  }

  .game-controls-container {
    grid-area: controls;
  }

  .game-scoreboard-container {
    grid-area: scoreboard;
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
