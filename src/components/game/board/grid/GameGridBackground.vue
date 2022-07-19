<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { canvasWavesAnimation } from "@/utils/canvasWavesAnimation"
import { GRID_BACKGROUND_IMAGE } from "@/configs/configs";

interface Props {
  size: {
    width: number,
    height: number
  }
}

const { size } = defineProps<Props>();
const canvas = ref<HTMLCanvasElement>();

/**
 * Set size of HTML canvas element
 */
function setCanvasSize() {
  if (canvas.value && size) {
    canvas.value.width = size.width;
    canvas.value.height = size.height;
  }
}

/**
 * Load source image and animate it in the canvas element
 * 
 * @param src image path from public folder
 * @param width
 * @param height
 */
function loadAndAnimateBackgroundImage(src: string, width: number, height: number) {
  const img = new Image(width, height);
  img.onload = function (_img: Event) { canvasWavesAnimation.call(this, canvas.value!) };
  img.src = src;
}

watch(size, ({ width, height }) => {
  if (width && height) {
    setCanvasSize();
    loadAndAnimateBackgroundImage(`img/${GRID_BACKGROUND_IMAGE}`, width, height);
  }
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>