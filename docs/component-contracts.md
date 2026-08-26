# Component Contracts

Component contracts are the stable API between Nativesmart's design language and its renderers.
They live in `@nativesmart/contracts` and contain no React, Flutter, browser or native imports.

## Contract contents

Each contract declares anatomy, properties, defaults, states, events, accessibility requirements
and semantic token slots. The initial catalog covers Avatar, Badge, Box, Button, Card, Divider,
Icon, Input, Modal, Spinner, Text and Toast.

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
Native can use `Pressable`, Flutter can use a Widget and SwiftUI can use its native Button.

## Evolution

Adding optional capabilities is normally backward compatible. Removing a property, changing an
event meaning or narrowing supported values is breaking. Experimental additions should remain
`draft` or `preview` until at least two renderer implementations prove the abstraction.
