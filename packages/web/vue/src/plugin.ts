import type { App, Component, Plugin } from "vue";
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
    /* The module also exports helpers such as tokenizeLine: only Ns… names are components. */
    for (const [name, component] of Object.entries(components)) {
      if (name.startsWith("Ns")) app.component(name, component as Component);
    }
  }
};
