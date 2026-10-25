import { onBeforeUnmount, onMounted, readonly, ref } from "vue";

/** Below this many pixels the change is the browser's toolbar, not a keyboard. */
const threshold = 80;

/**
 * Height of the on-screen keyboard over the page, in CSS pixels; 0 when it is closed.
 *
 * Reads the visual viewport: iOS Safari and Android in overlay mode shrink it while the layout
 * viewport stays put, and the difference is the keyboard. When the browser resizes the whole
 * page instead (Android's default), the inset stays 0: the page already fits above the keyboard.
 */
export function useKeyboardInset() {
  const height = ref(0);
  const visible = ref(false);

  function measure() {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const covered = window.innerHeight - viewport.height - viewport.offsetTop;
    const next = covered > threshold ? Math.round(covered) : 0;
    height.value = next;
    visible.value = next > 0;
  }

  onMounted(() => {
    measure();
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);
  });
  onBeforeUnmount(() => {
    window.visualViewport?.removeEventListener("resize", measure);
    window.visualViewport?.removeEventListener("scroll", measure);
  });

  return { height: readonly(height), visible: readonly(visible), measure };
}
