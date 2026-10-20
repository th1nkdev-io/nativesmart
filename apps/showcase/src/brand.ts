const base = `${import.meta.env.BASE_URL}brand/`;

/** Official NativeSmart logo (see docs/brand.md). Never recolored with the active theme. */
export const brandName = "NativeSmart";

/** Image attributes for the logo displayed at `size` CSS pixels, sharp on dense screens. */
export function logoImage(size: 32 | 48 | 64 | 128) {
  const sources = [16, 32, 48, 64, 128, 192, 256, 512];
  const pick = (density: number) =>
    sources.find((source) => source >= size * density) ?? sources[sources.length - 1];
  return {
    src: `${base}icon-${pick(1)}.png`,
    srcset: [1, 2, 3].map((density) => `${base}icon-${pick(density)}.png ${density}x`).join(", "),
    width: size,
    height: size
  };
}
