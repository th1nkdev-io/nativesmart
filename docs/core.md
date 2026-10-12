# Core

`packages/core` contains shared product logic that is independent from every UI renderer.

Kotlin and Swift renderers cannot import TypeScript, so the same rules will be ported to a Kotlin
Multiplatform core (`com.thinkdev.nativesmart:core`) shared by Jetpack Compose and SwiftUI. The
TypeScript module stays the reference, and both implementations must pass the same test cases.

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
