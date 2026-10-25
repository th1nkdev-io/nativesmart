import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import NsFab from "./NsFab.vue";

const actions = [
  { key: "send", label: "Envoyer", icon: "send" },
  { key: "request", label: "Demander", icon: "download" }
];

describe("NsFab", () => {
  it("is named by its label and emits press without actions", async () => {
    const wrapper = mount(NsFab, { props: { label: "Nouveau transfert" } });
    const button = wrapper.find(".ns-fab__button");
    expect(button.attributes("aria-label")).toBe("Nouveau transfert");
    await button.trigger("click");
    expect(wrapper.emitted("press")).toHaveLength(1);
  });

  it("shows the label as text when extended", () => {
    const wrapper = mount(NsFab, { props: { label: "Nouveau transfert", extended: true } });
    expect(wrapper.find(".ns-fab__label").text()).toBe("Nouveau transfert");
    expect(wrapper.find(".ns-fab__button").attributes("aria-label")).toBeUndefined();
  });

  it("opens a menu of actions, focuses the first and closes on Escape", async () => {
    const wrapper = mount(NsFab, { props: { label: "Actions", actions }, attachTo: document.body });
    const button = wrapper.find(".ns-fab__button");
    expect(button.attributes("aria-expanded")).toBe("false");
    expect(button.attributes("aria-haspopup")).toBe("menu");
    await button.trigger("click");
    await nextTick();
    expect(button.attributes("aria-expanded")).toBe("true");
    const items = wrapper.findAll('[role="menuitem"]');
    expect(document.activeElement).toBe(items[0]!.element);
    await wrapper.find('[role="menu"]').trigger("keydown", { key: "Escape" });
    expect(wrapper.emitted("open-change")?.map(([open]) => open)).toEqual([true, false]);
    expect(document.activeElement).toBe(button.element);
    wrapper.unmount();
  });

  it("emits the chosen action and closes", async () => {
    const wrapper = mount(NsFab, { props: { label: "Actions", actions, open: true } });
    await wrapper.findAll('[role="menuitem"]')[1]!.trigger("click");
    expect(wrapper.emitted("action")?.[0]).toEqual(["request"]);
    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);
  });
});
