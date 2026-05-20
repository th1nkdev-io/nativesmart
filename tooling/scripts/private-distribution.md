# Private Distribution Preparation

This is a preparation checklist, not an automated deployment script.

## npm Packages

- choose registry provider
- configure scope access
- set package access
- publish canary package
- verify install in external app

## Flutter Packages

- choose git or private pub strategy
- verify path dependency
- verify git dependency
- document enterprise source delivery

## Release Safety

- run `pnpm check`
- run `pnpm tokens:build`
- update changesets
- update public/private changelog notes
- verify package contents
