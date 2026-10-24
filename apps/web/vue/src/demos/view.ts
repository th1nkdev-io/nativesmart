import { computed, inject, type ComputedRef, type InjectionKey } from "vue";

/** Which Lab tab renders the demo: one live playground, or the static variation grid. */
export const viewKey: InjectionKey<ComputedRef<string>> = Symbol("ns-view");

export function useView() {
  return inject(
    viewKey,
    computed(() => "playground")
  );
}
