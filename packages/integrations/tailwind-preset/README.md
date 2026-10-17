# Tailwind preset

Preview Nativesmart integration.

- Registry id: `tailwind-preset`
- Package: `@nativesmart/tailwind-preset`

Tailwind CSS preset derived from `@nativesmart/tokens`, shared by NativeWind, React, Vue, Svelte and
HTML-CSS. It never hardcodes a value: every entry points to a token CSS variable.

See [Platforms](../../../docs/platforms.md).

## Usage

```js
// tailwind.config.js
import { nativesmartPreset } from "@nativesmart/tailwind-preset";

export default {
  presets: [nativesmartPreset],
  darkMode: "class"
};
```

Load the theme stylesheet once, for example `@nativesmart/tokens/css/cv-action.css`, then use
`bg-ns-primary`, `text-ns-on-primary`, `rounded-ns-md`, `font-ns-heading` or `shadow-ns-sm`.
