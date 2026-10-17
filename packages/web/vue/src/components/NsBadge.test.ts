import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsBadge from "./NsBadge.vue";

describe("NsBadge", () => {
  it("renders the label with the neutral intent by default", () => {
    const wrapper = mount(NsBadge, { props: { label: "New" } });
    expect(wrapper.text()).toBe("New");
    expect(wrapper.classes()).toContain("ns-badge--neutral");
  });

  it("applies the requested intent", () => {
    const wrapper = mount(NsBadge, { props: { label: "Paid", intent: "success" } });
    expect(wrapper.classes()).toContain("ns-badge--success");
  });
});
