import { onBeforeUnmount, ref } from "vue";

/** Copies text to the clipboard and exposes a short-lived "copied" flag for feedback. */
export function useCopy() {
  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1400);
  }

  onBeforeUnmount(() => clearTimeout(timer));
  return { copied, copy };
}
