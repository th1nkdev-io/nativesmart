# Vue

Nativesmart renderer for Vue 3 and Nuxt. Status: `preview`.

- Registry id: `vue`
- Package: `@nativesmart/vue`
- Styling: CSS custom properties from `@nativesmart/tokens`, one `--ns-<component>-*` variable per
  component token so a product can override a single component
- Playground: [`apps/web/vue`](../../../apps/web/vue), shown in the
  [Nativesmart Lab](../../../apps/showcase/README.md)

## Components

| Contract  | Component   |
| --------- | ----------- |
| `badge`   | `NsBadge`   |
| `button`  | `NsButton`  |
| `spinner` | `NsSpinner` |

Props use the contract property names; contract events are emitted as Vue events (`press`,
`focus`, `blur`).

## Usage

```ts
import "@nativesmart/tokens/css/cv-action.css";
import "@nativesmart/vue/style.css";
import { Nativesmart } from "@nativesmart/vue";

app.use(Nativesmart);
```

```vue
<NsButton label="Envoyer" intent="primary" :loading="sending" @press="send" />
```

## Commands

```bash
pnpm --filter @nativesmart/vue test
pnpm --filter @nativesmart/vue build
```
