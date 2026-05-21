# Fintech Starter Implementation

This starter is intentionally small enough to copy into an Expo app and large enough to show the product contract.

## Replace first

- Swap `api/mockApi.ts` for your real wallet API client.
- Connect `AppNavigator` to your navigation library of choice.
- Replace phone sign-in with your authentication provider.
- Add transaction pagination before production use.

## Production checklist

- Validate phone and amount inputs with `@nativesmart/core`.
- Add loading, failure and retry states for every network call.
- Add receipt sharing only after transaction status is final.
- Keep balance and transaction currency consistent per wallet.
