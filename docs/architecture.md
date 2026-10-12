# Architecture

Nativesmart is Thinkdev SARL's multi-platform component infrastructure. Its source of truth is
platform-neutral: platforms implement shared contracts instead of defining the product model.

## Architecture principles

1. Share specifications, tokens and behavior; do not force UI source-code sharing.
2. Keep design systems independent from frameworks and operating systems.
3. Let each renderer use idiomatic host-platform primitives.
4. Compose customization in a predictable order: primitives, semantics, design system, brand,
   product and user preferences.
5. Measure implementation coverage against contracts rather than package existence.

## Layer model

```txt
contracts
  component anatomy, properties, states, events and accessibility
       |
tokens + design-systems
  primitives -> semantics -> recipes -> brand/product overrides
       |
platform renderers
  web: Web Components (HTML-CSS), React, Vue, Svelte, Angular
  mobile: React Native (StyleSheet or NativeWind), Flutter, Compose (Kotlin),
          SwiftUI (Swift), Ionic/Capacitor, .NET MAUI
  desktop: Electron or Tauri shells, Flutter, Compose, SwiftUI
       |
integrations
  token outputs, meta-frameworks, server templates, shared logic,
  PWA delivery, tooling and USSD/SMS channels
       |
business components and kits
  fintech, mobile money, marketplace, offline-first and other domains
       |
starters and applications
```

Dependencies only flow down this diagram. Contracts never import a platform renderer. Business
logic in `@nativesmart/core` remains independent from UI packages.

## Foundation packages

- `packages/contracts`: canonical component, design-system, brand and renderer schemas.
- `packages/tokens`: primitive and semantic values plus generated platform outputs.
- `packages/design-systems`: Thinkdev, Material, Bootstrap and Cupertino recipes.
- `packages/platform-registry`: renderer and integration inventory, maturity and conformance
  validation.
- `packages/core`: shared product models and non-platform business logic.
- `packages/cli`: generators, workspace validation and future code generation.

## Platform renderers

Existing preview renderers:

- `packages/react-native`: Android and iOS through React Native and Expo.
- `packages/flutter`: Android, iOS, web and desktop through Flutter.

Planned renderers are declared before implementation in `@nativesmart/platform-registry`:

- web: framework-neutral Web Components (`@nativesmart/elements`), React, and Vue, Svelte and
  Angular wrappers built on the Web Components;
- mobile: React Native with NativeWind, Jetpack Compose (Kotlin), SwiftUI (Swift),
  Ionic/Capacitor on top of the Web Components, and .NET MAUI;
- desktop: Electron or Tauri-compatible composition using web renderers.

React Native ships two styling engines that share contracts, hooks and logic: `StyleSheet`
(`@nativesmart/react-native`) and NativeWind (`@nativesmart/react-native-nativewind`).

A manifest may declare `wraps` when it adapts another renderer instead of reimplementing it, and
`styling` to name its styling engine. The full matrix, package names and delivery order are in
[Platforms](platforms.md).

## Integrations

Integrations connect renderers to products without being renderers themselves. They are declared
in `packages/platform-registry/src/integrations.ts` with a kind and the renderers they serve:

- token outputs: W3C DTCG tokens and the shared Tailwind preset;
- design tools: Figma token synchronization;
- shared logic: the Kotlin Multiplatform core used by Compose and SwiftUI;
- meta-frameworks: Next.js, Nuxt, SvelteKit and Astro;
- server templates: Laravel Blade and Django templates rendering Web Components markup;
- delivery and shells: Progressive Web App and Expo;
- tooling: Storybook;
- channels: USSD and SMS rendering of mobile money flow contracts.

A planned manifest is not an implementation claim. It records package naming, languages,
platforms, supported design systems and delivery status. A renderer can become stable only after
it implements the required contracts and passes platform-specific visual, behavioral and
accessibility tests.

## Component model

Every reusable component has a platform-neutral contract containing:

- stable identifier and layer;
- anatomy and slots;
- public properties and defaults;
- interaction and validation states;
- emitted events;
- accessibility semantics and keyboard behavior;
- required semantic token slots.

Renderers may expose additional platform-native properties, but must preserve the shared
contract. Platform-specific APIs belong in renderer packages and never leak into contracts.

## Design-system model

A design system is more than a color theme. It combines principles, foundation overrides and
component recipes. The built-in families are:

- Thinkdev: neutral, highly brandable company default;
- Material: state layers, tonal color, elevation and adaptive layout;
- Bootstrap: browser-native and web-first conventions;
- Cupertino: Apple-native hierarchy, motion and interaction.

Bootstrap is not advertised as a native-mobile system, and Cupertino is not advertised as a
general web system. The registry makes those boundaries explicit.

Runtime customization follows this precedence, where the rightmost value wins:

```txt
Nativesmart defaults < design-system recipe < brand < product < user preference
```

Color mode, density and text direction are explicit configuration axes. Brand packages should
contain token overrides and assets, not forks of renderer components.

## Token strategy

Token layers have separate responsibilities:

1. primitives: raw color scales, spacing, radius, typography, shadow and motion values;
2. semantic tokens: purpose such as `color.action.primary` or `color.surface.default`;
3. component tokens: slots such as `button.background` or `input.focus.ring`;
4. design-system recipes: anatomy and variant decisions using semantic/component tokens;
5. brand and product overrides: identity and contextual decisions.

Tokens are exported in the W3C DTCG format and transformed with Style Dictionary. Generated targets
include JSON, CSS custom properties, the Tailwind preset, TypeScript, Dart, Kotlin, Swift, C# and
design-tool formats. Generated files are outputs, never alternate sources of truth.

## Business layers

- Foundation components: Button, Input, Modal, Text and other generic UI primitives.
- Business components: AmountInput, OTPInput, TransactionCard and domain-aware patterns.
- Kits: reusable components, flows, adapters and mock data for a business vertical.
- Starters: application-level assembly of renderers, design systems and kits.

Business components depend on foundation contracts. Kits depend on business and foundation
components. Starters compose kits; they do not redefine them.

## Conformance and delivery

`pnpm architecture:validate` verifies that:

- component identifiers and properties are structurally valid;
- recipes reference known component contracts;
- renderer and integration identifiers are unique;
- renderers reference known components and design systems;
- every supported design system shares at least one category with its renderer;
- `wraps` references another known renderer;
- integrations target known renderers;
- mobile, web and desktop targets are represented.

`pnpm check` runs this architectural validation after build, type checking, linting, tests and
product-catalog validation. Future maturity gates should add contract tests, accessibility tests,
visual regression, token drift detection and platform release checks.

Packages are independently versioned with Changesets. Contracts and tokens follow stricter
compatibility rules because every renderer consumes them. Breaking contract changes require a
migration note and coordinated renderer updates.
