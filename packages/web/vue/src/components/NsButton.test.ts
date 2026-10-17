import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsButton from "./NsButton.vue";

describe("NsButton", () => {
  it("renders the label with contract defaults", () => {
    const wrapper = mount(NsButton, { props: { label: "Pay" } });
    expect(wrapper.text()).toBe("Pay");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-button--solid", "ns-button--primary", "ns-button--md"])
    );
    expect(wrapper.attributes("type")).toBe("button");
  });

  it("emits press on click", async () => {
    const wrapper = mount(NsButton, { props: { label: "Pay" } });
    await wrapper.trigger("click");
    expect(wrapper.emitted("press")).toHaveLength(1);
  });

  it("does not emit press while loading and exposes the busy state", async () => {
    const wrapper = mount(NsButton, { props: { label: "Pay", loading: true } });
    await wrapper.trigger("click");
    expect(wrapper.emitted("press")).toBeUndefined();
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.find('[role="progressbar"]').attributes("aria-label")).toBe("Pay");
  });

  it("is disabled natively when disabled", () => {
    const wrapper = mount(NsButton, { props: { label: "Pay", disabled: true } });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("keeps the label accessible when the slot replaces it", () => {
    const wrapper = mount(NsButton, { props: { label: "Close" }, slots: { default: "×" } });
    expect(wrapper.attributes("aria-label")).toBe("Close");
  });
});
