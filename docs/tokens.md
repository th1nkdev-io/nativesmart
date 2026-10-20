# Tokens

`packages/tokens` is the source of truth for every visual decision in Nativesmart. Components never
hardcode a color, size or duration: they read a token. Every token can be browsed live, per brand
theme and color mode, on the Tokens page of the [Nativesmart Lab](../apps/showcase/README.md).

## Structure

```txt
packages/tokens/src/
  primitives/      raw scales shared by every brand
    colors.ts        reference palette (19 scales, 50 to 950, aligned with Tailwind)
    spacing.ts       4px grid
    radius.ts        corner radius scale
    typography.ts    font sizes, line heights, weights, letter spacing
    sizing.ts        control heights, icon sizes, touch target, containers, density factors
    borders.ts       border widths and focus ring geometry
    elevation.ts     6 shadow levels
    motion.ts        durations and easing curves
    opacity.ts       disabled, muted, overlay, hover and pressed layers
    zIndex.ts        stacking layers
    breakpoints.ts   viewport widths
  semantic/
    roles.ts         41 semantic color roles
    colors.ts        default (Thinkdev) values for every role
    text-styles.ts   17 named text styles
    contrast.ts      WCAG contrast ratio and the pairs every theme must keep readable
  brands/            brand themes: Thinkdev, CV Action
  css.ts             CSS custom properties generator
  validate.ts        token validation, including contrast
  build.ts           JSON, CSS, TypeScript and Dart outputs
```

## Layers

1. **Primitives** are raw values with no meaning: `palette.violet[700]`, `spacing[4]`,
   `radius.md`. They are the same for every brand.
2. **Semantic tokens** give meaning: the `primary` color role, the `h2` text style, the `control`
   radius. Components only use this layer.
3. **Brand themes** give a value to every semantic token, in light and dark mode. Switching brand
   never changes a component, only these values.
4. **Component tokens** (`--ns-button-*`, `--ns-badge-*`) are defined by each component on top of
   the semantic layer, so a product can restyle one component without touching the others.

## Brand themes

| Theme     | Id          | Primary          | Secondary       | Neutral    | Fonts                       | Control radius |
| --------- | ----------- | ---------------- | --------------- | ---------- | --------------------------- | -------------- |
| Thinkdev  | `thinkdev`  | emerald          | blue            | slate      | Inter                       | 8px            |
| CV Action | `cv-action` | violet `#4b14a3` | coral `#ff764d` | night blue | Dosis, TT Commons (heading) | 6px            |

A brand theme defines:

- `palette`: its primary, secondary and neutral scales (50 to 950);
- `colors.light` and `colors.dark`: a value for each of the 41 semantic roles;
- `typography.fontFamily`: `sans`, `heading` and `mono` font stacks;
- `shape`: the radius used by `control`, `card`, `overlay` and `badge`;
- `shadowTint`: the shadow color per mode;
- `contrastExceptions`: documented, deliberate contrast failures.

## Semantic color roles

| Group     | Roles                                                                                         |
| --------- | --------------------------------------------------------------------------------------------- |
| Surfaces  | `background`, `surface`, `surfaceMuted`, `surfaceRaised`, `border`, `borderStrong`, `overlay` |
| Text      | `text`, `textMuted`, `textDisabled`                                                           |
| Primary   | `primary`, `primaryHover`, `primaryPressed`, `onPrimary`, `primaryMuted`, `onPrimaryMuted`    |
| Secondary | `secondary`, `secondaryHover`, `onSecondary`, `secondaryMuted`, `onSecondaryMuted`, `accent`  |
| Status    | `success`, `warning`, `danger`, `info`, each with `on*`, `*Muted` and `on*Muted`              |
| System    | `dangerHover`, `focusRing`, `offline`                                                         |

`on*` roles are the foreground on the matching color; `*Muted` roles are soft backgrounds for
badges, alerts and selected states, and `on*Muted` is the readable text on them.

## Contrast

`validateTokens()` checks 19 text and indicator pairs in both modes against WCAG 2.2: 4.5:1 for
text and 3:1 for the focus indicator. The build fails when a pair falls below its minimum, unless
the brand theme documents an exception.

Current exception: CV Action keeps white text on its coral secondary (2.6:1), as in the existing
product. Use `secondary` for large text, icons and accents, not for body text.

## Text styles

| Style                              | Size / line height  | Weight                      | Family  |
| ---------------------------------- | ------------------- | --------------------------- | ------- |
| `display-lg`, `display-md`         | 60/68, 48/56        | bold                        | heading |
| `h1`, `h2`, `h3`, `h4`             | 36/44 to 20/30      | bold to semibold            | heading |
| `h5`, `h6`                         | 18/28, 16/24        | semibold                    | sans    |
| `body-lg`, `body-md`, `body-sm`    | 18/28, 16/24, 14/20 | regular                     | sans    |
| `label-lg`, `label-md`, `label-sm` | 16/24, 14/20, 12/16 | medium                      | sans    |
| `caption`, `overline`              | 12/16               | regular, semibold uppercase | sans    |
| `code`                             | 14/20               | regular                     | mono    |

Each style is available as variables (`--ns-text-h1-size`, `-line-height`, `-weight`, `-tracking`,
`-family`), as a CSS class (`.ns-text-h1`) and as a Tailwind class (`text-ns-h1`).

## CSS custom properties

The build writes one stylesheet per brand theme in `dist/css/<theme>.css`. Every variable starts
with `--ns-` and uses kebab-case.

| Family     | Examples                                                                                |
| ---------- | --------------------------------------------------------------------------------------- |
| Colors     | `--ns-color-primary`, `--ns-color-on-danger-muted`, `--ns-palette-primary-500`          |
| Typography | `--ns-font-heading`, `--ns-font-size-md`, `--ns-text-h2-size`, `--ns-tracking-tight`    |
| Spacing    | `--ns-space-4` (16px)                                                                   |
| Sizing     | `--ns-control-height-md`, `--ns-icon-size-lg`, `--ns-touch-target`, `--ns-container-xl` |
| Shape      | `--ns-radius-md`, `--ns-radius-control`, `--ns-radius-card`                             |
| Borders    | `--ns-border-width-thin`, `--ns-focus-ring-width`, `--ns-focus-ring-offset`             |
| Elevation  | `--ns-elevation-0` to `--ns-elevation-5`                                                |
| Motion     | `--ns-duration-normal`, `--ns-easing-decelerate`                                        |
| System     | `--ns-z-modal`, `--ns-opacity-disabled`                                                 |

Light mode applies to `:root`. Dark mode applies under a `.dark` class (Nuxt color-mode, Tailwind
`darkMode: "class"`) or `data-ns-theme="dark"`; `data-ns-theme="light"` forces light mode inside a
dark page. `data-ns-density="compact"` or `"spacious"` rescales control heights in an area.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@nativesmart/tokens/css/cv-action.css"]
});
```

## Tailwind preset

`@nativesmart/tailwind-preset` maps the same variables to Tailwind classes under the `ns`
namespace and never hardcodes a value:

```txt
bg-ns-primary  text-ns-on-primary  bg-ns-primary-100  border-ns-border
text-ns-h2  font-ns-heading  rounded-ns-control  rounded-ns-card
h-ns-md  shadow-ns-elevation-3  duration-ns-normal  ease-ns-decelerate  z-ns-modal
```

## Commands

```bash
pnpm --filter @nativesmart/tokens build
pnpm --filter @nativesmart/tokens test
```

The build generates:

```txt
packages/tokens/dist/json/          primitives, themes and brands
packages/tokens/dist/css/           one stylesheet per brand theme
packages/tokens/dist/react-native/
packages/tokens/dist/flutter/
```

## Platform outputs

| Output                | Consumers                                            | Status  |
| --------------------- | ---------------------------------------------------- | ------- |
| JSON                  | tooling, CLI                                         | built   |
| TypeScript            | `@nativesmart/react-native`                          | built   |
| Dart                  | `nativesmart_flutter`                                | built   |
| CSS custom properties | Web Components, React, Vue, Svelte, Angular, servers | built   |
| Tailwind preset       | NativeWind, React, Vue, Svelte, HTML-CSS             | built   |
| W3C DTCG JSON         | Style Dictionary, Figma (Tokens Studio)              | planned |
| Kotlin                | Jetpack Compose, Kotlin Multiplatform core           | planned |
| Swift                 | SwiftUI                                              | planned |
| C# / XAML resources   | .NET MAUI                                            | planned |

## Next

- Data visualization palettes per brand theme.
- W3C DTCG export and two-way Figma synchronization.
- Native outputs for Kotlin, Swift and .NET MAUI.
