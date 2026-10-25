# Vue

Nativesmart renderer for Vue 3 and Nuxt. Status: `preview`.

- Registry id: `vue`
- Package: `@nativesmart/vue`
- Styling: CSS custom properties from `@nativesmart/tokens`, one `--ns-<component>-*` variable per
  component token so a product can override a single component
- Playground: [`apps/web/vue`](../../../apps/web/vue), shown in the
  [Nativesmart Lab](../../../apps/showcase/README.md)

## Components

| Contract       | Component       | Contract  | Component   |
| -------------- | --------------- | --------- | ----------- |
| `aspect-ratio` | `NsAspectRatio` | `divider` | `NsDivider` |
| `avatar`       | `NsAvatar`      | `icon`    | `NsIcon`    |
| `badge`        | `NsBadge`       | `input`   | `NsInput`   |
| `box`          | `NsBox`         | `modal`   | `NsModal`   |
| `button`       | `NsButton`      | `spinner` | `NsSpinner` |
| `card`         | `NsCard`        | `text`    | `NsText`    |
|                |                 | `toast`   | `NsToast`   |

Props use the contract property names; contract events are emitted as Vue events (`press`,
`change`, `submit`, `dismiss`, `open-change`…). `NsInput` and `NsModal` also support `v-model` and
`v-model:open`. Every component reads its colors, spacing, radii and motion from the tokens, and
exposes `--ns-<component>-*` variables to restyle one component without touching the others.

### AspectRatio

Frames any media at a ratio token (`video`, `square`, `photo`, `portrait`, `story`, `wide`,
`golden`), a number or a `"w:h"` string, or `auto` to keep the media's own ratio (masonry). It shows
a shimmer until the image loads, a fallback when it fails, and can switch ratio per breakpoint:

```vue
<NsAspectRatio ratio="square" :responsive="{ md: 'video', xl: 'wide' }" title="Grand-Bassam" zoom>
  <img src="/lagune.jpg" alt="Lagune bordée de palmiers" />
  <template #overlay><NsBadge label="Nouveau" /></template>
</NsAspectRatio>
```

### Box

The base container. Every value is a token, and any layout prop takes one value per breakpoint:

```vue
<NsBox
  as="section"
  :padding="{ base: '4', md: '8' }"
  display="grid"
  :columns="{ base: 1, md: 2, lg: 3 }"
  gap="4"
  background="surface-muted"
  radius="xl"
>
  …
</NsBox>
```

Spacing uses logical sides (`paddingInline`, `marginBlock`), so layouts mirror in right-to-left
languages. The text tone follows the background (`surface-brand` gets `text-on-brand`), and
`material` gives a translucent blurred surface.

### Icons

`NsIcon` ships a stroke set drawn on a 24 × 24 grid (`iconNames()` lists it). Add or replace icons
when installing the plugin:

```ts
app.use(Nativesmart, { icons: { logo: "M4 4h16v16H4Z" } });
```

## Usage

```ts
import "@nativesmart/tokens/css/cv-action.css";
import "@nativesmart/vue/style.css";
import { Nativesmart } from "@nativesmart/vue";

app.use(Nativesmart);
```

```vue
<NsInput v-model="amount" label="Montant" :invalid="tooHigh" error="Solde insuffisant" />
<NsButton label="Envoyer" intent="primary" :loading="sending" @press="open = true" />
<NsModal v-model:open="open" title="Confirmer l'envoi">
  {{ amount }} FCFA seront envoyés.
  <template #actions><NsButton label="Confirmer" @press="send" /></template>
</NsModal>
```

## Commands

```bash
pnpm --filter @nativesmart/vue test
pnpm --filter @nativesmart/vue build
```
