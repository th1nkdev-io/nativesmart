# React

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `react-web`
- Package: `@nativesmart/react`
- Language: TypeScript
- Styling: CSS custom properties and Tailwind preset
- Playground: [`apps/web/react`](../../../apps/web/react)

## Planned layout

```txt
src/
  components/
  business/
  hooks/
  theme/           # NativesmartProvider for the web
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
