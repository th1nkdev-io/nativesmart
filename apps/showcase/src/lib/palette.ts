import { ref } from "vue";

/** Whether the search palette is open. Shared by its triggers and the palette itself. */
export const paletteOpen = ref(false);

/** True on Apple platforms, where the shortcut reads ⌘K instead of Ctrl K. */
export const isApple = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
export const shortcutLabel = isApple ? "⌘K" : "Ctrl K";
