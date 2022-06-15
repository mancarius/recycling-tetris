<template>
  <div class="cell" :class="classes" ref="element"></div>
</template>

<script setup lang="ts">
import Coords from "@/@types/coords.interface";
import { Cell } from "@/@types/grid.interface";
import { TetrominoShapePoint } from "@/@types/tetromino.interface";
import Getters from "@/utils/enums/Getters";
import { computed, ComputedRef, onMounted, reactive, Ref, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  coords: Coords;
}>();
const store = useStore();
const { x, y } = props.coords as TetrominoShapePoint;
const cell: ComputedRef<Cell> = computed(() => store.getters[Getters.GRID][y][x]);
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
