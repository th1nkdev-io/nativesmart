# Theming

Nativesmart uses shared tokens as the source of truth.

The same design decisions feed both React Native and Flutter:

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

## Current Modes

- light
- dark

## Future Modes

- multi-brand themes
- sector presets
- compact and comfortable density
- accessibility contrast checks
- Figma and CSS exports
