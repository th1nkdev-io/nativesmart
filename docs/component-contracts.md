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

Today, 26 contracts are specified in `preview`:

- the 12 Core v1.0 components: Avatar, Badge, Box, Button, Card, Divider, Icon, Input, Modal,
  Spinner, Text and Toast;
- the 14 P1 form components: Form, Form Field, Text Area, Password Input, Search Input, Pin Input,
  Select, Combobox, Checkbox, Checkbox Group, Radio Group, Switch, Date Picker and File Upload.

The other 167 contracts are drafts.

## Property kinds

| Kind          | Use                                                       |
| ------------- | --------------------------------------------------------- |
| `string`      | Text, identifiers, ISO 8601 dates and locales             |
| `number`      | Counts, sizes and durations                               |
| `boolean`     | Flags such as `disabled` or `checked`                     |
| `enum`        | A closed set of `values`; the default must be one of them |
| `slot`        | Content provided by the caller (children, options, items) |
| `string-list` | Several values, such as the checked items of a group      |

Validation rejects an enum without values, values on a non-enum property, a default value of the
wrong type or outside the enum values, and duplicate anatomy parts, states or events.

## Form control conventions

Form contracts share the same vocabulary so a form behaves the same on every platform. The shared
building blocks live in `components/foundation/forms/shared.ts`.

- **Properties**: labelled controls expose `label` (required), `name`, `description`,
  `errorMessage`, `required`, `invalid`, `disabled` and `readOnly`, plus `value` and, when it
  applies, `placeholder`.
- **Controlled values**: `value` holds the current value and `change` reports a new one. Dates use
  ISO 8601 strings (`YYYY-MM-DD`); multiple values use `string-list`.
- **States**: text-like controls share `default`, `hovered`, `focused`, `invalid`, `readonly` and
  `disabled`; choice controls describe their own (`checked`, `indeterminate`, `on`, `off`).
- **Events**: `change`, `focus` and `blur`; overlays add `open-change`.
- **Accessibility**: label, description and error are programmatically associated with the
  control, errors are announced, and required or invalid fields never rely on color alone.
- **Validation**: `Form` decides when fields are validated (`submit`, `blur` or `change`) and moves
  focus to the error summary or the first invalid field after a failed submission.

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
