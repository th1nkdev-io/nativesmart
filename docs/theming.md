# Theming

Nativesmart uses shared tokens as the source of truth.

The same design decisions feed every renderer, on web and mobile:

```txt
packages/tokens
  primitives
  semantic
  themes
  platforms
```

## React Native

```tsx
import { NativesmartProvider, useTheme } from "@nativesmart/react-native";

<NativesmartProvider mode="dark">
  <App />
</NativesmartProvider>;

const theme = useTheme();
```

## Flutter

```dart
MaterialApp(
  theme: NativesmartTheme.light(),
  darkTheme: NativesmartTheme.dark(),
);
```

## Other renderers

Planned renderers apply the same tokens with their native mechanism:

- React Native with NativeWind: `className`s from `@nativesmart/tailwind-preset`;
- Web Components, React, Vue, Svelte and Angular: CSS custom properties, with the Tailwind preset
  available to React, Vue and Svelte;
- Jetpack Compose: `MaterialTheme` and `CompositionLocal` values;
- SwiftUI: environment values;
- .NET MAUI: `ResourceDictionary` resources.

See [Platforms](platforms.md) for the full matrix.

## Current Modes

- light
- dark

## Future Modes

- multi-brand themes
- sector presets
- compact and comfortable density
- accessibility contrast checks
- Figma synchronization and CSS exports
