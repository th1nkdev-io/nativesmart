# HTML-CSS (Web Components)

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `html-css`
- Package: `@nativesmart/elements`
- Language: HTML, CSS, JavaScript (Lit)
- Styling: CSS custom properties
- Playground: [`apps/web/html-css`](../../../apps/web/html-css)

## Planned layout

```txt
src/
  components/      # one custom element per contract (ns-button, ns-input, ...)
  business/        # ns-amount-input, ns-otp-input, ns-transaction-card, ...
  styles/          # generated CSS custom properties and base layers
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
