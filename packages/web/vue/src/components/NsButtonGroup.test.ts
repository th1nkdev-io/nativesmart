import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import NsButton from "./NsButton.vue";
import NsButtonGroup from "./NsButtonGroup.vue";
import NsIconButton from "./NsIconButton.vue";

describe("NsButtonGroup", () => {
  it("is a named group that gives its look to the buttons", () => {
    const wrapper = mount(NsButtonGroup, {
      props: { label: "Exporter", variant: "soft", intent: "primary", size: "sm" },
      slots: {
        default: () => [
          h(NsButton, { label: "PDF" }),
          h(NsButton, { label: "CSV", variant: "solid" }),
          h(NsIconButton, { icon: "more-horizontal", label: "Plus" })
        ]
      }
    });
    expect(wrapper.attributes("role")).toBe("group");
    expect(wrapper.attributes("aria-label")).toBe("Exporter");
    const buttons = wrapper.findAll("button");
    expect(buttons[0]!.classes()).toEqual(
      expect.arrayContaining(["ns-button--soft", "ns-button--primary", "ns-button--sm"])
    );
    expect(buttons[1]!.classes()).toContain("ns-button--solid");
    expect(buttons[2]!.classes()).toContain("ns-button--soft");
  });

  it("disables every button", () => {
    const wrapper = mount(NsButtonGroup, {
      props: { disabled: true },
      slots: { default: () => [h(NsButton, { label: "A" }), h(NsButton, { label: "B" })] }
    });
    expect(
      wrapper.findAll("button").every((button) => button.attributes("disabled") !== undefined)
    ).toBe(true);
  });

  it("joins the buttons unless detached", () => {
    expect(mount(NsButtonGroup).classes()).toContain("ns-button-group--attached");
    const apart = mount(NsButtonGroup, { props: { attached: false, orientation: "vertical" } });
    expect(apart.classes()).not.toContain("ns-button-group--attached");
    expect(apart.attributes("aria-orientation")).toBe("vertical");
  });
});
