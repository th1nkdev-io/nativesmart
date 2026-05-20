import type { CurrencyCode } from "./money";

export type CountryCode = "NG" | "GH" | "KE" | "SN" | "CI" | "ZA" | string;

export type CountryProfile = {
  code: CountryCode;
  name: string;
  dialCode: string;
  currency: CurrencyCode;
  defaultLocale: string;
};

export const countryProfiles: Record<string, CountryProfile> = {
  NG: { code: "NG", name: "Nigeria", dialCode: "+234", currency: "NGN", defaultLocale: "en-NG" },
  GH: { code: "GH", name: "Ghana", dialCode: "+233", currency: "GHS", defaultLocale: "en-GH" },
  KE: { code: "KE", name: "Kenya", dialCode: "+254", currency: "KES", defaultLocale: "en-KE" },
  SN: { code: "SN", name: "Senegal", dialCode: "+221", currency: "XOF", defaultLocale: "fr-SN" },
  CI: {
    code: "CI",
    name: "Cote d'Ivoire",
    dialCode: "+225",
    currency: "XOF",
    defaultLocale: "fr-CI"
  },
  ZA: { code: "ZA", name: "South Africa", dialCode: "+27", currency: "ZAR", defaultLocale: "en-ZA" }
};

export function getCountryProfile(countryCode: CountryCode) {
  return countryProfiles[countryCode.toUpperCase()] ?? null;
}
