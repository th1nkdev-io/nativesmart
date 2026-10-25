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

describe("NsButton extensions", () => {
  it("draws icons around the label", () => {
    const wrapper = mount(NsButton, {
      props: { label: "Envoyer", icon: "send", iconEnd: "chevron-down" }
    });
    expect(wrapper.findAll(".ns-button__icon")).toHaveLength(2);
    expect(wrapper.find(".ns-button__label").text()).toBe("Envoyer");
  });

  it("becomes a link with href, and drops it when disabled", () => {
    const link = mount(NsButton, { props: { label: "Reçu", href: "/recu" } });
    expect(link.element.tagName).toBe("A");
    expect(link.attributes("href")).toBe("/recu");
    const off = mount(NsButton, { props: { label: "Reçu", href: "/recu", disabled: true } });
    expect(off.element.tagName).toBe("BUTTON");
  });

  it("shows a loading text beside the spinner", () => {
    const wrapper = mount(NsButton, {
      props: { label: "Envoyer", loading: true, loadingText: "Envoi…" }
    });
    expect(wrapper.find(".ns-button__label").text()).toBe("Envoi…");
    expect(wrapper.attributes("aria-busy")).toBe("true");
  });

  it("announces a pressed toggle and names an icon-only button", () => {
    const wrapper = mount(NsButton, {
      props: { label: "Favori", icon: "heart", iconOnly: true, pressed: true }
    });
    expect(wrapper.attributes("aria-pressed")).toBe("true");
    expect(wrapper.attributes("aria-label")).toBe("Favori");
    expect(wrapper.find(".ns-button__label").exists()).toBe(false);
    expect(mount(NsButton, { props: { label: "Ok" } }).attributes("aria-pressed")).toBeUndefined();
  });
});
