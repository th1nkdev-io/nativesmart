# Premium Kits

Premium kits turn reusable Nativesmart components into product accelerators.

## Priority 1

- Fintech Kit
- Mobile Money Kit
- Marketplace Kit
- Offline-first Kit

## Priority 2

- Delivery Kit
- SaaS Kit
- Public Services Kit
- Ecommerce Kit

## Kit Requirements

Every kit should include:

- components
- screens
- flows
- mock data
- adapters
- integration docs
- tests

Every kit also has a `kit.json` manifest so future generators, docs and private distribution tooling can read kit metadata without parsing README files.

## Free / Pro / Enterprise Split

Free:

- base tokens
- base UI components
- simple starters

Pro:

- business components
- fintech kit
- mobile money kit
- marketplace kit
- offline-first kit
- advanced templates

Enterprise:

- private components
- white-label theme packs
- client-specific adapters
- private registry
- private documentation
- priority support

## Validation

```bash
pnpm catalog:validate
```
