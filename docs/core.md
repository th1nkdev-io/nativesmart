# Core

`packages/core` contains shared product logic that is independent from React Native and Flutter.

It should only contain reusable business concepts, not UI code.

## Current Modules

```txt
money/
  formatMoney
  parseAmount
  currency types

transactions/
  transaction status
  transaction summary
  receipt model

network/
  online/offline/degraded
  retry state

validation/
  phone validation
  amount validation
  OTP validation

countries/
  country code
  currency mapping
```

## Rule

If a concept can be used by React Native, Flutter, the CLI, templates or tests, it probably belongs in `core`.

If it needs a screen, widget, hook or platform API, it belongs in the platform package.

## Commands

```bash
pnpm --filter @nativesmart/core build
pnpm --filter @nativesmart/core test
```
