import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsBox from "./NsBox.vue";

const box = (props: Record<string, unknown> = {}) =>
  mount(NsBox, { props, slots: { default: "Contenu" } });

describe("NsBox", () => {
  it("renders the requested element", () => {
    expect(box({ as: "section" }).element.tagName).toBe("SECTION");
  });

  it("turns spacing tokens into base variables", () => {
    const wrapper = box({ padding: "4", gap: "2", marginInline: "auto" });
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-box-p-base: var(--ns-space-4)");
    expect(style).toContain("--ns-box-gap-base: var(--ns-space-2)");
    expect(style).toContain("--ns-box-mx-base: auto");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-box--p-base", "ns-box--gap-base"])
    );
  });

  it("changes values from a breakpoint up", () => {
    const wrapper = box({
      padding: { base: "4", md: "8" },
      direction: { base: "column", lg: "row" }
    });
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-box-p-md: var(--ns-space-8)");
    expect(style).toContain("--ns-box-direction-lg: row");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-box--p-md", "ns-box--direction-lg"])
    );
  });

  it("maps alignment words and grid columns to CSS", () => {
    const style = box({ display: "grid", columns: 3, justify: "between", align: "end" }).attributes(
      "style"
    );
    expect(style).toContain("--ns-box-columns-base: repeat(3, minmax(0, 1fr))");
    expect(style).toContain("--ns-box-justify-base: space-between");
    expect(style).toContain("--ns-box-align-base: flex-end");
  });

  it("pairs the text tone with the background", () => {
    expect(box({ background: "surface-brand" }).classes()).toContain("ns-box--tone-on-brand");
    expect(box({ background: "success-muted" }).classes()).toContain(
      "ns-box--tone-on-success-muted"
    );
    expect(box({ background: "surface-inverse" }).classes()).toContain("ns-box--tone-inverse");
    expect(box({ background: "surface" }).classes()).toContain("ns-box--tone-inherit");
    expect(box({ background: "surface-brand", tone: "muted" }).classes()).toContain(
      "ns-box--tone-muted"
    );
  });

  it("reads radius and elevation tokens", () => {
    const style = box({ radius: "lg", elevation: "3" }).attributes("style");
    expect(style).toContain("--ns-box-radius: var(--ns-radius-lg)");
    expect(style).toContain("--ns-box-shadow: var(--ns-elevation-3)");
  });

  it("uses logical sizes", () => {
    const style = box({ maxWidth: "480px", minHeight: "120px" }).attributes("style");
    expect(style).toContain("max-inline-size: 480px");
    expect(style).toContain("min-block-size: 120px");
  });

  it("is a real button when rendered as one", () => {
    const wrapper = box({ as: "button", interactive: true, disabled: true });
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.attributes("aria-disabled")).toBeUndefined();
  });

  it("marks a disabled container for assistive tech", () => {
    expect(box({ disabled: true }).attributes("aria-disabled")).toBe("true");
  });
});
