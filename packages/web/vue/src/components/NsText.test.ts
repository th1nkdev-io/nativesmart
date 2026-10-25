import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import NsText from "./NsText.vue";

describe("NsText roles and decorations", () => {
  it("picks the element and the style of the role", () => {
    const quote = mount(NsText, { props: { role: "quote" }, slots: { default: "Merci Kofi" } });
    expect(quote.element.tagName).toBe("BLOCKQUOTE");
    expect(quote.attributes("style")).toContain("--ns-text-size: var(--ns-text-quote-size)");
    const small = mount(NsText, { props: { size: "sm", weight: "semibold" } });
    expect(small.attributes("style")).toContain("--ns-text-size: var(--ns-text-body-sm-size)");
    expect(small.attributes("style")).toContain("--ns-text-weight: var(--ns-font-weight-semibold)");
  });

  it("nests semantic elements for decorations", () => {
    const wrapper = mount(NsText, {
      props: { strong: true, strike: true, mark: true },
      slots: { default: "12 000 FCFA" }
    });
    const strong = wrapper.find("strong");
    expect(strong.find("s mark").text()).toBe("12 000 FCFA");
  });

  it("clamps lines and keeps the expand button hidden until the text overflows", () => {
    const wrapper = mount(NsText, { props: { lines: 2, expandable: true } });
    expect(wrapper.find(".ns-text__content--clamped").exists()).toBe(true);
    expect(wrapper.attributes("style")).toContain("--ns-text-lines: 2");
    expect(wrapper.find(".ns-text__expand").exists()).toBe(false);
  });

  it("copies its text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const wrapper = mount(NsText, { props: { copyable: true }, slots: { default: "NS-4521" } });
    await wrapper.find(".ns-text__copy").trigger("click");
    await nextTick();
    expect(writeText).toHaveBeenCalledWith("NS-4521");
    expect(wrapper.emitted("copy")?.[0]).toEqual(["NS-4521"]);
    expect(wrapper.find(".ns-text__copy").attributes("aria-label")).toBe("Copied");
  });
});
