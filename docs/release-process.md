# Release Process

Nativesmart uses Changesets for package versioning.

## Release Stages

1. Development branch
2. Pull request and review
3. Test and build
4. Changeset entry
5. Version packages
6. Publish to chosen registry
7. Update docs and migration notes

## Commands

```bash
pnpm check
pnpm tokens:build
pnpm version
pnpm release
```

## Public and Private Changelogs

Public changelog:

- base packages
- public starters
- non-client-specific fixes

Private changelog:

- pro kits
- enterprise packages
- client-specific adapters
- security-sensitive integration notes

## Release Gates

- no broken typecheck
- tests pass
- examples still typecheck
- docs updated for new APIs
- deprecations documented
