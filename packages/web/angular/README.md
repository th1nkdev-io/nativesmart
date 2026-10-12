# Angular

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `angular`
- Package: `@nativesmart/angular`
- Language: TypeScript
- Styling: CSS custom properties
- Builds on: `html-css` renderer (wraps it instead of reimplementing components)
- Playground: [`apps/web/angular`](../../../apps/web/angular)

## Planned layout

```txt
projects/nativesmart/src/lib/
  components/      # standalone components + ControlValueAccessor
  business/
  public-api.ts
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
