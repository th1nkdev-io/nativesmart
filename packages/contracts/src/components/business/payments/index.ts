import type { ComponentContract } from "../../../types";
import { amountInputContract } from "./amount-input";
import { moneyTextContract } from "./money-text";
import { currencySelectorContract } from "./currency-selector";
import { balanceVisibilityToggleContract } from "./balance-visibility-toggle";
import { walletBalanceCardContract } from "./wallet-balance-card";
import { mobileMoneySelectorContract } from "./mobile-money-selector";
import { paymentMethodSelectorContract } from "./payment-method-selector";
import { providerSelectorContract } from "./provider-selector";
import { transferFormContract } from "./transfer-form";
import { beneficiarySelectorContract } from "./beneficiary-selector";
import { beneficiaryCardContract } from "./beneficiary-card";
import { feeBreakdownContract } from "./fee-breakdown";
import { paymentConfirmationContract } from "./payment-confirmation";
import { paymentStatusContract } from "./payment-status";
import { retryPaymentStateContract } from "./retry-payment-state";
import { transactionCardContract } from "./transaction-card";
import { transactionListContract } from "./transaction-list";
import { transactionDetailsContract } from "./transaction-details";
import { transactionStatusBadgeContract } from "./transaction-status-badge";
import { receiptViewContract } from "./receipt-view";
import { receiptShareViewContract } from "./receipt-share-view";
import { qrPaymentRequestContract } from "./qr-payment-request";
import { qrPaymentScannerContract } from "./qr-payment-scanner";
import { bankCardInputContract } from "./bank-card-input";

export const paymentsContracts: readonly ComponentContract[] = [
  amountInputContract,
  moneyTextContract,
  currencySelectorContract,
  balanceVisibilityToggleContract,
  walletBalanceCardContract,
  mobileMoneySelectorContract,
  paymentMethodSelectorContract,
  providerSelectorContract,
  transferFormContract,
  beneficiarySelectorContract,
  beneficiaryCardContract,
  feeBreakdownContract,
  paymentConfirmationContract,
  paymentStatusContract,
  retryPaymentStateContract,
  transactionCardContract,
  transactionListContract,
  transactionDetailsContract,
  transactionStatusBadgeContract,
  receiptViewContract,
  receiptShareViewContract,
  qrPaymentRequestContract,
  qrPaymentScannerContract,
  bankCardInputContract
];
