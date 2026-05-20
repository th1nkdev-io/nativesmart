# Architecture

Nativesmart uses a monorepo split by platform, shared foundations and product templates.

## Core packages

- `packages/tokens`: canonical tokens and generated outputs.
- `packages/core`: shared product models and non-platform utilities.
- `packages/react-native`: Expo-friendly React Native components.
- `packages/flutter`: Flutter package with theme and widgets.
- `packages/cli`: future generators for components, modules and starters.

## Token strategy

The MVP keeps tokens in TypeScript because it provides type safety, package exports and easy transformation into JSON, Dart, React Native and future CSS/Figma formats.

Future Style Dictionary integration should be added when token volume, multi-brand requirements or design-tool sync justify the extra layer.

## Component layers

- Generic components: reusable UI primitives such as Button, Text, Box, Card and Input.
- Business components: product-aware patterns such as AmountInput, OTPInput, TransactionCard and OfflineBanner.
- Starters: app-level assembly for common verticals.

## Release strategy

Packages are versioned with Changesets. Public packages can later move from restricted/private distribution to premium or public channels depending on commercial strategy.
