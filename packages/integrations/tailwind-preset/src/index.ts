import {
  colorSteps,
  cssColorVariable,
  cssPrefix,
  kebab,
  primitives,
  semanticColorRoles,
  textStyles
} from "@nativesmart/tokens";

function variableScale(group: string, keys: readonly string[]) {
  return Object.fromEntries(keys.map((key) => [`ns-${key}`, `var(${cssPrefix}-${group}-${key})`]));
}

function paletteScale(name: string) {
  return Object.fromEntries(
    colorSteps.map((step) => [step, `var(${cssPrefix}-palette-${name}-${step})`])
  );
}

const roleColors = Object.fromEntries(
  semanticColorRoles.map((role) => [kebab(role), `var(${cssColorVariable(role)})`])
);

const shapeUsages = ["control", "card", "overlay", "badge"];
const elevationLevels = Object.keys(primitives.elevation);

/**
 * Tailwind preset exposing Nativesmart tokens under the `ns` namespace (`bg-ns-primary`,
 * `rounded-ns-card`, `text-ns-h2`, `shadow-ns-elevation-2`...). Values point to CSS custom
 * properties, so the brand theme, dark mode and density come from the stylesheet loaded with
 * `@nativesmart/tokens/css/<theme>.css`.
 */
export const nativesmartPreset = {
  theme: {
    extend: {
      colors: {
        ns: {
          ...roleColors,
          primary: { DEFAULT: roleColors.primary, ...paletteScale("primary") },
          secondary: { DEFAULT: roleColors.secondary, ...paletteScale("secondary") },
          neutral: paletteScale("neutral")
        }
      },
      borderRadius: variableScale("radius", [...Object.keys(primitives.radius), ...shapeUsages]),
      fontFamily: {
        "ns-sans": `var(${cssPrefix}-font-sans)`,
        "ns-heading": `var(${cssPrefix}-font-heading)`,
        "ns-mono": `var(${cssPrefix}-font-mono)`
      },
      fontSize: Object.fromEntries(
        Object.keys(textStyles).map((name) => {
          const prefix = `${cssPrefix}-text-${name}`;
          return [
            `ns-${name}`,
            [
              `var(${prefix}-size)`,
              {
                lineHeight: `var(${prefix}-line-height)`,
                fontWeight: `var(${prefix}-weight)`,
                letterSpacing: `var(${prefix}-tracking)`
              }
            ]
          ];
        })
      ),
      height: variableScale("control-height", Object.keys(primitives.sizing.control)),
      minHeight: variableScale("control-height", Object.keys(primitives.sizing.control)),
      boxShadow: {
        ...variableScale("shadow", Object.keys(primitives.shadows)),
        ...Object.fromEntries(
          elevationLevels.map((level) => [
            `ns-elevation-${level}`,
            `var(${cssPrefix}-elevation-${level})`
          ])
        )
      },
      zIndex: variableScale("z", Object.keys(primitives.zIndex)),
      transitionDuration: variableScale("duration", Object.keys(primitives.motion.duration)),
      transitionTimingFunction: variableScale("easing", Object.keys(primitives.motion.easing))
    }
  }
} as const;

export default nativesmartPreset;
