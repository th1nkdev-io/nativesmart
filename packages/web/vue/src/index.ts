export * from "./components";
export { Nativesmart } from "./plugin";

/** Contract ids implemented by this renderer. Kept in sync with the platform registry. */
export const implementedComponents = ["badge", "button", "spinner"] as const;
