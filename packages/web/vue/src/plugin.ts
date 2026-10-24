import type { App, Plugin } from "vue";
import * as components from "./components";
import { registerIcons } from "./icons";

export type NativesmartOptions = {
  /** Extra or replacement icons for NsIcon: `{ name: svgPathData }` on a 24 × 24 grid. */
  icons?: Readonly<Record<string, string>>;
};

/** Registers every Nativesmart component globally: `app.use(Nativesmart, { icons })`. */
export const Nativesmart: Plugin<[NativesmartOptions?]> = {
  install(app: App, options: NativesmartOptions = {}) {
    if (options.icons) registerIcons(options.icons);
    for (const [name, component] of Object.entries(components)) app.component(name, component);
  }
};
