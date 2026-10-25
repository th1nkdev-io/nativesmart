import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsContainer from "./NsContainer.vue";

const container = (props: Record<string, unknown> = {}) =>
  mount(NsContainer, { props, slots: { default: "<p>Contenu</p>" } });

describe("NsContainer", () => {
  it("defaults to the xl width with grid gutters", () => {
    const style = container().attributes("style");
    expect(style).toContain("--ns-container-size: var(--ns-container-xl)");
    expect(style).toContain("--ns-container-gutter: var(--ns-grid-margin)");
    expect(container().classes()).toEqual(
      expect.arrayContaining(["ns-container--center", "ns-container--safe"])
    );
  });

  it("reads the reading measure and the full width", () => {
    expect(container({ size: "prose" }).attributes("style")).toContain("var(--ns-measure-normal)");
    expect(container({ size: "full" }).attributes("style")).toContain("--ns-container-size: 100%");
  });

  it("uses spacing tokens for gutters and section spacing", () => {
    const style = container({ gutter: "6", spacing: "lg" }).attributes("style");
    expect(style).toContain("--ns-container-gutter: var(--ns-space-6)");
    expect(style).toContain("--ns-container-block: var(--ns-section-lg)");
    expect(container({ gutter: "none" }).attributes("style")).toContain(
      "--ns-container-gutter: 0px"
    );
  });

  it("renders a landmark element around its content column", () => {
    const wrapper = container({ as: "main" });
    expect(wrapper.element.tagName).toBe("MAIN");
    expect(wrapper.find(".ns-container__content p").text()).toBe("Contenu");
  });

  it("pairs the text with a brand or inverse band", () => {
    expect(container({ background: "surface-brand" }).classes()).toContain(
      "ns-container--tone-on-brand"
    );
    expect(container({ background: "surface-inverse" }).classes()).toContain(
      "ns-container--tone-inverse"
    );
  });

  it("can snap to breakpoints, align to the start and drop safe areas", () => {
    const classes = container({ fixed: true, align: "start", safeArea: false }).classes();
    expect(classes).toEqual(expect.arrayContaining(["ns-container--fixed", "ns-container--start"]));
    expect(classes).not.toContain("ns-container--safe");
  });
});
