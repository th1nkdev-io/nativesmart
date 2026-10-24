import { computed, inject, type ComputedRef, type InjectionKey } from "vue";

/** Which Lab tab renders the demo: one live playground, or the static variation grid. */
export const viewKey: InjectionKey<ComputedRef<string>> = Symbol("ns-view");

export function useView() {
  return inject(
    viewKey,
    computed(() => "playground")
  );
}

/** The variation a demo renders: its group (a property name or `states`) and its value. */
export type Variation = { group: string; value: string };
export const variationKey: InjectionKey<Variation> = Symbol("ns-variation");

export function useVariation() {
  return inject<Variation | undefined>(variationKey, undefined);
}
