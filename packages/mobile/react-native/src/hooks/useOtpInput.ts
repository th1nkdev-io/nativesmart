import { useCallback, useMemo, useState } from "react";
import { validateOtp } from "@nativesmart/core";

export function updateOtpAtIndex(value: string, index: number, digit: string, length: number) {
  const next = value.padEnd(length, " ").split("");
  next[index] = digit.replace(/\D/g, "").slice(0, 1);
  return next.join("").replace(/\s/g, "").slice(0, length);
}

export function useOtpInput(length = 6, initialValue = "") {
  const [value, setValue] = useState(initialValue.slice(0, length));

  const setDigit = useCallback(
    (index: number, digit: string) => {
      setValue((current) => updateOtpAtIndex(current, index, digit, length));
    },
    [length]
  );

  const validation = useMemo(() => validateOtp(value, length), [length, value]);

  return {
    value,
    setValue,
    setDigit,
    validation,
    complete: validation.valid
  };
}
