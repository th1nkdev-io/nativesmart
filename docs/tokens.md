# Tokens

`packages/tokens` is the source of truth for the Nativesmart design system.

It defines the visual decisions shared by every renderer listed in [Platforms](platforms.md):

- colors
- spacing
- radius
- typography
- shadows
- opacity
- zIndex
- motion
- semantic colors
- light and dark themes
- brand themes (Thinkdev, CV Action)

## Structure

```txt
packages/tokens/src/
  primitives/      raw scales: palette, spacing, radius, typography, shadows, motion
  semantic/        semantic color roles and the default (Thinkdev) values
  brands/          brand themes: one value per role, light and dark, plus font stacks
  platforms/
  css.ts           CSS custom properties generator
  tokens.ts
  themes.ts
  validate.ts
  build.ts
```

## Layers

`primitives` are raw design values such as green `600`, spacing `4`, or radius `md`.

`semantic` maps raw values to product meaning, such as `background`, `surface`, `primary`, `danger` or `offline`.

`themes` expose light and dark mode of the default theme. They are kept for the React Native and
Flutter renderers and always equal the Thinkdev brand theme.

`brands` hold brand themes. A brand theme gives a value to every semantic role in light and dark
mode, and its font stacks. Components never change between brands, only these values do.

| Brand theme | Id          | Primary          | Secondary       | Fonts                       |
| ----------- | ----------- | ---------------- | --------------- | --------------------------- |
| Thinkdev    | `thinkdev`  | green `#059669`  | blue `#1d4ed8`  | Inter                       |
| CV Action   | `cv-action` | violet `#4b14a3` | coral `#ff764d` | Dosis, TT Commons (heading) |

### Semantic color roles

Every brand theme must define all roles, in both modes; `validateTokens()` fails otherwise.

| Group     | Roles                                                                                      |
| --------- | ------------------------------------------------------------------------------------------ |
| Surfaces  | `background`, `surface`, `surfaceMuted`, `border`, `borderStrong`, `overlay`               |
| Text      | `text`, `textMuted`, `textDisabled`                                                        |
| Primary   | `primary`, `primaryHover`, `primaryPressed`, `onPrimary`, `primaryMuted`, `onPrimaryMuted` |
| Secondary | `secondary`, `secondaryHover`, `onSecondary`, `secondaryMuted`, `accent`                   |
| Status    | `success`, `warning`, `danger`, `info` with their `on*` and `*Muted` roles, `dangerHover`  |
| Product   | `offline`, `focusRing`                                                                     |

`on*` roles are the foreground used on top of the matching color. `*Muted` roles are soft
backgrounds for badges, alerts and selected states.

Known contrast exception: CV Action keeps white text on its coral secondary (2.6:1), as in the
current product. Use `secondary` for large text, icons and accents, not for body text.

### CSS custom properties

The build writes one stylesheet per brand theme in `dist/css/<theme>.css`. Every variable starts
with `--ns-` and uses kebab-case:

```css
:root {
  --ns-space-4: 16px;
  --ns-radius-md: 8px;
  --ns-font-sans: Dosis, Lato, "Open Sans", system-ui, sans-serif;
  --ns-color-primary: #4b14a3;
  --ns-color-on-primary: #ffffff;
}

.dark,
[data-ns-theme="dark"] {
  --ns-color-primary: #a78bfa;
}
```

Light mode applies to `:root`. Dark mode applies under a `.dark` class (Nuxt color-mode,
Tailwind `darkMode: "class"`) or `data-ns-theme="dark"`; `data-ns-theme="light"` forces light mode
inside a dark page. Load the stylesheet once in the app:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@nativesmart/tokens/css/cv-action.css"]
});
```

`@nativesmart/tailwind-preset` maps the same variables to Tailwind classes under the `ns`
namespace: `bg-ns-primary`, `text-ns-on-primary`, `rounded-ns-md`, `font-ns-heading`.

`platforms` prepares platform-specific token contracts, currently for React Native and Flutter.

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

Tokens are the single source for every renderer. The target pipeline exports them in the W3C
Design Tokens Community Group (DTCG) format and transforms them with Style Dictionary:

| Output                | Consumers                                            | Status  |
| --------------------- | ---------------------------------------------------- | ------- |
| JSON                  | tooling, CLI                                         | built   |
| TypeScript            | `@nativesmart/react-native`                          | built   |
| Dart                  | `nativesmart_flutter`                                | built   |
| W3C DTCG JSON         | Style Dictionary, Figma (Tokens Studio)              | planned |
| CSS custom properties | Web Components, React, Vue, Svelte, Angular, servers | built   |
| Tailwind preset       | NativeWind, React, Vue, Svelte, HTML-CSS             | built   |
| Kotlin                | Jetpack Compose, Kotlin Multiplatform core           | planned |
| Swift                 | SwiftUI                                              | planned |
| C# / XAML resources   | .NET MAUI                                            | planned |

`@nativesmart/tailwind-preset` is derived from the tokens and never hardcodes a value. Sharing it between NativeWind
and the web renderers gives teams one class vocabulary on every platform.

## Future

The current architecture can later support:

- sector presets
- density modes
- two-way Figma synchronization
- accessibility contrast validation
