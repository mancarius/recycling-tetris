<template>
  <div class="container">
    <div class="grid" ref="gridElement">
      <div class="row" v-for="(row, y) of grid" :key="y">
        <GameGridCell class="cell" v-for="(cell, x) of row" :key="y + '.' + x" :coords="{ x, y }" />
      </div>
    </div>
    <div class="background">
      <game-grid-background :size="gridSize" />
    </div>
  </div>
</template>

<script setup lang="ts" src="script.ts" />

<style scoped lang="scss" src="style.scss" />
