import type { App, Plugin } from "vue";
import { NsBadge, NsButton, NsSpinner } from "./components";

/** Registers every Nativesmart component globally: `app.use(Nativesmart)`. */
export const Nativesmart: Plugin = {
  install(app: App) {
    app.component("NsBadge", NsBadge);
    app.component("NsButton", NsButton);
    app.component("NsSpinner", NsSpinner);
  }
};
