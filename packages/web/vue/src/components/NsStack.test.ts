import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import NsStack from "./NsStack.vue";

const items = () => [h("span", "Kofi"), h("span", "Aïcha"), h("span", "Moussa")];
const stack = (props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) =>
  mount(NsStack, { props, slots: { default: items, ...slots } });

describe("NsStack", () => {
  it("stacks in a column with a medium gap by default", () => {
    const style = stack().attributes("style");
    expect(style).toContain("--ns-stack-direction-base: column");
    expect(style).toContain("--ns-stack-gap-base: var(--ns-space-4)");
  });

  it("changes direction and gap from a breakpoint up", () => {
    const wrapper = stack({
      direction: { base: "column", md: "row" },
      gap: { base: "sm", lg: "xl" }
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-stack--direction-md", "ns-stack--gap-lg"])
    );
    expect(wrapper.attributes("style")).toContain("--ns-stack-gap-lg: var(--ns-space-8)");
  });

  it("puts a hidden separator between items", () => {
    const wrapper = stack({ divided: true });
    const dividers = wrapper.findAll(".ns-stack__divider");
    expect(dividers).toHaveLength(2);
    expect(dividers[0]!.attributes("aria-hidden")).toBe("true");
  });

  it("uses list items as separators in a list and accepts a custom one", () => {
    const wrapper = stack({ as: "ul" }, { divider: () => "·" });
    expect(wrapper.element.tagName).toBe("UL");
    const divider = wrapper.find(".ns-stack__divider");
    expect(divider.element.tagName).toBe("LI");
    expect(divider.text()).toBe("·");
  });

  it("joins items along the base axis when compact", () => {
    const wrapper = stack({
      compact: true,
      direction: { base: "row", md: "column" },
      divided: true
    });
    expect(wrapper.classes()).toContain("ns-stack--compact-row");
    expect(wrapper.find(".ns-stack__divider").exists()).toBe(false);
  });
});
