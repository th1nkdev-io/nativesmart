# Svelte

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `svelte`
- Package: `@nativesmart/svelte`
- Language: TypeScript
- Styling: CSS custom properties and Tailwind preset
- Builds on: `html-css` renderer (wraps it instead of reimplementing components)
- Playground: [`apps/web/svelte`](../../../apps/web/svelte)

## Planned layout

```txt
src/lib/
  components/      # typed wrappers with bind: around @nativesmart/elements
  business/
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
