# Desktop web shell (Electron / Tauri)

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `desktop-web`
- Package: `@nativesmart/desktop`
- Language: TypeScript, Rust
- Styling: CSS custom properties
- Builds on: `html-css` renderer (wraps it instead of reimplementing components)
- Playground: [`apps/desktop/electron-tauri`](../../../apps/desktop/electron-tauri)

## Planned layout

```txt
src/
  shell/           # window chrome, menus, native dialogs
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
