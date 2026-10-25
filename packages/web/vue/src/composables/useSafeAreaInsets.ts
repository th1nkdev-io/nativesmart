import { onBeforeUnmount, onMounted, readonly, ref } from "vue";

export type SafeAreaInsets = { top: number; right: number; bottom: number; left: number };

/**
 * The screen's safe area insets in CSS pixels: notch, status bar, home indicator, rounded corners.
 *
 * Read from `env(safe-area-inset-*)` through a hidden probe, so they follow rotation. They are 0
 * unless the page declares `viewport-fit=cover` in its viewport meta tag.
 */
export function useSafeAreaInsets() {
  const insets = ref<SafeAreaInsets>({ top: 0, right: 0, bottom: 0, left: 0 });
  let probe: HTMLElement | undefined;

  function measure() {
    if (!probe) return;
    const style = getComputedStyle(probe);
    insets.value = {
      top: parseFloat(style.paddingTop) || 0,
      right: parseFloat(style.paddingRight) || 0,
      bottom: parseFloat(style.paddingBottom) || 0,
      left: parseFloat(style.paddingLeft) || 0
    };
  }

  onMounted(() => {
    probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;inset:0;visibility:hidden;pointer-events:none;" +
      "padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) " +
      "env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";
    document.body.appendChild(probe);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", measure);
    window.removeEventListener("orientationchange", measure);
    probe?.remove();
  });

  return { insets: readonly(insets), measure };
}
