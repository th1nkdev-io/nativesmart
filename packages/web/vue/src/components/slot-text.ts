import type { VNode } from "vue";

/** The plain text of rendered slot content, for copying, ids and spoken labels. */
export function slotText(nodes: VNode[] | undefined): string {
  return (nodes ?? [])
    .map((node) =>
      typeof node.children === "string"
        ? node.children
        : Array.isArray(node.children)
          ? slotText(node.children as VNode[])
          : ""
    )
    .join("");
}
