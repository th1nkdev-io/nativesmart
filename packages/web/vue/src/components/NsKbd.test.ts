import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { keyLabel, parseKeys } from "./kbd-keys";
import NsKbd from "./NsKbd.vue";

describe("kbd keys", () => {
  it("parses combinations and sequences", () => {
    expect(parseKeys("Mod+Shift+P")).toEqual({ keys: ["mod", "shift", "p"], sequence: false });
    expect(parseKeys("g then i")).toEqual({ keys: ["g", "i"], sequence: true });
    expect(parseKeys("esc")).toEqual({ keys: ["escape"], sequence: false });
  });

  it("follows the platform", () => {
    expect(keyLabel("mod", "apple", "symbol")).toBe("⌘");
    expect(keyLabel("mod", "other", "symbol")).toBe("Ctrl");
    expect(keyLabel("alt", "apple", "text")).toBe("Alt");
    expect(keyLabel("shift", "other", "text")).toBe("Shift");
  });
});

describe("NsKbd", () => {
  it("nests one kbd per key and reads the names", () => {
    const wrapper = mount(NsKbd, { props: { keys: "mod+shift+p", platform: "apple" } });
    expect(wrapper.element.tagName).toBe("KBD");
    expect(wrapper.findAll(".ns-kbd__key").map((key) => key.text())).toEqual(["⌘", "⇧", "P"]);
    expect(wrapper.find(".ns-kbd__spoken").text()).toBe("Command + Shift + P");
  });

  it("reads a sequence with its then word", () => {
    const wrapper = mount(NsKbd, { props: { keys: "g i", thenLabel: "puis" } });
    expect(wrapper.find(".ns-kbd__then").text()).toBe("puis");
    expect(wrapper.find(".ns-kbd__spoken").text()).toBe("G puis I");
  });

  it("lights held keys and emits match", async () => {
    const wrapper = mount(NsKbd, {
      props: { keys: "mod+k", platform: "other", listen: true },
      attachTo: document.body
    });
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Control", code: "ControlLeft", ctrlKey: true })
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".ns-kbd__key")[0]!.classes()).toContain("is-held");
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", code: "KeyK", ctrlKey: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("match")).toHaveLength(1);
    expect(wrapper.classes()).toContain("ns-kbd--matched");
    wrapper.unmount();
  });
});
