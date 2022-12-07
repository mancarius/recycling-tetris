import { SCREEN_BREAKPOINTS } from "@config";
import { onMounted, onUnmounted, reactive, Ref, ref } from "vue";

export interface useResize {
  size: {
    innerWidth: number;
    innerHeight: number;
  };
  isMobile: Ref<boolean>;
  isTablet: Ref<boolean>;
  isDesktop: Ref<boolean>;
}


export function useResize(): useResize {
  const size = reactive({
    innerWidth: 0,
    innerHeight: 0,
  });
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  function onResize(e: Partial<UIEvent>) {
    const { currentTarget: target } = e;
    const { outerWidth, outerHeight } = target as Window;

    size.innerWidth = innerWidth;
    size.innerHeight = innerHeight;
    isMobile.value = innerWidth <= SCREEN_BREAKPOINTS.mobile.max;
    isTablet.value = innerWidth > SCREEN_BREAKPOINTS.tablet.min && innerWidth < SCREEN_BREAKPOINTS.tablet.max;
    isDesktop.value = innerWidth >= SCREEN_BREAKPOINTS.desktop.min
  }

  onMounted(() => {
    // first load
    onResize({ currentTarget: window });

    // subscribe resize event
    window.addEventListener("resize", onResize, { passive: true })
  });

  onUnmounted(() => {
    // unsubscribe resize event
    window.removeEventListener("resize", onResize);
  })

  return {
    size,
    isMobile,
    isTablet,
    isDesktop
  };
}
