<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { canvasWavesAnimation } from "@util/canvasWavesAnimation"
import { GRID_BACKGROUND_IMAGE } from "@config";

interface Props {
  size: {
    width: number,
    height: number
  }
}

const props = defineProps<Props>();
const canvas = ref<HTMLCanvasElement>();

/**
 * Set size of HTML canvas element
 */
function setCanvasSize() {
  if (canvas.value && props.size) {
    canvas.value.width = props.size.width;
    canvas.value.height = props.size.height;
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
  img.onload = function () { canvas.value && canvasWavesAnimation.call(this, canvas.value) };
  img.src = src;
}

watch(props.size, ({ width, height }) => {
  if (width && height) {
    setCanvasSize();
    loadAndAnimateBackgroundImage(`img/${GRID_BACKGROUND_IMAGE}`, width, height);
  }
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
