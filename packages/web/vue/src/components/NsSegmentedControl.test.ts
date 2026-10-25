import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsSegmentedControl from "./NsSegmentedControl.vue";

const periods = ["Jour", "Semaine", "Mois"];

describe("NsSegmentedControl", () => {
  it("is a named radiogroup with the first option checked by default", () => {
    const wrapper = mount(NsSegmentedControl, { props: { options: periods, label: "Période" } });
    expect(wrapper.attributes("role")).toBe("radiogroup");
    expect(wrapper.attributes("aria-label")).toBe("Période");
    const radios = wrapper.findAll('[role="radio"]');
    expect(radios.map((radio) => radio.attributes("aria-checked"))).toEqual([
      "true",
      "false",
      "false"
    ]);
    expect(radios.map((radio) => radio.attributes("tabindex"))).toEqual(["0", "-1", "-1"]);
  });

  it("selects on click and emits the value", async () => {
    const wrapper = mount(NsSegmentedControl, { props: { options: periods, value: "Jour" } });
    await wrapper.findAll("button")[2]!.trigger("click");
    expect(wrapper.emitted("update:value")?.[0]).toEqual(["Mois"]);
    expect(wrapper.emitted("change")?.[0]).toEqual(["Mois"]);
  });

  it("moves with the arrows, skipping disabled options and wrapping", async () => {
    const wrapper = mount(NsSegmentedControl, {
      props: {
        options: ["Jour", { label: "Semaine", disabled: true }, "Mois"],
        value: "Jour"
      }
    });
    await wrapper.findAll("button")[0]!.trigger("keydown", { key: "ArrowRight" });
    expect(wrapper.emitted("update:value")?.[0]).toEqual(["Mois"]);
    await wrapper.setProps({ value: "Mois" });
    await wrapper.findAll("button")[2]!.trigger("keydown", { key: "ArrowRight" });
    expect(wrapper.emitted("update:value")?.[1]).toEqual(["Jour"]);
  });

  it("names icon-only options by their label", () => {
    const wrapper = mount(NsSegmentedControl, {
      props: {
        options: [
          { label: "Liste", value: "list", icon: "menu" },
          { label: "Grille", value: "grid", icon: "image" }
        ],
        iconOnly: true
      }
    });
    expect(wrapper.findAll("button").map((button) => button.attributes("aria-label"))).toEqual([
      "Liste",
      "Grille"
    ]);
  });
});
