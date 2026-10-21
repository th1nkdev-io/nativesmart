<script setup lang="ts">
import { primitives, type GridBreakpoint } from "@nativesmart/tokens";
import { computed, ref } from "vue";
import TokenCode from "./TokenCode.vue";

const { grid, chrome } = primitives;
const { container } = primitives.sizing;

/* Grid */
const breakpointLabels: Record<GridBreakpoint, string> = {
  xs: "Téléphone",
  sm: "Grand téléphone",
  md: "Tablette",
  lg: "Portable",
  xl: "Bureau",
  "2xl": "Grand écran"
};
const sampleWidths: Record<GridBreakpoint, number> = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
const breakpoint = ref<GridBreakpoint>("lg");
const frame = computed(() => {
  const spec = grid[breakpoint.value];
  const width = sampleWidths[breakpoint.value];
  const inner = width - spec.margin * 2;
  const column = (inner - spec.gutter * (spec.columns - 1)) / spec.columns;
  return { ...spec, width, column: Math.round(column * 10) / 10 };
});

/* Containers */
const widest = Math.max(...Object.values(container));

/* Application frame */
const frameMode = ref<"desktop" | "mobile">("desktop");
const collapsed = ref(false);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Grille</h2>
        <p>
          4 colonnes sur téléphone, 8 sur tablette, 12 sur ordinateur. Les gouttières et les marges
          grandissent avec l'écran ; en CSS, les variables changent seules à chaque point de
          rupture.
        </p>
      </header>
      <div class="seg" role="radiogroup" aria-label="Point de rupture">
        <button
          v-for="(spec, key) in grid"
          :key="key"
          type="button"
          role="radio"
          :aria-checked="breakpoint === key"
          @click="breakpoint = key"
        >
          {{ key }}
        </button>
      </div>
      <figure class="grid-frame">
        <svg
          :viewBox="`0 0 ${frame.width} 260`"
          role="img"
          :aria-label="`Grille de ${frame.columns} colonnes à ${frame.width} pixels`"
        >
          <rect class="grid-frame__screen" x="0" y="0" :width="frame.width" height="260" rx="12" />
          <rect class="grid-frame__margin" x="0" y="0" :width="frame.margin" height="260" />
          <rect
            class="grid-frame__margin"
            :x="frame.width - frame.margin"
            y="0"
            :width="frame.margin"
            height="260"
          />
          <rect
            v-for="index in frame.columns"
            :key="`${breakpoint}-${index}`"
            class="grid-frame__column"
            :x="frame.margin + (index - 1) * (frame.column + frame.gutter)"
            y="16"
            :width="frame.column"
            height="228"
            rx="4"
            :style="{ animationDelay: `${index * 25}ms` }"
          />
        </svg>
        <figcaption class="grid-frame__facts">
          <span
            ><strong>{{ breakpointLabels[breakpoint] }}</strong> · dès {{ frame.minWidth }} px</span
          >
          <span><i class="is-column" /> {{ frame.columns }} colonnes</span>
          <span><i class="is-gutter" /> gouttière {{ frame.gutter }} px</span>
          <span><i class="is-margin" /> marge {{ frame.margin }} px</span>
          <span class="muted"
            >colonne de {{ frame.column }} px à {{ frame.width }} px de large</span
          >
        </figcaption>
      </figure>
      <div class="token-inline">
        <TokenCode value="--ns-grid-columns" />
        <TokenCode value="--ns-grid-gutter" />
        <TokenCode value="--ns-grid-margin" />
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Cadre d'application</h2>
        <p>
          Les dimensions de la structure des écrans : barres, navigation latérale, tiroirs et zones
          sûres des écrans à encoche.
        </p>
      </header>
      <div class="frame-controls">
        <div class="seg" role="radiogroup" aria-label="Appareil">
          <button
            type="button"
            role="radio"
            :aria-checked="frameMode === 'desktop'"
            @click="frameMode = 'desktop'"
          >
            Ordinateur
          </button>
          <button
            type="button"
            role="radio"
            :aria-checked="frameMode === 'mobile'"
            @click="frameMode = 'mobile'"
          >
            Téléphone
          </button>
        </div>
        <label v-if="frameMode === 'desktop'" class="frame-toggle">
          <input v-model="collapsed" type="checkbox" />
          Navigation réduite
        </label>
      </div>

      <div v-if="frameMode === 'desktop'" class="app-frame" :class="{ 'is-collapsed': collapsed }">
        <div class="app-frame__bar">
          <span>app-bar-regular · {{ chrome.appBar.regular }} px</span>
        </div>
        <div class="app-frame__body">
          <div class="app-frame__nav">
            <span>
              {{
                collapsed
                  ? `${chrome.sidebar.collapsed}`
                  : `sidebar-regular · ${chrome.sidebar.regular} px`
              }}
            </span>
          </div>
          <div class="app-frame__content">
            <span class="app-frame__toolbar">toolbar-height · {{ chrome.toolbar }} px</span>
            <span class="app-frame__lines"><i /><i /><i /><i /></span>
          </div>
          <div class="app-frame__aside">
            <span>aside-width · {{ chrome.aside }} px</span>
          </div>
        </div>
      </div>

      <div v-else class="phone-frame">
        <div class="phone-frame__device">
          <span class="phone-frame__safe phone-frame__safe--top">safe-top</span>
          <span class="phone-frame__bar">app-bar-compact · {{ chrome.appBar.compact }} px</span>
          <span class="phone-frame__content"><i /><i /><i /><i /><i /></span>
          <span class="phone-frame__tabs">tab-bar-height · {{ chrome.tabBar }} px</span>
          <span class="phone-frame__safe phone-frame__safe--bottom">safe-bottom</span>
        </div>
        <ul class="phone-frame__notes">
          <li>
            <strong>Zones sûres</strong>
            <span class="muted"
              >Lues sur l'appareil : encoche, barre d'accueil, coins arrondis.</span
            >
            <TokenCode value="--ns-safe-top" />
          </li>
          <li>
            <strong>Barre d'application</strong>
            <span class="muted">
              compacte {{ chrome.appBar.compact }}, normale {{ chrome.appBar.regular }}, grande
              {{ chrome.appBar.large }} px
            </span>
            <TokenCode value="--ns-app-bar-compact" />
          </li>
          <li>
            <strong>Barre d'onglets et barre basse</strong>
            <span class="muted">{{ chrome.tabBar }} et {{ chrome.bottomBar }} px</span>
            <TokenCode value="--ns-tab-bar-height" />
          </li>
        </ul>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Élément</th>
              <th>Valeurs</th>
              <th>Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Navigation latérale</strong></td>
              <td class="numeric">
                {{ chrome.sidebar.collapsed }} · {{ chrome.sidebar.regular }} ·
                {{ chrome.sidebar.wide }} px
              </td>
              <td><TokenCode value="--ns-sidebar-regular" /></td>
            </tr>
            <tr>
              <td><strong>Tiroirs</strong></td>
              <td class="numeric">
                {{ chrome.drawer.sm }} · {{ chrome.drawer.md }} · {{ chrome.drawer.lg }} px
              </td>
              <td><TokenCode value="--ns-drawer-md" /></td>
            </tr>
            <tr>
              <td><strong>Panneau latéral</strong></td>
              <td class="numeric">{{ chrome.aside }} px</td>
              <td><TokenCode value="--ns-aside-width" /></td>
            </tr>
            <tr>
              <td><strong>Barre d'outils</strong></td>
              <td class="numeric">{{ chrome.toolbar }} px</td>
              <td><TokenCode value="--ns-toolbar-height" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Conteneurs</h2>
        <p>Largeurs maximales du contenu, alignées sur les points de rupture.</p>
      </header>
      <div class="container-demo">
        <div v-for="(value, key) in container" :key="key" class="container-demo__row">
          <strong>{{ key }}</strong>
          <span class="container-demo__track">
            <span :style="{ inlineSize: `${(value / widest) * 100}%` }" />
          </span>
          <small class="numeric">{{ value }}px</small>
          <TokenCode :value="`--ns-container-${key}`" />
        </div>
      </div>
    </section>
  </div>
</template>
