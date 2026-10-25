import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import NsSurface from "./NsSurface.vue";

describe("NsSurface", () => {
  it("sits at the base level at the root", () => {
    const wrapper = mount(NsSurface, { slots: { default: "Solde" } });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        "ns-surface--base",
        "ns-surface--elevated",
        "ns-surface--tone-neutral"
      ])
    );
    expect(wrapper.attributes("role")).toBeUndefined();
  });

  it("lifts nested auto surfaces one level at a time", () => {
    const wrapper = mount(NsSurface, {
      props: { level: "raised" },
      slots: {
        default: () => h(NsSurface, null, { default: () => h(NsSurface, { class: "inner" }) })
      }
    });
    const levels = wrapper.findAll(".ns-surface").map((node) => node.attributes("data-level"));
    expect(levels).toEqual(["raised", "floating", "overlay"]);
  });

  it("gives its resolved level to the slot", () => {
    const wrapper = mount(NsSurface, {
      props: { level: "sunken" },
      slots: { default: ({ level }: { level: string }) => `Niveau ${level}` }
    });
    expect(wrapper.text()).toBe("Niveau sunken");
  });

  it("acts as a button when interactive", async () => {
    const wrapper = mount(NsSurface, { props: { interactive: true } });
    expect(wrapper.attributes("role")).toBe("button");
    expect(wrapper.attributes("tabindex")).toBe("0");
    await wrapper.trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("leaves the keyboard alone when disabled", () => {
    const wrapper = mount(NsSurface, { props: { interactive: true, disabled: true } });
    expect(wrapper.attributes("tabindex")).toBeUndefined();
    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.classes()).not.toContain("ns-surface--interactive");
  });
});
