import { contrastRatio } from "./contrast";

function channels(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

/** Mixes two 6-digit hex colors in sRGB: `amount` 0 gives `from`, 1 gives `to`. */
export function mix(from: string, to: string, amount: number) {
  const a = channels(from);
  const b = channels(to);
  return `#${a
    .map((channel, index) => Math.round(channel + (b[index] - channel) * amount))
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

/** The candidate with the best contrast on `background`. */
export function mostReadable(background: string, candidates: readonly string[]) {
  return candidates.reduce((best, candidate) =>
    contrastRatio(candidate, background) > contrastRatio(best, background) ? candidate : best
  );
}

/**
 * Moves `from` toward `toward` just enough to reach `minimum` contrast on every background, so a
 * derived color stays as light as accessibility allows.
 */
export function reachContrast(
  from: string,
  toward: string,
  backgrounds: readonly string[],
  minimum: number
) {
  for (let step = 0; step <= 50; step += 1) {
    const color = mix(from, toward, step / 50);
    if (backgrounds.every((background) => contrastRatio(color, background) >= minimum)) {
      return color;
    }
  }
  return toward;
}
