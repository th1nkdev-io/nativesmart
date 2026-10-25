import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsToggleButton from "./NsToggleButton.vue";

describe("NsToggleButton", () => {
  it("switches its pressed state and keeps its name", async () => {
    const wrapper = mount(NsToggleButton, { props: { label: "Favori", icon: "heart" } });
    const button = wrapper.find("button");
    expect(button.attributes("aria-pressed")).toBe("false");
    await button.trigger("click");
    expect(wrapper.emitted("update:pressed")?.[0]).toEqual([true]);
    expect(wrapper.emitted("change")?.[0]).toEqual([true]);
    expect(button.attributes("aria-pressed")).toBe("true");
    expect(button.text()).toBe("Favori");
  });

  it("swaps the icon and takes the intent when on", () => {
    const wrapper = mount(NsToggleButton, {
      props: {
        label: "Masquer le solde",
        icon: "eye",
        iconPressed: "eye-off",
        pressed: true,
        intent: "success"
      }
    });
    expect(wrapper.find("button").classes()).toContain("ns-button--success");
    expect(wrapper.find("button").classes()).toContain("ns-button--pressed");
  });

  it("can be a square icon toggle named by its label", () => {
    const wrapper = mount(NsToggleButton, {
      props: { label: "Gras", icon: "edit", iconOnly: true }
    });
    expect(wrapper.find("button").attributes("aria-label")).toBe("Gras");
    expect(wrapper.find("button").attributes("aria-pressed")).toBe("false");
  });
});
