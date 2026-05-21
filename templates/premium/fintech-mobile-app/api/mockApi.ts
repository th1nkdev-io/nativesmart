import type { Money } from "@nativesmart/core";

export type FintechTransaction = {
  id: string;
  title: string;
  reference: string;
  amount: Money;
  status: "pending" | "successful" | "failed";
  createdAt: string;
};

export type WalletSnapshot = {
  balance: Money;
  country: "NG" | "GH" | "KE" | "SN";
  transactions: FintechTransaction[];
};

const transactions: FintechTransaction[] = [
  {
    id: "txn_001",
    title: "Wallet top-up",
    reference: "NS-2026-0001",
    amount: { amountMinor: 250000, currency: "NGN" },
    status: "successful",
    createdAt: "2026-05-21T08:30:00.000Z"
  },
  {
    id: "txn_002",
    title: "Transfer to supplier",
    reference: "NS-2026-0002",
    amount: { amountMinor: -75000, currency: "NGN" },
    status: "pending",
    createdAt: "2026-05-21T09:15:00.000Z"
  }
];

export async function getWalletSnapshot(): Promise<WalletSnapshot> {
  return {
    balance: { amountMinor: 425000, currency: "NGN" },
    country: "NG",
    transactions
  };
}

export async function getTransaction(id: string) {
  return transactions.find((transaction) => transaction.id === id) ?? null;
}
