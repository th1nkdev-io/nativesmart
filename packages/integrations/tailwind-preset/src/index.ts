import {
  colorSteps,
  cssColorVariable,
  cssPrefix,
  kebab,
  gradients,
  primitives,
  semanticColorRoles,
  stateLayers,
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

/** Chart series and ramps: `bg-ns-data-cat-1`, `fill-ns-data-seq-5`... */
const dataColors = Object.fromEntries(
  (
    [
      ["cat", 10],
      ["seq", 9],
      ["div", 9]
    ] as const
  ).flatMap(([scale, count]) =>
    Array.from({ length: count }, (_, index) => [
      `data-${scale}-${index + 1}`,
      `var(${cssPrefix}-data-${scale}-${index + 1})`
    ])
  )
);

const shapeUsages = [
  "control",
  "card",
  "overlay",
  "badge",
  "button",
  "input",
  "chip",
  "avatar",
  "image",
  "tooltip",
  "sheet"
];

/** Spacing by intent (`p-ns-inset-md`, `gap-ns-stack-lg`) and the raw steps (`p-ns-0-5`). */
const spacingScale = {
  ...Object.fromEntries(
    Object.keys(primitives.spacing).map((key) => {
      const name = key.replace(".", "-");
      return [`ns-${name}`, `var(${cssPrefix}-space-${name})`];
    })
  ),
  ...Object.fromEntries(
    Object.entries(primitives.spaceUsages).flatMap(([usage, steps]) =>
      Object.keys(steps).map((size) => [
        `ns-${usage}-${size}`,
        `var(${cssPrefix}-${usage}-${size})`
      ])
    )
  )
};
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
          ...dataColors,
          "data-grid": `var(${cssPrefix}-data-grid)`,
          "data-axis": `var(${cssPrefix}-data-axis)`,
          ...Object.fromEntries(
            stateLayers.map((state) => [`state-${state}`, `var(${cssPrefix}-state-${state})`])
          ),
          primary: { DEFAULT: roleColors.primary, ...paletteScale("primary") },
          secondary: { DEFAULT: roleColors.secondary, ...paletteScale("secondary") },
          neutral: paletteScale("neutral")
        }
      },
      backgroundImage: Object.fromEntries(
        Object.keys(gradients).map((name) => [
          `ns-${kebab(name)}`,
          `var(${cssPrefix}-gradient-${kebab(name)})`
        ])
      ),
      borderRadius: variableScale("radius", [...Object.keys(primitives.radius), ...shapeUsages]),
      fontFamily: Object.fromEntries(
        ["sans", "heading", "display", "serif", "mono"].map((family) => [
          `ns-${family}`,
          `var(${cssPrefix}-font-${family})`
        ])
      ),
      spacing: spacingScale,
      lineHeight: variableScale("leading", Object.keys(primitives.typography.leading)),
      maxWidth: {
        ...variableScale("measure", Object.keys(primitives.typography.measure)),
        ...variableScale("container", Object.keys(primitives.sizing.container)),
        ...Object.fromEntries(
          Object.keys(primitives.sizing.dialog).map((key) => [
            `ns-dialog-${key}`,
            `var(${cssPrefix}-dialog-${key})`
          ])
        )
      },
      aspectRatio: variableScale("aspect", Object.keys(primitives.aspectRatios)),
      size: variableScale("avatar-size", Object.keys(primitives.sizing.avatar)),
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
