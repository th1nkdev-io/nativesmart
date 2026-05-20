# Fintech Kit

Priority 1 kit for wallet, transfer, KYC and transaction-heavy mobile products.

## Components

- WalletBalanceCard
- TransactionList
- TransactionDetails
- TransferForm
- BeneficiarySelector
- FeeSummary
- PaymentConfirmation
- ReceiptShareView
- KycStatusCard
- AmountInput integration
- PhoneNumberInput integration
- OTP verification flow

## Flows

- onboarding
- login
- wallet dashboard
- send money
- receive money
- transaction details
- KYC status
- receipt sharing
- network error recovery

## Integration Boundaries

The kit must not hard-code banks, wallets, countries, KYC providers or API clients. Those belong in adapters.
