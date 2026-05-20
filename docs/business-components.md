# Business Components

Business components encode product patterns common in fintech, mobile money, marketplaces and transactional apps.

## Current Components

```txt
PhoneNumberInput
AmountInput
OTPInput / OtpInput
MobileMoneySelector
PaymentMethodSelector
TransactionCard
ReceiptView
OfflineBanner
NetworkRetryState
KycDocumentUpload
```

## Usage Direction

Business components should stay configurable. They may know about product patterns, but they should not hard-code one client, one API or one country.

Good examples:

- passing `currency="XOF"`
- passing available mobile money providers
- passing a transaction model
- passing retry/upload callbacks

Avoid:

- hard-coded provider lists inside the component
- hard-coded copy that cannot be overridden
- direct API calls inside UI components

## Premium Path

These components are the beginning of future sellable kits:

- Mobile Money Kit
- KYC Kit
- Checkout Kit
- Transaction Kit
- Offline-first Kit
