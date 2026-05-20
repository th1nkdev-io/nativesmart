import type { Money } from "./money";

export type TransactionStatus = "pending" | "successful" | "failed" | "reversed";

export type TransactionSummary = {
  id: string;
  title: string;
  reference: string;
  amount: Money;
  status: TransactionStatus;
  createdAt: string;
  counterparty?: string;
};

export type ReceiptLineItem = {
  label: string;
  value: string;
};

export type Receipt = {
  transaction: TransactionSummary;
  items: ReceiptLineItem[];
  issuedAt: string;
};
