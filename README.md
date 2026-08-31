# Nativesmart

Nativesmart is Th1nkdev's internal mobile production infrastructure for building professional React Native and Flutter products faster.

It is not a button library. It is a reusable foundation for design tokens, mobile UI components, business components, starters, templates, product conventions and future premium delivery.

## MVP scope

- React Native package with TypeScript and Expo-friendly primitives.
- Flutter package with Dart tokens, themes and widgets.
- Shared canonical design tokens.
- Product-oriented structure for fintech, mobile money, marketplaces, SaaS, delivery, public services, transaction flows and offline-first apps.

## Monorepo

```txt
apps/
  docs/
  example-react-native/
  example-flutter/
kits/
  fintech/
  mobile-money/
  marketplace/
  offline-first/
packages/
  contracts/
  tokens/
  design-systems/
  platform-registry/
  core/
  react-native/
  flutter/
  cli/
templates/
  react-native-starter/
  flutter-starter/
  fintech-starter/
  marketplace-starter/
tooling/
  eslint-config/
  tsconfig/
  scripts/
docs/
```

## Commands

```bash
pnpm install
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm format:check
pnpm check
pnpm catalog:validate
pnpm tokens:build
```

## Package roles

- `@nativesmart/contracts`: platform-neutral component and renderer contracts.
- `@nativesmart/tokens`: canonical tokens and generated platform outputs.
- `@nativesmart/design-systems`: Thinkdev, Material, Bootstrap and Cupertino recipes.
- `@nativesmart/platform-registry`: renderer coverage and architecture conformance.
- `@nativesmart/core`: shared product types and non-platform logic.
- `@nativesmart/react-native`: Expo-compatible React Native components and hooks.
- `nativesmart_flutter`: Flutter theme and widget package.
- `@nativesmart/cli`: future generator and starter scaffolding CLI.

## Foundation Docs

- [Vision](docs/vision.md)
- [Architecture](docs/architecture.md)
- [Component Contracts](docs/component-contracts.md)
- [Design Systems](docs/design-systems.md)
- [Tokens](docs/tokens.md)
- [Core](docs/core.md)
- [React Native](docs/react-native.md)
- [Flutter](docs/flutter.md)
- [Components](docs/components.md)
- [Business Components](docs/business-components.md)
- [Theming](docs/theming.md)
- [Premium Kits](docs/premium-kits.md)
- [Commercial Model](docs/commercial-model.md)
- [Private Registry](docs/private-registry.md)
- [Enterprise Integration](docs/enterprise-integration.md)
- [Governance](docs/governance.md)
- [Roadmap](docs/roadmap.md)
- [Production Readiness Checklist](docs/production-readiness-checklist.md)
- [Contribution](docs/contribution.md)

## Status

This repository is initialized as an MVP architecture scaffold. The first fully implemented pieces are the shared tokens, core types, React Native base components and Flutter theme/widget skeletons.
