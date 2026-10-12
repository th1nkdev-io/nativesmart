# Design Systems

Nativesmart separates component contracts from visual and interaction strategies. A design
system provides foundation overrides and recipes without owning renderer code.

## Built-in families

- Thinkdev is the default neutral and brandable family.
- Material captures Material-oriented state, shape, elevation and motion conventions.
- Bootstrap targets DOM-based web and desktop-shell interfaces.
- Cupertino targets Apple mobile and desktop conventions.

## Availability by renderer

| Design system | Web renderers | Mobile renderers | Desktop renderers |
| ------------- | ------------- | ---------------- | ----------------- |
| Thinkdev      | yes           | yes              | yes               |
| Material      | yes           | yes              | yes               |
| Bootstrap     | yes           | no               | yes               |
| Cupertino     | no            | yes              | yes               |

`pnpm architecture:validate` rejects a renderer that declares a design system sharing none of its
categories. See [Platforms](platforms.md) for each renderer's supported systems.

These definitions are starting recipes, not claims of compliance with third-party trademarks or
complete upstream specifications. Versions should be pinned once fidelity work begins.

## Custom brands

A client brand supplies an identifier and token overrides. It can select a built-in design system
without copying its recipes. Product overrides sit above the brand for contextual needs.

```ts
const brand = createBrand({
  id: "acme-bank",
  name: "Acme Bank",
  tokenOverrides: {
    "color.action.primary": "#0047ab"
  }
});

resolveDesignConfiguration({
  designSystem: "thinkdev",
  brand,
  mode: "dark",
  density: "compact",
  direction: "ltr"
});
```

Brand values should be validated for contrast, typography availability and renderer support
before distribution.
