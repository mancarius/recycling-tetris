import { onBeforeUnmount, onMounted, ref } from "vue";

/** Composable to get page visibility */
export function usePageVisibility() {
  const pageHidden = ref<any>(null);

  function onChange(event: any) {
    pageHidden.value = event.currentTarget.hidden;
  }

  onMounted(() => {
    document.addEventListener("visibilitychange", onChange);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("visibilitychange", onChange);
  });

  return {
    pageHidden
  }
}
