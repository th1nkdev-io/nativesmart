# Tokens

`packages/tokens` is the source of truth for the Nativesmart design system.

It defines the visual decisions shared by React Native and Flutter:

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

`platforms` prepares platform-specific token contracts for React Native and Flutter.

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

## Future

The current architecture can later support:

- multi-brand themes
- sector presets
- density modes
- CSS export
- Figma Tokens export
- accessibility contrast validation
