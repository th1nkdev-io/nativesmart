# Ionic / Capacitor

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `ionic-capacitor`
- Package: `@nativesmart/capacitor`
- Language: TypeScript
- Styling: CSS custom properties
- Builds on: `html-css` renderer (wraps it instead of reimplementing components)
- Playground: [`apps/mobile/ionic-capacitor`](../../../apps/mobile/ionic-capacitor)

## Planned layout

```txt
src/
  plugins/         # camera (KYC), biometrics, share, network bridges
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
