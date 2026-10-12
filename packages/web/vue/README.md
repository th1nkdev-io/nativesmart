# Vue

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `vue`
- Package: `@nativesmart/vue`
- Language: TypeScript
- Styling: CSS custom properties and Tailwind preset
- Builds on: `html-css` renderer (wraps it instead of reimplementing components)
- Playground: [`apps/web/vue`](../../../apps/web/vue)

## Planned layout

```txt
src/
  components/      # typed wrappers with v-model around @nativesmart/elements
  business/
  plugin.ts        # app.use(Nativesmart)
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
