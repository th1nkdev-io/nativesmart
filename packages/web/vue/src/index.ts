export * from "./components";
export { defaultIcons, iconNames, registerIcons, type NsIconName } from "./icons";
export { Nativesmart, type NativesmartOptions } from "./plugin";

/** Contract ids implemented by this renderer. Kept in sync with the platform registry. */
export const implementedComponents = [
  "aspect-ratio",
  "avatar",
  "badge",
  "box",
  "button",
  "card",
  "divider",
  "icon",
  "input",
  "modal",
  "spinner",
  "text",
  "toast"
] as const;
