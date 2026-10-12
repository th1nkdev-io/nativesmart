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

## Structure

```txt
packages/tokens/src/
  primitives/
  semantic/
  platforms/
  tokens.ts
  themes.ts
  validate.ts
  build.ts
```

## Layers

`primitives` are raw design values such as green `600`, spacing `4`, or radius `md`.

`semantic` maps raw values to product meaning, such as `background`, `surface`, `primary`, `danger` or `offline`.

`themes` expose light and dark mode.

`platforms` prepares platform-specific token contracts, currently for React Native and Flutter.

## Commands

```bash
pnpm --filter @nativesmart/tokens build
pnpm --filter @nativesmart/tokens test
```

The build generates:

```txt
packages/tokens/dist/json/
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
| CSS custom properties | Web Components, React, Vue, Svelte, Angular, servers | planned |
| Tailwind preset       | NativeWind, React, Vue, Svelte, HTML-CSS             | planned |
| Kotlin                | Jetpack Compose, Kotlin Multiplatform core           | planned |
| Swift                 | SwiftUI                                              | planned |
| C# / XAML resources   | .NET MAUI                                            | planned |

`@nativesmart/tailwind-preset` is generated, never edited by hand. Sharing it between NativeWind
and the web renderers gives teams one class vocabulary on every platform.

## Future

The current architecture can later support:

- multi-brand themes
- sector presets
- density modes
- two-way Figma synchronization
- accessibility contrast validation
