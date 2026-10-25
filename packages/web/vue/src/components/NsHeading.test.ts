import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsHeading from "./NsHeading.vue";

describe("NsHeading", () => {
  it("renders the level's element in the level's style", () => {
    const wrapper = mount(NsHeading, { props: { level: 3, text: "Épargne" } });
    const title = wrapper.find("h3");
    expect(title.text()).toBe("Épargne");
    expect(title.attributes("style")).toContain("--ns-heading-size: var(--ns-text-h3-size)");
  });

  it("keeps the level when the size changes", () => {
    const wrapper = mount(NsHeading, { props: { level: "1", size: "sm", weight: "bold" } });
    const style = wrapper.find("h1").attributes("style");
    expect(style).toContain("--ns-heading-size: var(--ns-text-h4-size)");
    expect(style).toContain("--ns-heading-weight: var(--ns-font-weight-bold)");
  });

  it("groups an eyebrow and a subtitle with the title", () => {
    const wrapper = mount(NsHeading, {
      props: { text: "Transferts", eyebrow: "Nouveau", subtitle: "En quelques secondes." }
    });
    expect(wrapper.element.tagName).toBe("HGROUP");
    expect(wrapper.find(".ns-heading__eyebrow").text()).toBe("Nouveau");
    expect(wrapper.find(".ns-heading__subtitle").text()).toBe("En quelques secondes.");
  });

  it("derives an anchor id from the text", () => {
    const wrapper = mount(NsHeading, {
      props: { anchor: true },
      slots: { default: "Envoyez de l'argent à Aïcha" }
    });
    expect(wrapper.find("h2").attributes("id")).toBe("envoyez-de-l-argent-a-aicha");
    const link = wrapper.find(".ns-heading__anchor");
    expect(link.attributes("href")).toBe("#envoyez-de-l-argent-a-aicha");
    expect(link.attributes("aria-label")).toBe("Link to this section");
  });
});
