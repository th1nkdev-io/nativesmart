export * from "./components";
export { defaultIcons, iconNames, registerIcons, type NsIconName } from "./icons";
export { useKeyboardInset } from "./composables/useKeyboardInset";
export { useSafeAreaInsets, type SafeAreaInsets } from "./composables/useSafeAreaInsets";
export { Nativesmart, type NativesmartOptions } from "./plugin";

/** Contract ids implemented by this renderer. Kept in sync with the platform registry. */
export const implementedComponents = [
  "aspect-ratio",
  "avatar",
  "badge",
  "box",
  "button",
  "card",
  "container",
  "divider",
  "grid",
  "icon",
  "input",
  "keyboard-avoider",
  "modal",
  "safe-area",
  "scroll-area",
  "spinner",
  "text",
  "toast"
] as const;
