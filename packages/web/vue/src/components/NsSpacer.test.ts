import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsSpacer from "./NsSpacer.vue";

const spacer = (props: Record<string, unknown> = {}) => mount(NsSpacer, { props });

describe("NsSpacer", () => {
  it("takes the free space by default and stays hidden from assistive tech", () => {
    const wrapper = spacer();
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-spacer-grow-base: 1");
    expect(style).toContain("--ns-spacer-basis-base: 0px");
  });

  it("reserves a fixed step or a number of pixels", () => {
    expect(spacer({ size: "lg" }).attributes("style")).toContain(
      "--ns-spacer-basis-base: var(--ns-space-6)"
    );
    const pixels = spacer({ size: 72 }).attributes("style");
    expect(pixels).toContain("--ns-spacer-grow-base: 0");
    expect(pixels).toContain("--ns-spacer-basis-base: 72px");
  });

  it("weights the free space and keeps a minimum", () => {
    const style = spacer({ grow: 2, minSize: "md" }).attributes("style");
    expect(style).toContain("--ns-spacer-grow-base: 2");
    expect(style).toContain("--ns-spacer-basis-base: var(--ns-space-4)");
  });

  it("changes size from a breakpoint up", () => {
    const wrapper = spacer({ size: { base: "none", md: "auto" } });
    expect(wrapper.classes()).toContain("ns-spacer--md");
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-spacer-grow-base: 0");
    expect(style).toContain("--ns-spacer-grow-md: 1");
  });

  it("reveals the space with its size", () => {
    expect(spacer({ size: "xl", reveal: true }).attributes("data-size")).toBe("32");
    expect(spacer({ grow: 2, reveal: true }).attributes("data-size")).toBe("auto ×2");
    expect(spacer({ size: "sm", reveal: true }).attributes("data-size")).toBeUndefined();
    expect(spacer({ size: "xl" }).attributes("data-size")).toBeUndefined();
  });
});
