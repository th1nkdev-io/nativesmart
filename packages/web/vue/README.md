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

### Container

The page column. The band spans the screen and carries the background and section spacing; the
content stays within `size` (`sm` to `2xl`, `prose` for reading, or `full`), with gutters that follow
the layout grid and clear phone notches. A child with `data-bleed` runs edge to edge:

```vue
<NsContainer as="section" size="xl" spacing="lg" background="surface-muted">
  <h2>Nos offres</h2>
  <img data-bleed src="/bandeau.jpg" alt="" />
</NsContainer>
```

### Grid

Columns that reflow per breakpoint. `columns="layout"` follows the layout grid tokens (4, 8, then
12 columns, with their gutters); `minItemWidth` makes a fluid grid with no breakpoint at all; and
`breakpoints="container"` measures the grid itself, for grids in side panels and cards:

```vue
<NsGrid :columns="{ base: 1, md: 2, lg: 3 }" gap="6">
  <NsGridItem :span="{ base: 1, lg: 2 }">…</NsGridItem>
  <NsGridItem>…</NsGridItem>
</NsGrid>

<NsGrid min-item-width="240px" as="ul">…</NsGrid>
```

An item never spans more columns than the grid has, so a `span` of 8 stays inside a 4-column grid
on phones.

### KeyboardAvoider

Keeps the focused field visible above the on-screen keyboard, on phones. It fills its parent like a
screen: the content scrolls, and the `accessory` slot rides just above the keyboard.

```vue
<NsKeyboardAvoider behavior="padding" :offset="56" @keyboard-change="onKeyboard">
  <form>…</form>
  <template #accessory><NsButton label="Envoyer" /></template>
</NsKeyboardAvoider>
```

The keyboard is read from the visual viewport. In a native shell (Capacitor, Cordova), pass its
height with `keyboard-height`. `useKeyboardInset()` gives the same measure to any component.

### SafeArea

Keeps content clear of notches, islands, rounded corners and the home indicator. Needs
`viewport-fit=cover` in the page's viewport meta tag; start and end follow the reading direction.

```vue
<NsSafeArea as="header" edges="top">…</NsSafeArea>
<NsSafeArea edges="bottom" minimum="4">…tab bar…</NsSafeArea>
```

In a native shell, pass the insets it reports with `:insets="{ top, bottom }"`.
`useSafeAreaInsets()` reads them in any component.

### ScrollArea

A scroll region with drawn, theme-coloured scrollbars over native scrolling: wheel, touch, keyboard
and focus behave as usual. The bars show on hover, while scrolling, always or never, and the edges
fade where more content is hidden. Give it `items` to render only the visible rows of a long list:

```vue
<NsScrollArea max-height="320px" label="Contacts" @end-reached="loadMore">
  …
</NsScrollArea>

<NsScrollArea ref="list" height="400px" :items="rows" :item-height="56">
  <template #item="{ item }">{{ item.name }}</template>
</NsScrollArea>
```

`scrollToIndex(index, align)` and `scrollToEdge(edge)` are exposed on the component.

### Spacer

Empty space inside a flex row or column. By default it takes the free space and pushes what follows
to the far end; a step (`xs` to `2xl`) or a number of pixels reserves a fixed space instead. The
size is a flex basis, so the same spacer works in a row and in a column:

```vue
<header class="toolbar">
  <Logo />
  <NsSpacer min-size="md" />
  <NsButton>Se connecter</NsButton>
</header>

<NsSpacer :size="{ base: 'md', lg: 'auto' }" />
```

Several auto spacers split the space by `grow`. In normal flow, set `axis` to `horizontal` or
`vertical`. `reveal` hatches the space and shows its size while you build a layout.

### Stack

Lays its children out in a column or a row, with a gap from the spacing scale. Direction, gap,
alignment and distribution accept one value per breakpoint:

```vue
<NsStack :direction="{ base: 'column', md: 'row' }" gap="lg" align="center">
  …
</NsStack>

<NsStack as="ul" divided>
  <li v-for="contact in contacts" :key="contact.id">{{ contact.name }}</li>
</NsStack>
```

`divided` draws a line in the middle of each gap; a `divider` slot replaces it. `wrap` flows items
onto new lines, `fill` gives them equal shares, and `compact` joins them into one group with shared
borders, such as a row of segmented buttons. `inline` sits the stack in a line of text.

### Surface

A layer of the interface. Its `level` sets the background and the shadow together, from `sunken`
to `overlay`; with `auto`, the default, a surface sits one level above the surface around it, so
nested panels lift on their own. The slot receives the resolved level:

```vue
<NsSurface padding="lg" radius="xl">
  <NsSurface v-slot="{ level }" interactive @click="open">
    {{ level }} <!-- raised -->
  </NsSurface>
</NsSurface>

<NsSurface variant="glass" tone="primary">…</NsSurface>
```

`variant` picks a shadow (`elevated`), an outline, a fill or glass; `tone` colors the layer and its
text. `interactive` lifts it on hover and makes a `div` keyboard-operable as a button.

### Text

Running text in a semantic role: `body`, `lead`, `label`, `caption`, `overline`, `quote`, `heading`
or `display`. The role picks the text style and the element (p, span, blockquote, h1 to h6):

```vue
<NsText role="lead">Kofi reçoit son argent en quelques secondes.</NsText>
<NsText size="sm" tone="muted" :lines="3" expandable>{{ description }}</NsText>
<NsText strike tone="subtle" numeric>15 000 FCFA</NsText>
<NsText copyable>NS-4521</NsText>
```

`strong`, `italic`, `strike`, `mark` and `underline` wrap the text in the matching element, so the
meaning is announced. The expand button only appears when the text really overflows.

### Label

Names a form control. The description gets an id the control lists in `aria-describedby`:

```vue
<NsLabel
  for="amount"
  required
  info="Frais inclus"
  description="Entre 500 et 500 000 FCFA"
  :counter="`${amount.length}/12`"
>Montant à envoyer</NsLabel>
<input id="amount" v-model="amount" required aria-describedby="amount-description" />

<fieldset>
  <NsLabel as="legend" optional>Moyen de paiement</NsLabel>
  …
</fieldset>
```

The asterisk is decorative: the control carries `required` itself.

### Link

A link in a sentence (underlined by default) or on its own line with an arrow. A link to another
site opens a new tab, with `rel="noopener noreferrer"` and a spoken « opens in a new tab »:

```vue
<p>Consultez <NsLink href="/conditions">nos conditions d'envoi</NsLink>.</p>
<NsLink href="https://aide.example.org">Centre d'aide</NsLink>
<NsLink :as="RouterLink" to="/transferts" variant="standalone">Tous les transferts</NsLink>
<NsLink href="/recu.pdf" download icon="download">Télécharger le reçu</NsLink>
```

`external` forces or prevents the new tab. A disabled link drops its `href`.

### Code

A word of code in a sentence, or a block with a title, a copy button and light syntax colors:

```vue
<p>Installez avec <NsCode variant="inline">pnpm add @nativesmart/vue</NsCode>.</p>

<NsCode :code="source" language="ts" title="send.ts" line-numbers highlight="2, 4-5" />
<NsCode :code="commands" language="bash" prompt :max-lines="6" @copy="track" />
```

Line numbers and prompts are drawn by CSS, so they are never read aloud or copied. The copy button
confirms with a check and announces `copiedLabel`. `tokenizeLine()` exposes the highlighter.

### Heading

A title with its place in the document outline (`level`, h1 to h6) and a visual `size` that does
not change it: a compact sidebar can use a small h2, a hero a display h1.

```vue
<NsHeading
  :level="1"
  size="display"
  tone="gradient"
  eyebrow="Transferts"
  subtitle="Kofi reçoit son argent en quelques secondes."
>
  Envoyez de l'argent en un geste
</NsHeading>

<NsHeading :level="2" anchor :lines="2">
  Historique
  <template #actions><NsButton>Exporter</NsButton></template>
</NsHeading>
```

An eyebrow or a subtitle wraps the title in an `hgroup`. `anchor` adds a `#` link and an id derived
from the text.

### Image

An image in a frame of a given ratio, with a placeholder while it loads, a fallback when it fails
and an optional lightbox:

```vue
<NsImage src="/lagoon.jpg" alt="Lagune bordée de palmiers" ratio="4/3" caption="Assinie" />

<NsImage
  :src="photo.url"
  :alt="photo.alt"
  placeholder="blur"
  :lazy-src="photo.thumbnail"
  fallback-src="/placeholder.jpg"
  preview
/>
```

Without `src` the placeholder stays, which covers a source still on its way from an API. When both
sources fail, the frame shows the alt text. The lightbox is a native modal `dialog`.

### Kbd

A shortcut hint written once for every keyboard: `mod` shows ⌘ on Apple devices and Ctrl elsewhere.

```vue
<NsKbd keys="mod+k" />
<NsKbd keys="mod+shift+p" separator="plus" display="text" />
<NsKbd keys="g h" then-label="puis" />
<NsKbd keys="mod+enter" listen @match="send" />
```

Symbols are hidden from screen readers, which read the key names instead (« Command + K »).
`listen` lights the keys as they are pressed and emits `match`; the page keeps its own shortcut.

### Icons

`NsIcon` ships a stroke set drawn on a 24 × 24 grid (`iconNames()` lists it):

```vue
<NsIcon name="check-circle" tone="success" label="Payé" />
<NsIcon name="wallet" variant="soft" shape="circle" tone="primary" size="lg" />
<NsIcon name="refresh" spin />
<NsIcon name="chevron-down" :rotate="180" />
```

`variant` puts the glyph in a tinted (`soft`), `solid` or `outline` container about twice its size.
Large sizes thin the stroke unless `stroke` says otherwise; spinning stops under reduced motion.
Add or replace icons when installing the plugin:

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
