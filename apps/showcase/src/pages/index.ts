import type { Component } from "vue";
import type { IconName } from "../editorial/icons";
import AccessibilityPage from "./AccessibilityPage.vue";
import ChangelogPage from "./ChangelogPage.vue";
import ContributingPage from "./ContributingPage.vue";
import InstallationPage from "./InstallationPage.vue";
import RoadmapPage from "./RoadmapPage.vue";
import TechnologiesPage from "./TechnologiesPage.vue";
import ThemingPage from "./ThemingPage.vue";

export type NavItem = {
  /** Page id in the URL hash; "" is the home page. */
  id: string;
  label: string;
  /** SVG path data, 24 × 24, drawn with a stroke. */
  icon: string;
  component?: Component;
};

export type NavSection = { id: string; label: string; items: readonly NavItem[] };

/** Sections of the Tokens page, each with its own URL (`tokens/<id>`), grouped for the rail. */
export const tokenSections = [
  { id: "colors", label: "Couleurs", icon: "palette", group: "color" },
  { id: "states", label: "États", icon: "hand", group: "color" },
  { id: "data", label: "Données", icon: "gauge", group: "color" },
  { id: "typography", label: "Typographie", icon: "type", group: "structure" },
  { id: "spacing", label: "Espacements", icon: "ruler", group: "structure" },
  { id: "layout", label: "Mise en page", icon: "grid", group: "structure" },
  { id: "sizing", label: "Tailles", icon: "target", group: "structure" },
  { id: "shape", label: "Formes", icon: "cube", group: "structure" },
  { id: "elevation", label: "Élévation", icon: "layers", group: "depth" },
  { id: "motion", label: "Mouvement", icon: "wave", group: "depth" },
  { id: "icons", label: "Iconographie", icon: "star", group: "depth" },
  { id: "accessibility", label: "Accessibilité", icon: "accessibility", group: "system" },
  { id: "personality", label: "Personnalité", icon: "wand", group: "system" },
  { id: "exports", label: "Exports", icon: "package", group: "system" },
  { id: "system", label: "Système", icon: "compass", group: "system" }
] as const satisfies readonly { id: string; label: string; icon: IconName; group: string }[];

export const tokenGroups = [
  { id: "color", label: "Couleur" },
  { id: "structure", label: "Structure" },
  { id: "depth", label: "Profondeur et mouvement" },
  { id: "system", label: "Système" }
] as const;

const icons = {
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z",
  download: "M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  palette:
    "M12 3a9 9 0 0 0 0 18c1 0 1.6-.8 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.6 1.7-1.6h2A4.5 4.5 0 0 0 21 11c0-4.4-4-8-9-8Z",
  accessibility: "M12 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 8l7 1 7-1M12 9v5m0 0-3 7m3-7 3 7",
  tokens:
    "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2ZM16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7M7 17h.01M11 8l2.3-2.3a2.4 2.4 0 0 1 3.4 0l1.9 1.9a2.4 2.4 0 0 1 0 3.4L9.9 19.8",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14",
  history: "M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5m4-1v5l3 2",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
};

export const navSections: readonly NavSection[] = [
  {
    id: "start",
    label: "Démarrer",
    items: [
      { id: "", label: "Accueil", icon: icons.home },
      {
        id: "docs/installation",
        label: "Installation",
        icon: icons.download,
        component: InstallationPage
      },
      {
        id: "docs/theming",
        label: "Thèmes et identités",
        icon: icons.palette,
        component: ThemingPage
      },
      {
        id: "docs/accessibility",
        label: "Accessibilité",
        icon: icons.accessibility,
        component: AccessibilityPage
      }
    ]
  },
  {
    id: "foundations",
    label: "Fondations",
    items: [{ id: "tokens", label: "Tokens", icon: icons.tokens }]
  },
  {
    id: "resources",
    label: "Ressources",
    items: [
      {
        id: "docs/technologies",
        label: "Technologies",
        icon: icons.layers,
        component: TechnologiesPage
      },
      { id: "docs/roadmap", label: "Feuille de route", icon: icons.map, component: RoadmapPage },
      {
        id: "docs/changelog",
        label: "Journal des modifications",
        icon: icons.history,
        component: ChangelogPage
      },
      {
        id: "docs/contributing",
        label: "Contribuer",
        icon: icons.heart,
        component: ContributingPage
      }
    ]
  }
];

export function findDocPage(id: string) {
  return navSections.flatMap((section) => section.items).find((item) => item.id === id);
}
