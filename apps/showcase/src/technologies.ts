import { rendererManifests } from "@nativesmart/platform-registry";

/**
 * Renderer playground served for each technology. In development every renderer runs on its own
 * port; in production they are published under the showcase, for example `./vue/`.
 */
const rendererUrls: Readonly<Record<string, { dev: string; build: string }>> = {
  vue: { dev: "http://localhost:5174/", build: "./vue/" }
};

export type Technology = {
  id: string;
  name: string;
  url: string | null;
  implemented: ReadonlySet<string>;
};

export const technologies: readonly Technology[] = rendererManifests
  .filter((renderer) => renderer.categories.includes("web"))
  .map((renderer) => {
    const urls = rendererUrls[renderer.id];
    return {
      id: renderer.id,
      name: renderer.name,
      url: urls ? (import.meta.env.DEV ? urls.dev : urls.build) : null,
      implemented: new Set(renderer.implementedComponents)
    };
  })
  .sort((a, b) => Number(b.url !== null) - Number(a.url !== null));

export function getTechnology(id: string) {
  return technologies.find((technology) => technology.id === id) ?? technologies[0];
}
