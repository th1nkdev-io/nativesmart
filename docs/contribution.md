# Contribution

Nativesmart is an internal production system first.

## Principles

- Prefer platform-native ergonomics over forced cross-platform sameness.
- Keep tokens canonical and generated outputs disposable.
- Put product-specific behavior in business components, not generic primitives.
- Keep packages small and independently understandable.
- Treat examples and starters as product-quality references.

## Development

```bash
pnpm install
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

## Component checklist

- Has a clear public API.
- Works in light and dark themes.
- Handles disabled, loading and error states where relevant.
- Uses tokens rather than one-off styling.
- Includes minimal docs or example usage.
