<script setup lang="ts">
import Coords from "@type/coords.interface";
import { Cell } from "@type/grid.interface";
import State from "@type/state.interface";
import { TetrominoShapePoint } from "@type/tetromino.interface";
import { computed, ComputedRef, reactive, Ref, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  coords: Coords;
}>();
const store = useStore<State>();
const { x, y } = props.coords as TetrominoShapePoint;
const cell: ComputedRef<Cell> = computed(() => store.state.grid.grid[y][x]);
const element: Ref<HTMLDivElement | null> = ref(null);
const classes: Record<string, boolean> = reactive({
  draw: false,
});

watch(
  cell,
  (nextCell) => {
    if (nextCell && element.value) {
      const { local, rotation } = nextCell;
      classes.draw = true;
      element.value.style.transform = `rotate(${rotation}deg)`;
      element.value.style.backgroundPositionX = `0%`;
      element.value.style.backgroundPositionY = `${400 - (local.y + 1) * 100}%`;
    } else if (element.value) {
      element.value.style.transform = `rotate(0deg)`;
      classes.draw = false;
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="cell" :class="classes" ref="element"></div>
</template>

<style lang="scss" scoped>
@import './GameGridCell.scss';
</style>
