import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsKeyboardAvoider from "./NsKeyboardAvoider.vue";

const avoider = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) =>
  mount(NsKeyboardAvoider, { props, slots: { default: "<input />", ...slots } });

describe("NsKeyboardAvoider", () => {
  it("makes no room while the keyboard is closed", () => {
    const wrapper = avoider();
    expect(wrapper.attributes("style")).toContain("--ns-keyboard-inset: 0px");
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["ns-keyboard-avoider--padding"]));
    expect(wrapper.classes()).not.toContain("ns-keyboard-avoider--open");
  });

  it("makes room for the keyboard, minus the offset", () => {
    const wrapper = avoider({ keyboardHeight: 300, offset: 56 });
    expect(wrapper.attributes("style")).toContain("--ns-keyboard-inset: 244px");
    expect(wrapper.classes()).toContain("ns-keyboard-avoider--open");
  });

  it("makes no room when disabled or with the none behavior", () => {
    expect(avoider({ keyboardHeight: 300, enabled: false }).attributes("style")).toContain(
      "--ns-keyboard-inset: 0px"
    );
    expect(avoider({ keyboardHeight: 300, behavior: "none" }).attributes("style")).toContain(
      "--ns-keyboard-inset: 0px"
    );
  });

  it("uses the requested behavior and focus gap", () => {
    const wrapper = avoider({ behavior: "translate", focusGap: "8" });
    expect(wrapper.classes()).toContain("ns-keyboard-avoider--translate");
    expect(wrapper.attributes("style")).toContain("--ns-keyboard-gap: var(--ns-space-8)");
  });

  it("places the accessory bar after the scrolling content", () => {
    const wrapper = avoider({}, { accessory: "<button>Envoyer</button>" });
    const children = wrapper.element.children;
    expect(children[0]!.classList.contains("ns-keyboard-avoider__content")).toBe(true);
    expect(children[1]!.textContent).toBe("Envoyer");
  });

  it("tells when the keyboard opens and closes", async () => {
    const wrapper = avoider({ keyboardHeight: 0 });
    await wrapper.setProps({ keyboardHeight: 280 });
    await wrapper.setProps({ keyboardHeight: 0 });
    expect(wrapper.emitted("keyboard-change")).toEqual([
      [{ visible: true, height: 280 }],
      [{ visible: false, height: 0 }]
    ]);
  });
});
