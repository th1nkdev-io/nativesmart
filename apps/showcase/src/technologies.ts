import { rendererManifests } from "@nativesmart/platform-registry";
import {
  siAngular,
  siDotnet,
  siElectron,
  siFlutter,
  siIonic,
  siJetpackcompose,
  siReact,
  siSvelte,
  siSwift,
  siTailwindcss,
  siVuedotjs,
  siWebcomponentsdotorg,
  type SimpleIcon
} from "simple-icons";

/**
 * Renderer playground served for each technology. In development every renderer runs on its own
 * port; in production they are published under the showcase, for example `./vue/`.
 */
const rendererUrls: Readonly<Record<string, { dev: string; build: string }>> = {
  vue: { dev: "http://localhost:5174/", build: "./vue/" }
};

const icons: Readonly<Record<string, SimpleIcon>> = {
  vue: siVuedotjs,
  "react-web": siReact,
  "html-css": siWebcomponentsdotorg,
  svelte: siSvelte,
  angular: siAngular,
  "react-native": siReact,
  "react-native-nativewind": siTailwindcss,
  flutter: siFlutter,
  compose: siJetpackcompose,
  swiftui: siSwift,
  "ionic-capacitor": siIonic,
  maui: siDotnet,
  "desktop-web": siElectron
};

export type TechnologyFamily = "web" | "mobile" | "desktop";

export type Technology = {
  id: string;
  name: string;
  family: TechnologyFamily;
  status: string;
  icon: SimpleIcon | undefined;
  /** Renderer playground URL, or null when the technology is not in the Lab yet. */
  url: string | null;
  implemented: ReadonlySet<string>;
};

const familyOrder: readonly TechnologyFamily[] = ["web", "mobile", "desktop"];

export const technologies: readonly Technology[] = rendererManifests
  .map((renderer) => {
    const urls = rendererUrls[renderer.id];
    const family = (renderer.categories[0] ?? "web") as TechnologyFamily;
    return {
      id: renderer.id,
      name: renderer.name,
      family,
      status: renderer.status,
      icon: icons[renderer.id],
      url: urls ? (import.meta.env.DEV ? urls.dev : urls.build) : null,
      implemented: new Set(renderer.implementedComponents)
    };
  })
  .sort(
    (a, b) =>
      familyOrder.indexOf(a.family) - familyOrder.indexOf(b.family) ||
      Number(b.url !== null) - Number(a.url !== null)
  );

export const technologyFamilies = familyOrder.map((family) => ({
  family,
  label: { web: "Web", mobile: "Mobile", desktop: "Desktop" }[family],
  items: technologies.filter((technology) => technology.family === family)
}));

/** Any technology can be selected: those outside the Lab still show their planned API. */
export function getTechnology(id: string) {
  return (
    technologies.find((technology) => technology.id === id) ??
    technologies.find((technology) => technology.url !== null) ??
    technologies[0]
  );
}
