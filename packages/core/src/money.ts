export type CurrencyCode = "NGN" | "GHS" | "KES" | "XOF" | "ZAR" | "USD" | string;

export type Money = {
  amountMinor: number;
  currency: CurrencyCode;
};

export function formatMoney(value: Money, locale = "en-NG") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: value.currency,
    maximumFractionDigits: 2
  }).format(value.amountMinor / 100);
}

export function parseAmount(input: string): number | null {
  const normalized = input.replace(/[,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized) * 100);
}
