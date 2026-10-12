import { useCallback, useMemo, useState } from "react";
import { parseAmount, validateAmount } from "@nativesmart/core";

export function sanitizeAmountInput(value: string) {
  return value.replace(/[^\d.,]/g, "").replace(/,/g, "");
}

export function useAmountInput(initialValue = "", minimumMinor = 1) {
  const [value, setValue] = useState(initialValue);

  const onChangeText = useCallback((nextValue: string) => {
    setValue(sanitizeAmountInput(nextValue));
  }, []);

  const amountMinor = useMemo(() => parseAmount(value), [value]);
  const validation = useMemo(() => validateAmount(value, minimumMinor), [minimumMinor, value]);

  return {
    value,
    setValue,
    onChangeText,
    amountMinor,
    validation,
    valid: validation.valid
  };
}
