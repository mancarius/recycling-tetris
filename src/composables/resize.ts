import { SCREEN_BREAKPOINTS } from "@config";
import { DeviceScreen } from "@enum/DeviceScreen.enum";
import { onMounted, onUnmounted, reactive, Ref, ref } from "vue";

export interface useResize {
  size: {
    innerWidth: number;
    innerHeight: number;
  };
  isMobile: Ref<boolean>;
  isTablet: Ref<boolean>;
  isDesktop: Ref<boolean>;
  deviceType: Ref<DeviceScreen | undefined>;
}


export function useResize(): useResize {
  const size = reactive({
    innerWidth: 0,
    innerHeight: 0,
  });
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);
  const deviceType: useResize["deviceType"] = ref();

  function onResize(e: Partial<UIEvent>) {
    const { currentTarget: target } = e;
    const { innerWidth, innerHeight } = target as any || {};

    size.innerWidth = innerWidth;
    size.innerHeight = innerHeight;
    isMobile.value = innerWidth <= SCREEN_BREAKPOINTS.mobile.max;
    isTablet.value = innerWidth > SCREEN_BREAKPOINTS.tablet.min && innerWidth < SCREEN_BREAKPOINTS.tablet.max;
    isDesktop.value = innerWidth >= SCREEN_BREAKPOINTS.desktop.min;

    deviceType.value = isMobile.value
      ? DeviceScreen.mobile
      : isTablet.value
        ? DeviceScreen.tablet
        : DeviceScreen.desktop;
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
    isDesktop,
    deviceType
  };
}
