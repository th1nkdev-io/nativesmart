import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsSafeArea from "./NsSafeArea.vue";

const area = (props: Record<string, unknown> = {}) =>
  mount(NsSafeArea, { props, slots: { default: "Contenu" } });

describe("NsSafeArea", () => {
  it("keeps every edge clear with padding by default", () => {
    expect(area().classes()).toEqual(
      expect.arrayContaining([
        "ns-safe-area--padding",
        "ns-safe-area--top",
        "ns-safe-area--bottom",
        "ns-safe-area--start",
        "ns-safe-area--end"
      ])
    );
  });

  it("keeps only the requested edges", () => {
    const vertical = area({ edges: "vertical" }).classes();
    expect(vertical).toEqual(expect.arrayContaining(["ns-safe-area--top", "ns-safe-area--bottom"]));
    expect(vertical).not.toContain("ns-safe-area--start");
    expect(area({ edges: ["top", "start"] }).classes()).toEqual(
      expect.arrayContaining(["ns-safe-area--top", "ns-safe-area--start"])
    );
    expect(area({ edges: "none" }).classes()).not.toContain("ns-safe-area--top");
  });

  it("can use margins instead of padding", () => {
    expect(area({ mode: "margin" }).classes()).toContain("ns-safe-area--margin");
  });

  it("reads minimum and spacing from the spacing scale", () => {
    const style = area({ minimum: "4", spacing: "2" }).attributes("style");
    expect(style).toContain("--ns-safe-minimum: var(--ns-space-4)");
    expect(style).toContain("--ns-safe-spacing: var(--ns-space-2)");
  });

  it("writes the zero step with a unit, so max() and calc() stay valid", () => {
    const style = area().attributes("style");
    expect(style).toContain("--ns-safe-minimum: 0px");
    expect(style).toContain("--ns-safe-spacing: 0px");
  });

  it("takes insets from a native shell or a preview", () => {
    const style = area({ insets: { top: 47, bottom: 34 } }).attributes("style");
    expect(style).toContain("--ns-safe-top-override: 47px");
    expect(style).toContain("--ns-safe-bottom-override: 34px");
    expect(style).not.toContain("left-override");
  });

  it("renders the requested element", () => {
    expect(area({ as: "header" }).element.tagName).toBe("HEADER");
  });
});
