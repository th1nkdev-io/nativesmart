# Nativesmart Lab

Public page to try every Nativesmart component live: switch technology, brand theme, light or
dark mode, text direction and screen width. The Lab itself always uses the NativeSmart theme;
the chosen brand theme only applies to the components and token previews. Published on GitHub Pages from `dev`:
https://th1nkdev-io.github.io/nativesmart/

## Run locally

```bash
pnpm install
pnpm showcase
```

Open http://localhost:5173. The shell runs on port 5173 and the Vue renderer on 5174; edits to
contracts, tokens or components reload instantly.

```bash
pnpm showcase:build   # static site in apps/showcase/dist, renderers under dist/<id>/
```

## How it works

- The shell (`apps/showcase`) lists the contracts from `@nativesmart/contracts`, the technologies
  from `@nativesmart/platform-registry` and the brand themes from `@nativesmart/tokens`.
- Each technology has its own renderer playground (`apps/web/vue`, later React, Web Components...)
  loaded in an iframe. The shell sends it render requests through `postMessage`; the protocol,
  theme application and variation matrix live in `@nativesmart/showcase-runtime`, so every
  renderer shows exactly the same preview.
- Property controls are generated from the contract: adding a property to a contract adds its
  control, and implementing a component in a renderer makes it appear in the list.

## Adding a technology

1. Create its renderer playground under `apps/web/<technology>` using
   `@nativesmart/showcase-runtime` (see `apps/web/vue/src/App.vue`).
2. Add its URLs to `src/technologies.ts` and its build to `tooling/scripts/build-showcase.mjs`.
3. Mark the renderer `preview` in the platform registry with its implemented components.
