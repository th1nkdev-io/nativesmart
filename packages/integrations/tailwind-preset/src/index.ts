import { cssColorVariable, cssPrefix, primitives, semanticColorRoles } from "@nativesmart/tokens";

function kebab(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function variableScale(group: string, keys: readonly string[]) {
  return Object.fromEntries(keys.map((key) => [`ns-${key}`, `var(${cssPrefix}-${group}-${key})`]));
}

/**
 * Tailwind preset exposing Nativesmart tokens under the `ns` namespace (`bg-ns-primary`,
 * `rounded-ns-md`, `font-ns-heading`...). Values point to CSS custom properties, so the brand
 * theme and dark mode come from the stylesheet loaded with `@nativesmart/tokens/css/<theme>.css`.
 */
export const nativesmartPreset = {
  theme: {
    extend: {
      colors: {
        ns: Object.fromEntries(
          semanticColorRoles.map((role) => [kebab(role), `var(${cssColorVariable(role)})`])
        )
      },
      borderRadius: variableScale("radius", Object.keys(primitives.radius)),
      fontFamily: {
        "ns-sans": `var(${cssPrefix}-font-sans)`,
        "ns-heading": `var(${cssPrefix}-font-heading)`,
        "ns-mono": `var(${cssPrefix}-font-mono)`
      },
      boxShadow: variableScale("shadow", Object.keys(primitives.shadows)),
      zIndex: variableScale("z", Object.keys(primitives.zIndex)),
      transitionDuration: variableScale("duration", Object.keys(primitives.motion.duration)),
      transitionTimingFunction: variableScale("easing", Object.keys(primitives.motion.easing))
    }
  }
} as const;

export default nativesmartPreset;
