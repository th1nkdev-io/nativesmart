import {
  isBrandThemeId,
  type ShowcaseColorMode,
  type ShowcaseDensity,
  type ShowcaseDirection
} from "@nativesmart/showcase-runtime";
import { defaultBrandThemeId, type BrandThemeId } from "@nativesmart/tokens";
import { reactive, watch } from "vue";

export type Viewport = "mobile" | "tablet" | "desktop";
export type ComponentTab = "playground" | "variations" | "api";

/** Everything the page shows lives in the URL hash, so any view can be shared as a link. */
export type ShowcaseState = {
  page: string;
  tech: string;
  brand: BrandThemeId;
  mode: ShowcaseColorMode;
  dir: ShowcaseDirection;
  density: ShowcaseDensity;
  viewport: Viewport;
  tab: ComponentTab;
};

const defaults: ShowcaseState = {
  page: "",
  tech: "vue",
  brand: defaultBrandThemeId,
  mode: "light",
  dir: "ltr",
  density: "comfortable",
  viewport: "desktop",
  tab: "playground"
};

function oneOf<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function fromHash(hash: string): ShowcaseState {
  const [path, query = ""] = hash.replace(/^#\/?/, "").split("?");
  const params = new URLSearchParams(query);
  const brand = params.get("brand") ?? "";
  return {
    page: decodeURIComponent(path ?? ""),
    tech: params.get("tech") ?? defaults.tech,
    brand: isBrandThemeId(brand) ? brand : defaults.brand,
    mode: oneOf(params.get("mode"), ["light", "dark"], defaults.mode),
    dir: oneOf(params.get("dir"), ["ltr", "rtl"], defaults.dir),
    density: oneOf(params.get("density"), ["compact", "comfortable", "spacious"], defaults.density),
    viewport: oneOf(params.get("viewport"), ["mobile", "tablet", "desktop"], defaults.viewport),
    tab: oneOf(params.get("tab"), ["playground", "variations", "api"], defaults.tab)
  };
}

function toHash(state: ShowcaseState) {
  const params = new URLSearchParams();
  for (const key of ["tech", "brand", "mode", "dir", "density", "viewport", "tab"] as const) {
    if (state[key] !== defaults[key]) params.set(key, state[key]);
  }
  const query = params.toString();
  return `#/${state.page}${query ? `?${query}` : ""}`;
}

export const state = reactive<ShowcaseState>(fromHash(window.location.hash));

watch(
  () => toHash(state),
  (hash) => {
    if (window.location.hash !== hash) history.replaceState(null, "", hash);
  }
);

window.addEventListener("hashchange", () => Object.assign(state, fromHash(window.location.hash)));

export function openPage(page: string) {
  state.page = page;
  window.scrollTo({ top: 0 });
}
