# Component Contracts

Component contracts are the stable API between Nativesmart's design language and its renderers.
They live in `@nativesmart/contracts` and contain no React, Flutter, browser or native imports.

## One file per component

Every component in the [Component Inventory](component-inventory.md) has its own contract file,
grouped by layer and category:

```txt
packages/contracts/src/
  define.ts                 # defineContract() and property() helpers
  catalog.ts                # lookups by id, layer, category and priority
  components/
    index.ts                # componentContracts, foundationContracts, businessContracts
    foundation/
      layout/  typography/  actions/  forms/  feedback/
      overlays/  navigation/  data-display/  media/  utilities/
    business/
      identity/  payments/  connectivity/  commerce/
      delivery/  saas/  public-services/
```

Each category folder holds one `<id>.ts` file per component and an `index.ts` exporting the
category list. For example, `components/foundation/actions/button.ts` exports `buttonContract`
and `components/business/payments/amount-input.ts` exports `amountInputContract`.

A test compares the contracts with `docs/component-inventory.md` (ids, categories and
priorities), so the inventory and the contract folder cannot diverge. Adding a component means
adding a row to the inventory and its file in the matching category folder.

## Contract contents

Each contract declares:

- identity: kebab-case `id`, `name`, `layer`, `category`, `priority` and `description`;
- `status`: `draft`, `preview`, `stable` or `deprecated`;
- optional `platforms` when the component only targets some families (for example web-only or
  mobile-only);
- anatomy, properties, defaults, states, events, accessibility requirements and semantic token
  slots.

`defineContract()` fills unspecified fields with a minimal draft (a `root` anatomy part, a
`default` state and no properties). A draft contract reserves the component and its place in the
architecture; it is completed before any renderer implements it.

Today, 12 contracts are in `preview` (Avatar, Badge, Box, Button, Card, Divider, Icon, Input,
Modal, Spinner, Text and Toast) and the other 181 are drafts.

The Button contract, for example, separates presentation (`solid`, `outline`, `ghost`, `link`)
from intent (`primary`, `neutral`, `danger`). This prevents a framework-specific prop convention
from becoming the universal model.

## Renderer rules

A renderer must:

- implement required properties and observable states;
- preserve event semantics even when host-framework event names differ;
- map roles, focus and keyboard behavior to the host platform;
- consume semantic/component tokens rather than primitive values directly;
- document any platform-only extension;
- publish its implementation status through the platform registry.

Contracts describe behavior, not markup or widget trees. A web Button can use `<button>`, React
Native can use `Pressable`, Flutter can use a Widget, SwiftUI can use its native Button and Compose
can use its `Button` composable.

## Evolution

Adding optional capabilities is normally backward compatible. Removing a property, changing an
event meaning or narrowing supported values is breaking. Experimental additions should remain
`draft` or `preview` until at least two renderer implementations prove the abstraction.
