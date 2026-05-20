# Deprecation Policy

Nativesmart should keep APIs stable while still allowing product evolution.

## Component Lifecycle

```txt
experimental
preview
stable
deprecated
removed
```

## Promotion To Stable

A component can become stable when it has:

- typed public API
- usage in at least one example or kit
- light and dark mode support
- basic accessibility review
- tests or documented QA path
- clear docs

## Deprecation Rules

- announce replacement
- keep compatibility for at least one minor release when possible
- document migration
- avoid silent behavioral changes

## Breaking Changes

Breaking changes require:

- major version bump
- migration guide
- release note
- kit impact review
