import type { ComputedRef, InjectionKey } from "vue";

export type NsButtonVariant = "solid" | "soft" | "outline" | "ghost" | "link";
export type NsButtonIntent = "primary" | "neutral" | "success" | "warning" | "danger";
export type NsButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

/** What a ButtonGroup passes to its buttons; a button's own props win. */
export type NsButtonGroupContext = {
  variant?: NsButtonVariant;
  intent?: NsButtonIntent;
  size?: NsButtonSize;
  disabled: boolean;
};

export const buttonGroupKey: InjectionKey<ComputedRef<NsButtonGroupContext>> =
  Symbol("ns-button-group");
