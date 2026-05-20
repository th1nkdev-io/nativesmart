# Private Registry

Nativesmart should prepare private package distribution without deploying it immediately.

## React Native / TypeScript

Recommended channels:

- GitHub Packages
- npm private registry
- Verdaccio for internal testing

Packages:

- `@nativesmart/tokens`
- `@nativesmart/core`
- `@nativesmart/react-native`
- `@nativesmart/cli`
- future `@nativesmart/pro-*` packages

## Flutter

Recommended channels:

- private Git repositories with path/git dependencies
- private pub server later if volume justifies it
- bundled enterprise source delivery for client-specific packages

## Access Tiers

Free:

- public or internal base packages

Pro:

- paid kit packages and premium templates

Enterprise:

- private registry scope
- private docs
- client-specific packages

## Release Requirements

- Changesets versioning
- changelog public/private split
- package provenance
- release notes
- migration notes for breaking changes
- product catalog validation with `pnpm catalog:validate`
