import React from "react";
import { MobileMoneySelector, type MobileMoneyProvider } from "./MobileMoneySelector";

export function PaymentMethodSelector(props: {
  providers: MobileMoneyProvider[];
  selected?: string;
  onSelect?: (provider: string) => void;
}) {
  return <MobileMoneySelector {...props} />;
}
