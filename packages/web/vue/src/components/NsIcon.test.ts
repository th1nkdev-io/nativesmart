import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsIcon from "./NsIcon.vue";

describe("NsIcon", () => {
  it("is decorative without a label and an image with one", () => {
    expect(mount(NsIcon, { props: { name: "heart" } }).attributes("aria-hidden")).toBe("true");
    const labelled = mount(NsIcon, { props: { name: "check-circle", label: "Payé" } });
    expect(labelled.attributes("role")).toBe("img");
    expect(labelled.attributes("aria-label")).toBe("Payé");
  });

  it("thins the stroke of large sizes unless told otherwise", () => {
    expect(mount(NsIcon, { props: { name: "heart", size: "2xl" } }).classes()).toContain(
      "ns-icon--stroke-thin"
    );
    expect(
      mount(NsIcon, { props: { name: "heart", size: "2xl", stroke: "bold" } }).classes()
    ).toContain("ns-icon--stroke-bold");
  });

  it("wraps the glyph in a labelled container", () => {
    const wrapper = mount(NsIcon, {
      props: { name: "wallet", variant: "soft", shape: "circle", tone: "success", label: "Épargne" }
    });
    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-icon-box--soft", "ns-icon-box--circle", "ns-icon--tone-success"])
    );
    expect(wrapper.attributes("role")).toBe("img");
    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
  });

  it("composes rotation and flip into one transform", () => {
    const style = mount(NsIcon, {
      props: { name: "arrow-right", rotate: 90, flip: "vertical" }
    }).attributes("style");
    expect(style).toContain("--ns-icon-transform: rotate(90deg) scaleY(-1)");
  });
});
