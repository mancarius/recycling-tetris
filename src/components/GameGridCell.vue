<script setup lang="ts">
import Coords from "@/@types/coords.interface";
import { Cell } from "@/@types/grid.interface";
import State from "@/@types/state.interface";
import { TetrominoShapePoint } from "@/@types/tetromino.interface";
import { computed, ComputedRef, onMounted, reactive, Ref, ref, watch } from "vue";
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
  (_) => {
    if (cell.value && element.value) {
      const { local, rotation } = cell.value;
      classes.draw = true;
      element.value.style.transform = `rotate(${rotation}deg)`;
      element.value.style.backgroundPositionX = `${(local.x + 1) * 25}%`;
      element.value.style.backgroundPositionY = `${(local.y + 1) * 25}%`;
    } else if (element.value) {
      element.value.style.transform = `rotate(0deg)`;
      classes.draw = false;
    }
  },
  {
    deep: true,
  }
);

onMounted(() => {
  //
});
</script>

<template>
  <div class="cell" :class="classes" ref="element"></div>
</template>

<style lang="scss" scoped>
.cell {
  aspect-ratio: 1/1;
  // border: 1px solid #aaa;

  &.draw {
    background-image: url(@/assets/bottle/sad-bottle.png);
    background-size: cover;
  }

  .sadBottle {
    background-image: url(@/assets/bottle/sad-bottle.png);
  }
}
</style>
